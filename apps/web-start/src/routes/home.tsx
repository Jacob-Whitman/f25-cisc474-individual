import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from '../components/LogoutButton';

export const Route = createFileRoute('/home')({
  component: HomePage,
});

function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();

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
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Welcome Home!</h1>
        <LogoutButton />
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>User Information</h2>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Name:</strong> {user?.name || 'Not provided'}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Email:</strong> {user?.email || 'Not provided'}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>User ID:</strong> {user?.sub || 'Not provided'}
        </div>
        {user?.picture && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>Profile Picture:</strong>
            <br />
            <img 
              src={user.picture} 
              alt="Profile" 
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                marginTop: '0.5rem',
                objectFit: 'cover'
              }} 
            />
          </div>
        )}
      </div>

      <div>
        <h2 style={{ marginBottom: '1rem' }}>Available Actions</h2>
        <ul style={{ marginTop: '1rem', lineHeight: '2', listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '1rem' }}>
            <Link 
              to="/courses" 
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
              📚 View Courses (Protected Backend Data)
            </Link>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <Link 
              to="/users" 
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
              👥 View Users (Protected Backend Data)
            </Link>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <Link 
              to="/dashboard" 
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
              📊 Go to Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
