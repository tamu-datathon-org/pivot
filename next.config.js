module.exports = {
  async rewrites() {
    return [
      {
        source: '/forms/:path*',
        destination: '/:path*'
      },
      {
        source: '/:path*',
        destination: 'https://dev.tamudatathon.com/:path*'
      }
    ]
  },
}