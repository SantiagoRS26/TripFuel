const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tripfuel.vercel.app';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  
  exclude: [
    '/login',
    '/signup',
    '/dashboard',
    '/settings',
    '/auth/*',
    '/analytics',
    '/trips/new',
  ],
  transform: async (config, path) => {
    const isHome = path === '/';
    const marketing = new Set([
      '/', '/calculator', '/vehicles', '/terms-of-service', '/privacity'
    ]);
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: isHome ? 'daily' : marketing.has(path) ? 'weekly' : undefined,
      priority: isHome ? 1.0 : marketing.has(path) ? 0.7 : 0.5,
    };
  },

  robotsTxtOptions: {
    // ✅ Una sola política clara
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/settings', '/auth', '/login', '/signup', '/trips/new'], // ajusta según tu caso
      },
    ],
  },
};
