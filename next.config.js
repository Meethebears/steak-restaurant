/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@mui/x-charts'],
};
module.exports = {
  eslint: {
    dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
}