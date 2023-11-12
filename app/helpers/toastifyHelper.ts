/**
 * トーストコンテナ要素に関するヘルパー関数を提供します。
 *
 * @module helpers/toastifyHelper
 */
//--------------------------------------------------------------------------------

/**
 * トーストコンテナ要素のコンフィグ定義を取得します。
 *
 * @param config コンフィグ定義
 * @return {Record<string, any>} コンフィグ定義
 */
const getAutoCloseConfig = (config: Record<string, any> = {}): Record<string, any> => {
  return { ...{
    autoClose: 5000, // 5秒後に自動的に閉じる
  }, ...config };
};

export { getAutoCloseConfig };
