import { OAuthConfig } from "next-auth/providers";
import { GrantBody } from "openid-client";
import process from "process";

/**
 * 環境変数定義
 */
const {
  NEXTAUTH_URL,
  NEXT_PUBLIC_OIDC_BASE_URI,
  NEXT_PUBLIC_OIDC_POLICY,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_ENDPOINT_AUTH,
  OIDC_ENDPOINT_TOKEN,
  OIDC_ENDPOINT_JWKS,
} = process.env;

/**
 * コンフィグ定義
 * @type
 */
type OidcProviderConfig = Pick<OAuthConfig<any>, 'id' | 'clientId' | 'clientSecret'>;

const authorizationUrl = `${NEXT_PUBLIC_OIDC_BASE_URI}${OIDC_ENDPOINT_AUTH}?p=${NEXT_PUBLIC_OIDC_POLICY}`; // 認証エンドポイント
const tokenUrl = `${NEXT_PUBLIC_OIDC_BASE_URI}${OIDC_ENDPOINT_TOKEN}?p=${NEXT_PUBLIC_OIDC_POLICY}`; // トークンエンドポイント
const jwksUrl = `${NEXT_PUBLIC_OIDC_BASE_URI}${OIDC_ENDPOINT_JWKS}?p=${NEXT_PUBLIC_OIDC_POLICY}`; // 公開鍵エンドポイント

/**
 * 認証プロバイダーを生成します。（Open ID Connect）
 *
 * @param config コンフィグ定義
 * @constructor
 */
const OidcProvider = (config: OidcProviderConfig): OAuthConfig<any> => ({
  ...{
    name: "oidc",
    type: "oauth",
    version: "2.0",
    issuer: NEXT_PUBLIC_OIDC_BASE_URI,
    responseType: "code",
    idToken: true,
    checks: [ "state", "nonce" ],
    scope: "openid",
    params: { grant_type: "authorization_code" },
    jwks_endpoint: jwksUrl,
    clientId: OIDC_CLIENT_ID,
    clientSecret: OIDC_CLIENT_SECRET,
    callbackUrl: `${NEXTAUTH_URL}/dashboard`,
    /**
     * プロフィール情報を取得します。
     *
     * @param profile プロフィール情報
     * @return {Promise<any>} プロフィール情報
     */
    async profile(profile): Promise<any> {
      return {
        ...profile,
        id: profile.sub,
      };
    },
    authorization: {
      url: authorizationUrl,
      params: {
        redirect_uri: `${NEXTAUTH_URL}/api/auth/callback/oidc`,
      },
    },
    token: {
      url: tokenUrl,
      /**
       * トークンリクエスト時に呼び出されるコールバック関数です。
       *
       * @param provider 認証プロバイダー
       * @param params パラメータ値
       * @param checks チェック項目
       * @param client 認証クライアント
       * @return {Promise<{tokens: any}>} トークン情報
       */
      request: async ({ provider, params, checks, client }): Promise<{tokens: any}> => {
        // パラメーターを編集する
        params.client_id = OIDC_CLIENT_ID;
        params.client_secret = OIDC_CLIENT_SECRET;
        params.grant_type = "authorization_code";
        delete params.state;
        // トークンレスポンスを取得する
        const tokens = await client.grant(params as GrantBody);
        return { tokens };
      },
    },
  },
  ...config,
});

export default OidcProvider;
