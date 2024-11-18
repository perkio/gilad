import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
    // Note: This is only an example. If you use Pages Router,
    // use something else that works, such as "service-worker/index.ts".
    swSrc: "src/app/sw.ts",
    swDest: "public/sw.js",
  });

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ]
  },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
};

export default withSerwist(nextConfig);
