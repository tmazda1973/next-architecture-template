/**
 * cookieに関するヘルパー関数を提供します。
 *
 * @module helpers/cookieHelper
 */
//--------------------------------------------------------------------------------

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

export {
  getCookieConfig,
};
