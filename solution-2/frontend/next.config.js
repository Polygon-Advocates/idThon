/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = {
            fs: false, // Exclude the 'fs' module from the client-side bundle
            net: false,
            tls: false,
          };
        }
        return config;
      },
}

module.exports = nextConfig
