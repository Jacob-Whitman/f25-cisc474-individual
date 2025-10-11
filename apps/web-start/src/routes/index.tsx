import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to the LMS</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--foreground)' }}>
        This is the landing page for your Learning Management System.
      </p>
      <ul style={{ marginTop: '2rem', lineHeight: '2', listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '1rem' }}>
          <Link 
            to="/login" 
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
            Go to Login
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
            Go to Dashboard
          </Link>
        </li>
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
            📚 View Courses (Backend Data)
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
            👥 View Users (Backend Data)
          </Link>
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <Link 
            to="/profile" 
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
            Go to Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}
