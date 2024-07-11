const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/next.js',
        destination: '/page-daccueil',
      },
    ];
  },
  images: {
    domains: ['pplefilstrapi.ciep.fr'],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;