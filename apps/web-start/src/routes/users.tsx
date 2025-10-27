import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../integrations/api';
import { Suspense } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from '../components/LogoutButton';

export const Route = createFileRoute('/users')({
  component: UsersPage,
});

interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

function UsersPage() {
  const { isAuthenticated, isLoading } = useAuth0();

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
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Users</h1>
        <LogoutButton />
      </div>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--foreground)' }}>
        View all users from the backend API.
      </p>
      
      <Suspense fallback={<LoadingFallback />}>
        <UsersList />
      </Suspense>
      
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
      Loading users...
    </div>
  );
}

function UsersList() {
  const { apiCall } = useApi();
  
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiCall<User[]>('/users'),
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
        Error loading users: {error.message}
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: 'var(--foreground)',
        opacity: 0.7
      }}>
        No users found.
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {users.map((user) => (
        <div 
          key={user.id}
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
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '0.5rem',
            color: 'var(--foreground)'
          }}>
            {user.name || 'Unnamed User'}
          </h3>
          <p style={{ 
            marginBottom: '1rem',
            color: 'var(--foreground)',
            opacity: 0.8,
            fontSize: '1.1rem'
          }}>
            {user.email}
          </p>
          <div style={{ 
            fontSize: '0.9rem',
            color: 'var(--foreground)',
            opacity: 0.6
          }}>
            <p>User ID: {user.id}</p>
            <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
