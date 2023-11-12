loadEnv(process.env.APP_ENV);

/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  distDir: "_next",
  generateBuildId: async () => {
    return process.env.APP_BUILD_ID;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  }
};

module.exports = nextConfig;

/**
 * 環境変数を読み込みます。
 *
 * @param {string} appEnv 環境名
 */
function loadEnv(appEnv = "local") {
  const env = {
    ...require(`./env/env.${appEnv}`),
    NEXT_PUBLIC_APP_ENV: appEnv,
  };
  Object.entries(env).forEach(([key, value]) => {
    process.env[key] = value;
  });
}
