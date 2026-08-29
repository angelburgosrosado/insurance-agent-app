import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AB Global Consulting - Financial & Insurance Tools',
    short_name: 'AB Global',
    description: 'Interactive Life Insurance, Variable Annuity, and Retirement Planning Tools by Angel Burgos, PE.',
    start_url: '/',
    display: 'standalone',
    background_color: '#001c38',
    theme_color: '#001c38',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/ab-logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
