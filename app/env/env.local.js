module.exports = {
  API_BASE_URI: "http://backend/api/portal", // APIサーバー 基底URI
  NEXTAUTH_URL: "http://localhost:3000", // 認証URL
  NEXTAUTH_SECRET: "oF8NtWfpDXjVu7", // 認証トークン
  NEXT_PUBLIC_AUTH_PROVIDER: "credentials", // 認証プロバイダー
  NEXT_PUBLIC_OIDC_BASE_URI: "https://path.to/base", // 基底URI（OIDC）
  OIDC_CLIENT_ID: "", // クライアントID（OIDC）
  OIDC_CLIENT_SECRET: "", // クライアントシークレット（OIDC）
  NEXT_PUBLIC_OIDC_POLICY: "", // ポリシー（OIDC）
  OIDC_ENDPOINT_AUTH: "/oauth2/v2.0/authorize", // 認証エンドポイント（OIDC）
  OIDC_ENDPOINT_TOKEN: "/oauth2/v2.0/token", // トークンエンドポイント（OIDC）
  OIDC_ENDPOINT_JWKS: "/oauth2/v2.0/keys", // JWKSエンドポイント（OIDC）
  NEXT_PUBLIC_OIDC_ENDPOINT_LOGOUT: "/oauth2/v2.0/logout", // ログアウトエンドポイント（OIDC）
};
