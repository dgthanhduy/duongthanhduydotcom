/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    // webpack5: true,
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
                path: false,
            };

        return config;
    },
};

module.exports = nextConfig;
