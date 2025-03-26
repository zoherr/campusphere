/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
        {
            protocol: "https",
            hostname: "images.pexels.com",
          },
      ],
    },
  
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*", // Change this to "http://localhost:3000" if needed
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "X-Requested-With, Content-Type, Authorization",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  