/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  webpack: (config, { isServer }) => {
    // Needed if your cache script is asynchronous
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };

    if (!isServer)
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };

    if (isServer) {
      return {
        ...config,
        // This is what allows us to add a node script via NextJS's server
        entry() {
          return config.entry().then((entry) => {
            return Object.assign({}, entry, {
              postbuild: "./lib/postbuild.ts",
            });
          });
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
