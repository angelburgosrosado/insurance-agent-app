import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AB Global Consulting - Financial & Insurance Tools',
    short_name: 'AB Global',
    description: 'Interactive Life Insurance, Variable Annuity, and Retirement Planning Tools by Angel Burgos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#001c38',
    theme_color: '#001c38',
    icons: [
      {
        src: '/images/ab-global-logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
