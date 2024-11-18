import fs from "fs";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      const redirectsSourcePath = path.resolve("public", "_redirects");
      const redirectsDestinationPath = path.resolve(".next", "_redirects");

      // 빌드 후 _redirects 파일 복사
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.done.tap("CopyRedirectsPlugin", () => {
            fs.copyFileSync(redirectsSourcePath, redirectsDestinationPath);
          });
        },
      });
    }
    return config;
  },
};

export default nextConfig;
