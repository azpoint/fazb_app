/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Don't resolve these modules on the client to avoid issues
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                'pg-query-stream': false,
                'pg-native': false
            };
        }
        return config;
    }
};

export default nextConfig;