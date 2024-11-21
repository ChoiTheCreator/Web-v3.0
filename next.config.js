module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ai-tutor.co.kr/api/v1/:path*',
      },
    ];
  },
};
