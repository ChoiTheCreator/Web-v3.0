module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 프론트엔드에서 사용하는 API 경로
        destination: "http://api.ai-tutor.co.kr:8080/api/:path*", // 백엔드 실제 경로
      },
    ];
  },
};
