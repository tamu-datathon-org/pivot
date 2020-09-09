module.exports = {
  async rewrites() {
    return [
      {
        source: '/forms/:path*',
        destination: '/api/forms/:path*'
      },
      {
        source: '/:path*',
        destination: 'https://dev.tamudatathon.com/:path*'
      }
    ]
  },
  env: {
    GATEKEEPER_URL: "https://tamudatathon.com/auth"
  }
}