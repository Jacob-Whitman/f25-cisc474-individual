/// <reference types="vite/client" />
import type { ReactNode } from 'react';
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  Link,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import TanStackQueryDevtools from '../integrations/devtools';
import appCss from '../styles.css?url';
import type { QueryClient } from '@tanstack/react-query';

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'LMS - Learning Management System',
      },
      {
        name: 'description',
        content: 'A modern Learning Management System built with TanStack Start',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preload',
        href: '/fonts/GeistVF.woff',
        as: 'font',
        type: 'font/woff',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/fonts/GeistMonoVF.woff',
        as: 'font',
        type: 'font/woff',
        crossOrigin: 'anonymous',
      },
    ],
  }),

  notFoundComponent: NotFoundComponent,
  shellComponent: RootDocument,
});

function NotFoundComponent() {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--foreground)' }}>
        The page you're looking for doesn't exist.
      </p>
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
        Go Home
      </Link>
    </div>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <style>{`
          @font-face {
            font-family: 'Geist Sans';
            src: url('/fonts/GeistVF.woff') format('woff');
            font-weight: 100 900;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Geist Mono';
            src: url('/fonts/GeistMonoVF.woff') format('woff');
            font-weight: 100 900;
            font-style: normal;
            font-display: swap;
          }
          :root {
            --font-geist-sans: 'Geist Sans', system-ui, -apple-system, sans-serif;
            --font-geist-mono: 'Geist Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          }
        `}</style>
      </head>
      <body style={{ fontFamily: 'var(--font-geist-sans)' }}>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
