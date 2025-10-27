import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { Auth0Provider } from '@auth0/auth0-react';
import * as TanstackQuery from './integrations/root-provider';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      // Use environment variables with fallback to hardcoded values
      const domain = import.meta.env.AUTH0_ISSUER_URL?.replace('https://', '').replace('/', '') || 'dev-tl7huzebvackseqh.us.auth0.com';
      const clientId = import.meta.env.AUTH0_CLIENT_ID || 'pFcWqCLOlVSaTBsYbkdH4k8Jr12FssKg';
      const audience = import.meta.env.AUTH0_AUDIENCE || 'https://f25-cisc474-individual-2.onrender.com/';
      
      console.log('Auth0 Configuration:', {
        domain,
        clientId,
        audience,
        envVars: {
          AUTH0_ISSUER_URL: import.meta.env.AUTH0_ISSUER_URL,
          AUTH0_CLIENT_ID: import.meta.env.AUTH0_CLIENT_ID,
          AUTH0_AUDIENCE: import.meta.env.AUTH0_AUDIENCE,
        }
      });

      return (
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: typeof window !== 'undefined' ? window.location.origin + '/home' : 'http://localhost:3000/home',
            audience: audience,
          }}
        >
          <TanstackQuery.Provider {...rqContext}>
            {props.children}
          </TanstackQuery.Provider>
        </Auth0Provider>
      );
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  return router;
};
