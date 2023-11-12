import React, { useState, useEffect } from "react";
import { LoginPage, ILoginPageProps, OidcLoginPage } from "@features/login";
import { GetServerSideProps } from "next";
import { getCsrfToken, getSession } from "next-auth/react";
import { buildQueryString, parseQueryString } from "@helpers/uriHelper";
import {
  getAuthProviderByClient,
  setAuthProviderByServer,
  AUTH_PROVIDER_OIDC, AUTH_PROVIDER_CREDENTIALS,
} from "@helpers/cookieHelper";
import _ from "lodash";

/**
 * ログインページ要素を描画します。
 *
 * @param props プロパティ値
 * @constructor
 */
const Login = (props: ILoginPageProps) => {
  const [ authProvider, setAuthProvider ] = useState<string>(AUTH_PROVIDER_CREDENTIALS); // 認証プロバイダー

  /**
   * ページがマウントされた時の処理です。
   */
  useEffect(() => {
    // 認証プロバイダーを設定する
    setAuthProvider(getAuthProviderByClient());
  }, []);

  return (
    <>
      {authProvider === AUTH_PROVIDER_OIDC ?
        <OidcLoginPage {...props} /> : <LoginPage {...props} />
      }
    </>
  );
};

/**
 * 認証エラー時のプロパティ値を設定します。
 *
 * @param context コンテキストデータ
 * @param props プロパティ値
 * @return {any} プロパティ値
 */
const setAuthErrorProps = (context: any, props: any): any => {
  const query = parseQueryString(context.req.url);
  if (!_.isEmpty(query['callbackUrl']) && !_.isEmpty(query['error'])) {
    const callbackUrl = decodeURIComponent(query['callbackUrl']);
    const protocol = new URL(callbackUrl).protocol; // プロトコル
    if (!_.isEmpty(protocol)) {
      const _query = parseQueryString(callbackUrl);
      let redirectUri = '/login'; // リダイレクト先URI
      const queryString = buildQueryString(_query);
      if (!_.isEmpty(queryString)) redirectUri += `?${queryString}`;
      props['redirect'] = {
        statusCode: 302,
        destination: redirectUri,
      };
    }
  }
  return props;
};

/**
 * サーバーサイドからプロパティ値を取得します。
 *
 * @param context コンテキストデータ
 */
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);
  let props: any = {
    props: {
      csrfToken: await getCsrfToken(context), // CSRFトークン
    },
  };
  // 認証エラー時のプロパティ値を設定する
  props = setAuthErrorProps(context, props);
  if (!_.isEmpty(props['redirect'])) return props;
  setAuthProviderByServer(context, context.query.oidc); // 認証プロバイダー
  // 認証済であればダッシュボードページにリダイレクトする
  if (session && session.user) {
    props['redirect'] = {
      statusCode: 302,
      destination: '/dashboard',
    };
  }
  return props;
};

export default Login;
