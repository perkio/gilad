import withSerwistInit from "@serwist/next";

/**
 * @typedef {Object} SecurityPolicyEntry
 * @property {string[]} [default-src] - Default fallback for fetch directives
 * @property {string[]} [script-src] - Valid sources for JavaScript
 * @property {string[]} [connect-src] - Valid targets for fetch, WebSocket, etc
 * @property {string[]} [style-src] - Valid sources for stylesheets
 * @property {string[]} [img-src] - Valid sources for images
 * @property {string[]} [font-src] - Valid sources for fonts
 * @property {string[]} [object-src] - Valid sources for plugins
 * @property {string[]} [media-src] - Valid sources for media (audio/video)
 * @property {string[]} [frame-src] - Valid sources for frames
 * @property {string[]} [worker-src] - Valid sources for web workers
 * @property {string[]} [manifest-src] - Valid sources for manifest files
 * @property {string[]} [frame-ancestors] - Valid sources for frames
 * @property {string[]} [base-uri] - Valid sources for base URIs
 * @property {string[]} [form-action] - Valid sources for form actions
 * @property {string[]} [report-uri] - Valid sources for report URIs
 */

/**
 * Merges multiple security policies into a single policy string.
 * @param {SecurityPolicyEntry[]} policies - Array of security policies
 * @returns {string} - Combined security policy string
 */
function generateCSPHeader(policies) {
  const combined = policies.reduce((combined, policy) => {
    Object.keys(policy).forEach((directive) => {
      const sources = Array.from(
        new Set([...(combined[directive] ?? []), ...policy[directive]])
      );
      combined[directive] = sources;
    });

    return combined;
  }, {});

  const baseDirectives = Object.entries(combined).map(
    ([directive, sources]) => `${directive} ${sources.sort().join(" ")}`
  );

  return [...baseDirectives, "upgrade-insecure-requests"].join("; ");
}

/** @type {SecurityPolicyEntry} */
const defaultPolicy = {
  "default-src": ["'self'"],
  "script-src": ["'self'",
    process.env.NODE_ENV === "production" ? "" : `'unsafe-eval' 'unsafe-inline'`
  ],
  "connect-src": ["'self'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:"],
  "font-src": ["'self'"],
  "manifest-src": ["'self'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
};

const vercelSpeedPolicy = {
  "script-src": ["https://va.vercel-scripts.com"]
}

const vercelLivePolicy = {
  "connect-src": [
    "https://vercel.live",
    "https://*.pusher.com",
    "wss://*.pusher.com",
  ],
  "img-src": ["https://vercel.com"],
  "script-src": ["https://vercel.live"],
  "style-src": ["https://vercel.live"],
  "font-src": ["https://vercel.live"],
  "frame-src": ["https://vercel.live"],
};

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
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Content-Security-Policy',
            value: generateCSPHeader([
              defaultPolicy,
              vercelLivePolicy,
              vercelSpeedPolicy,
            ]),
          },
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
