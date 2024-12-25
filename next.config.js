module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // 프론트엔드에서 사용하는 API 경로
        destination: "https://api.ai-tutor.co.kr:8080/api/v1/:path*", // 백엔드 실제 경로
      },
    ];
  },
};
