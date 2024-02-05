/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    // Your server runtime options go here
    // Example:
    // MY_SECRET_KEY: 'my-secret-key',
  },
  images: {
    domains: [
      "img.clerk.com",
      "images.clerk.dev",
      "uploadthing.com",
      "placehold.co",
    ],
  },
  typescript: {
    // Place TypeScript configuration outside of images
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
