import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/test')({
  component: TestPage,
});

function TestPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Test Page</h1>
      <p>Environment Variables:</p>
      <ul>
        <li>AUTH0_ISSUER_URL: {import.meta.env.AUTH0_ISSUER_URL || 'NOT SET'}</li>
        <li>AUTH0_CLIENT_ID: {import.meta.env.AUTH0_CLIENT_ID || 'NOT SET'}</li>
        <li>AUTH0_AUDIENCE: {import.meta.env.AUTH0_AUDIENCE || 'NOT SET'}</li>
        <li>BACKEND_URL: {import.meta.env.BACKEND_URL || 'NOT SET'}</li>
      </ul>
    </div>
  );
}