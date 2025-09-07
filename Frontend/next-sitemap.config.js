const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tripfuel.example.com';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
