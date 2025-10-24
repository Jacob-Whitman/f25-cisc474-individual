export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return () =>
    fetch(import.meta.env.VITE_BACKEND_URL + endpoint).then((res) =>
      res.json(),
    );
}

export function backendPost<T>(endpoint: string, data: any): () => Promise<T> {
  return () =>
    fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
}

export function backendPut<T>(endpoint: string, data: any): () => Promise<T> {
  return () =>
    fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
}

export function backendDelete<T>(endpoint: string): () => Promise<T> {
  return () =>
    fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
      method: 'DELETE',
    }).then((res) => res.json());
}
