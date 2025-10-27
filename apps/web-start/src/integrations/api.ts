import { useAuth0 } from '@auth0/auth0-react';

export function useApi() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const apiCall = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL;
    
    if (!isAuthenticated) {
      throw new Error('User is not authenticated');
    }

    const token = await getAccessTokenSilently();
    
    console.log('Making API call:', {
      url: `${baseUrl}${endpoint}`,
      hasToken: !!token,
      tokenLength: token?.length,
      options,
      baseUrl,
      envVars: {
        VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
        BACKEND_URL: import.meta.env.BACKEND_URL
      }
    });
    
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    console.log('API response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return { apiCall };
}

export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL;
    const response = await fetch(`${baseUrl}${endpoint}`);
    return response.json();
  };
}

export function backendPost<T>(endpoint: string, data: any): () => Promise<T> {
  return async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL;
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };
}

export function backendPut<T>(endpoint: string, data: any): () => Promise<T> {
  return async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL;
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };
}

export function backendDelete<T>(endpoint: string): () => Promise<T> {
  return async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL;
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
    });
    return response.json();
  };
}
