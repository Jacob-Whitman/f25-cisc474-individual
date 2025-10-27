import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../integrations/api';
import { Suspense, useState } from 'react';
import { CourseDto, CreateCourseDto, UpdateCourseDto } from '@repo/api';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from '../components/LogoutButton';

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
});

// Using CourseDto from the API package instead of local interface

function CoursesPage() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseDto | null>(null);

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Please log in to access this page</h1>
        <Link to="/">Go to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Courses</h1>
        <LogoutButton />
      </div>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--foreground)' }}>
        Browse and manage all available courses from the backend API.
      </p>
      
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => setShowCreateForm(true)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--foreground)',
            color: 'var(--background)',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Create New Course
        </button>
      </div>
      
      <Suspense fallback={<LoadingFallback />}>
        <CoursesList onEdit={setEditingCourse} />
      </Suspense>
      
      {showCreateForm && (
        <CreateCourseForm onClose={() => setShowCreateForm(false)} />
      )}
      
      {editingCourse && (
        <EditCourseForm 
          course={editingCourse} 
          onClose={() => setEditingCourse(null)} 
        />
      )}
      
      <p style={{ marginTop: '2rem' }}>
        <Link 
          to="/" 
          style={{ 
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--foreground)',
            color: 'var(--background)',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Back to Home
        </Link>
      </p>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      fontSize: '1.2rem',
      color: 'var(--foreground)',
      opacity: 0.7
    }}>
      Loading courses...
    </div>
  );
}

function CoursesList({ onEdit }: { onEdit: (course: CourseDto) => void }) {
  const { apiCall } = useApi();
  
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: () => apiCall<CourseDto[]>('/courses'),
  });

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (error) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: 'red',
        fontSize: '1.1rem'
      }}>
        Error loading courses: {error.message}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: 'var(--foreground)',
        opacity: 0.7
      }}>
        No courses found.
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onEdit={onEdit} />
      ))}
    </div>
  );
}

function CourseCard({ course, onEdit }: { course: CourseDto; onEdit: (course: CourseDto) => void }) {
  const { apiCall } = useApi();
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation({
    mutationFn: () => apiCall(`/courses/${course.id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
      deleteMutation.mutate();
    }
  };

  return (
    <div 
          style={{
            border: '1px solid var(--foreground)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            backgroundColor: 'var(--background)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '0.5rem',
            color: 'var(--foreground)'
          }}>
            {course.title}
          </h3>
          <p style={{ 
            fontSize: '1rem',
            color: 'var(--foreground)',
            opacity: 0.7,
            marginBottom: '0.5rem'
          }}>
            Code: {course.code}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onEdit(course)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              border: '1px solid var(--foreground)',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'transparent',
              color: 'red',
              border: '1px solid red',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              opacity: deleteMutation.isPending ? 0.5 : 1
            }}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      
          {course.description && (
            <p style={{ 
              marginBottom: '1rem',
              color: 'var(--foreground)',
              opacity: 0.8
            }}>
              {course.description}
            </p>
          )}
      
          <div style={{ 
            fontSize: '0.9rem',
            color: 'var(--foreground)',
        opacity: 0.6,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.5rem'
      }}>
        <p><strong>ID:</strong> {course.id}</p>
        <p><strong>Owner:</strong> {course.owner?.profile?.fullName || course.owner?.email || 'None'}</p>
        <p><strong>Archived:</strong> {course.isArchived ? 'Yes' : 'No'}</p>
        <p><strong>Created:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
        <p><strong>Updated:</strong> {new Date(course.updatedAt).toLocaleDateString()}</p>
        <p><strong>Enrollments:</strong> {course.enrollments?.length || 0}</p>
        <p><strong>Assignments:</strong> {course.assignments?.length || 0}</p>
      </div>
    </div>
  );
}

function CreateCourseForm({ onClose }: { onClose: () => void }) {
  const { apiCall } = useApi();
  const [formData, setFormData] = useState<CreateCourseDto>({
    code: '',
    title: '',
    description: '',
    ownerId: ''
  });
  
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationFn: () => apiCall<CourseDto>('/courses', { 
      method: 'POST',
      body: JSON.stringify(formData)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--background)',
        padding: '2rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--foreground)',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Create New Course</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Code *
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--foreground)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--foreground)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--foreground)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                resize: 'vertical'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Owner ID
            </label>
            <input
              type="text"
              value={formData.ownerId}
              onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--foreground)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: 'var(--foreground)',
                border: '1px solid var(--foreground)',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--foreground)',
                color: 'var(--background)',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                opacity: createMutation.isPending ? 0.5 : 1
              }}
            >
              {createMutation.isPending ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditCourseForm({ course, onClose }: { course: CourseDto; onClose: () => void }) {
  const { apiCall } = useApi();
  const [formData, setFormData] = useState<UpdateCourseDto>({
    code: course.code,
    title: course.title,
    description: course.description || '',
    isArchived: course.isArchived,
    ownerId: course.ownerId || ''
  });
  
  const queryClient = useQueryClient();
  
  const updateMutation = useMutation({
    mutationFn: () => apiCall<CourseDto>(`/courses/${course.id}`, { 
      method: 'PUT',
      body: JSON.stringify(formData)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--background)',
        padding: '2rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--foreground)',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Edit Course</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Code *
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--foreground)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--foreground)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--foreground)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                resize: 'vertical'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Owner ID
            </label>
            <input
              type="text"
              value={formData.ownerId}
              onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--foreground)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={formData.isArchived}
                onChange={(e) => setFormData({ ...formData, isArchived: e.target.checked })}
                style={{ margin: 0 }}
              />
              <span style={{ fontWeight: 'bold' }}>Archived</span>
            </label>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: 'var(--foreground)',
                border: '1px solid var(--foreground)',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--foreground)',
                color: 'var(--background)',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                opacity: updateMutation.isPending ? 0.5 : 1
              }}
            >
              {updateMutation.isPending ? 'Updating...' : 'Update Course'}
            </button>
          </div>
        </form>
        </div>
    </div>
  );
}
