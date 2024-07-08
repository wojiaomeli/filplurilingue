/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/next.js',
          destination: '/page-daccueil',
        },
      ];
    },
  };
  
  export default nextConfig;