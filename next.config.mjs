export default {
    // 기존 설정 유지...
    trailingSlash: true,
  
    async rewrites() {
      return [
        // API 경로는 Netlify에서 NGINX로 전달
        {
          source: "/api/v1/:path*",
          destination: "http://43.201.165.4:8080/:path*",
        },
      ];
    },
  };
  