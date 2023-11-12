import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import OidcProvider from "@providers/oidc";
import CustomCredentialProvider from "@providers/credential";
import process from "process";
import { buildQueryString, parseBaseUri, parseQueryString } from "@helpers/uriHelper";
import _ from "lodash";

/**
 * 環境変数定義
 */
const {
  NEXT_PUBLIC_APP_ENV,
  API_BASE_URI,
  NEXTAUTH_SECRET,
} = process.env;

/**
 * ユーザー認証モジュールです。
 * @module
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 3, // 3 hours
  },
  callbacks: {
    /**
     *
     * 認証完了後のコールバック関数です。
     *
     * @param user ユーザー情報
     * @param account アカウント情報
     * @param profile プロフィール情報
     * @return {Promise<boolean>} true: 認証成功, false: 認証失敗
     */
    async signIn({ user, account, profile }): Promise<boolean> {
      return true;
    },
    /**
     * リダイレクト処理が発生した時のコールバック関数です。
     *
     * @param url リダイレクト先URL
     * @param baseUrl ベースURL
     * @return {Promise<string>} リダイレクト先URL
     */
    async redirect({ url, baseUrl }): Promise<string> {
      const redirectBaseUri = parseBaseUri(url); // リダイレクト先の基底URI
      const query = parseQueryString(url); // クエリパラメータ
      // エラーが発生している場合、ベースURLにリダイレクトする
      if (!_.isNil(query['error'])) return baseUrl;
      const queryString = buildQueryString(query);
      if (!_.isEmpty(queryString)) {
        return `${redirectBaseUri}?${queryString}`;
      }
      else {
        return redirectBaseUri;
      }
    },
    /**
     * JWTトークンの生成・更新時のコールバック関数です。
     *
     * @param token JWTトークン
     * @param user ユーザー情報
     * @param account アカウント情報
     * @param session セッション情報
     * @param trigger トリガー
     * @return {Promise<any>} JWTトークン
     */
    async jwt({ token, user, account, session, trigger }): Promise<any> {
      if (user) {
        token.user_id = user.user_id;
        token.name = user.name;
        token.name_eng = user.name_eng;
      }
      return token;
    },
    /**
     * セッション情報の生成・更新時のコールバック関数です。
     *
     * @param session セッション情報
     * @param token JWTトークン
     * @return {Promise<any>} セッション情報
     */
    async session({ session, token }): Promise<any> {
      if (token && session.user) {
        session.user.user_id = token.user_id;
        session.user.name = token.name;
        session.user.name_eng = token.name_eng;
      }
      return session;
    },
  },
  providers: [
    CustomCredentialProvider({
      id: "credentials"
    }),
    OidcProvider({
      id: "oidc",
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  useSecureCookies: NEXT_PUBLIC_APP_ENV !== 'local',
  secret: NEXTAUTH_SECRET,
};

/**
 * 認証処理を実行します。
 *
 * @param req リクエストデータ
 * @param res レスポンスデータ
 */
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
