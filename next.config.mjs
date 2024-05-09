/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.giphy.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/trees",
        destination: "/trees/index.html",
      },
      {
        source: "/soccer",
        destination: "/soccer/index.html",
      },
      {
        source: "/cloud",
        destination: "/cloud/index.html",
      },
    ];
  },
};

export default nextConfig;
