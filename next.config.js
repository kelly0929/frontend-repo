require('dotenv').config()
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',  // ← この行を追加
    env: {
        // Reference a variable that was defined in the .env file and make it available at Build Time
        API_ENDPOINT: process.env.API_ENDPOINT,
    },
}

module.exports = nextConfig