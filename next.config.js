/** @type {import('next').NextConfig} */
const nextConfig = {}
require('dotenv').config();

module.exports = {
  env: {
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
  images: {
    domains: ['i.annihil.us'],
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
}
