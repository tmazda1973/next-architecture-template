/**
 * URIに関するヘルパー関数を提供します。
 *
 * @module helpers/uriHelper
 */
//--------------------------------------------------------------------------------
import _ from "lodash";

/**
 * クエリー文字列を解析します。
 *
 * @param uri URI文字列
 * @return {Record<string, string>} 解析後のクエリー文字列
 */
const parseQueryString = (uri: string): Record<string, string> => {
  const queryString = uri.split("?")[1]; // クエリ文字列
  if (!queryString) return {};
  return queryString.split('&').map((p) => p.split('='))
    .reduce((obj, e) => ({...obj, [e[0]]: e[1]}), {});
};

/**
 * 基底URIを解析します。
 *
 * @param uri URI文字列
 * @return {string} 解析後の基底URI
 */
const parseBaseUri = (uri: string): string => {
  return uri.split("?")[0];
};

/**
 * クエリー文字列を組み立てます。
 *
 * @param query クエリー文字列
 * @return {string} 組み立て後のクエリー文字列
 */
const buildQueryString = (query : Record<string, string>): string => {
  return Object.keys(query).map((key) => `${key}=${query[key]}`).join("&");
};

/**
 * アプリケーションの基底URIを生成します。
 * - ブラウザ上で実行されている場合のみ、基底URIを生成します。
 *
 * @return {string|undefined} 基底URI
 */
const buildAppBaseUri = (): string|undefined => {
  let baseUri = undefined;
  if (window) {
    const protocol = window.location.protocol;
    const host =  window.location.host;
    baseUri = `${protocol}//${host}`;
  }
  return baseUri;
};

/**
 * URLが有効かどうかを判定します。
 *
 * @param url URL文字列
 * @return {boolean} true: 有効, false: 無効
 */
const isValidUrl = (url?: string|null): boolean => {
  if (_.isNil(url)) return false;
  try {
    new URL(url);
  }
  catch (e: unknown) {
    return false;
  }
  return true;
};

export {
  parseQueryString,
  parseBaseUri,
  buildQueryString,
  buildAppBaseUri,
  isValidUrl,
};
