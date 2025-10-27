import { useAuth0 } from '@auth0/auth0-react';

export function LogoutButton() {
  const { logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Don't show logout button if not authenticated
  }

  return (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      style={{
        padding: '0.75rem 1.5rem',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#c82333';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#dc3545';
      }}
    >
      Log Out
    </button>
  );
}
