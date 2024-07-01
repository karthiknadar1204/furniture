// /** @type {import('next').NextConfig} */
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       remotePatterns: [{
//         hostname: "firebasestorage.googleapis.com"
//       }]
//     }
//   }
  
// //   module.exports = nextConfig

// export default nextConfig;



// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add your Firebase Storage domain here
  },
};

// module.exports = nextConfig;

export default nextConfig;
