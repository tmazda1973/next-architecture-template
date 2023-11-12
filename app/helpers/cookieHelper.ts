/**
 * cookieに関するヘルパー関数を提供します。
 *
 * @module helpers/cookieHelper
 */
//--------------------------------------------------------------------------------
import nookies, { parseCookies, destroyCookie } from 'nookies';
import _ from "lodash";

const COOKIE_AUTH_PROVIDER = 'app.auth-provider'; // クッキー名（認証プロバイダー）
const AUTH_PROVIDER_OIDC = 'oidc'; // 認証方法（OIDC）
const AUTH_PROVIDER_CREDENTIALS = 'credentials'; // 認証方法（credentials）

/**
 * cookieのコンフィグ定義を取得します。
 *
 * @param config コンフィグ定義
 * @return {Record<string, any>} コンフィグ定義
 */
const getCookieConfig = (config: Record<string, any> = {}): Record<string, any> => {
  return { ...{
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  }, ...config };
};

/**
 * 認証プロバイダーをクッキーに保存します。
 * - サーバーサイドで実行されることを想定しています。
 *
 * @param context コンテキスト
 * @param useOidc OIDC使用判定（'true' 使用する, 'false' 使用しない）
 * @param config コンフィグ定義
 */
const setAuthProviderByServer = (
  context: any,
  useOidc: string|undefined|null = 'true',
  config: Record<string, any> = {}
): void => {
  const isUseOidc = _.isNil(useOidc) ? false : useOidc !== 'false';
  if (isUseOidc) {
    nookies.set(context, COOKIE_AUTH_PROVIDER, AUTH_PROVIDER_OIDC, getCookieConfig(config));
  }
  else {
    nookies.set(context, COOKIE_AUTH_PROVIDER, AUTH_PROVIDER_CREDENTIALS, getCookieConfig(config));
  }
};

/**
 * 認証プロバイダーを取得します。
 * - クライアントサイドで実行されることを想定しています。
 *
 * @return {string} 認証プロバイダー
 */
const getAuthProviderByClient = (): string => {
  const cookies = parseCookies();
  let authProvider = cookies[COOKIE_AUTH_PROVIDER];
  if (_.isNil(authProvider) || _.isEmpty(authProvider)) {
    authProvider = process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? AUTH_PROVIDER_CREDENTIALS;
  }
  return authProvider;
};

export {
  AUTH_PROVIDER_CREDENTIALS,
  AUTH_PROVIDER_OIDC,
  setAuthProviderByServer,
  getAuthProviderByClient,
  getCookieConfig,
};
