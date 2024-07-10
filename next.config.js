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
};

module.exports = nextConfig;
