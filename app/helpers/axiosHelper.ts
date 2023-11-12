/**
 * Axiosに関するヘルパー関数を提供します。
 *
 * @module helpers/axiosHelper
 */
//--------------------------------------------------------------------------------

/**
 * axiosのコンフィグ定義を取得します。
 *
 * @param config コンフィグ定義
 * @return {Record<string, any>} コンフィグ定義
 */
const getAxiosConfig = (config: Record<string, any> = {}): Record<string, any> => {
  return { ...{
    timeout: 3000,
  }, ...config };
};

export { getAxiosConfig };
