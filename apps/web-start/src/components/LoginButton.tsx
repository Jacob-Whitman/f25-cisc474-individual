import { useAuth0 } from '@auth0/auth0-react';

export function LoginButton() {
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();

  console.log('LoginButton state:', {
    isAuthenticated,
    isLoading,
    error: error?.message,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', marginBottom: '1rem' }}>
        Error: {error.message}
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div style={{ color: 'green', marginBottom: '1rem' }}>
        ✅ You are logged in!
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        console.log('Login button clicked');
        loginWithRedirect();
      }}
      style={{
        padding: '0.75rem 1.5rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#0056b3';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#007bff';
      }}
    >
      Log In
    </button>
  );
}
