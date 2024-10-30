
module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/questiontree',
          permanent: true,
        },
      ]
    },
  }