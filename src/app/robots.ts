import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://myiad.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/setup/', '/portal/'],
      },
      // AI Search & Knowledge Agents (explicitly allowed)
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot',
          'Applebot-Extended',
          'Google-Extended',
          'Bingbot',
          'CCBot',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/myiad', '/tools/'],
        disallow: ['/admin/', '/api/', '/setup/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      'https://myiad.com/sitemap.xml',
      'https://abglco.com/sitemap.xml',
    ],
    host: 'https://myiad.com',
  };
}
