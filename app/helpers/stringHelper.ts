/**
 * 文字列に関するヘルパー関数を提供します。
 *
 * @module helpers/stringHelper
 */
//--------------------------------------------------------------------------------
import _ from "lodash";

/**
 * 文字列の値が正の整数かどうかを判定します。
 *
 * @param value 文字列の値
 * @return {Boolean} true 正の整数である, false 正の整数ではない
 */
const isPositiveInteger = (value?: string|null): Boolean => {
  return !_.isNil(value) && /^\d+$/.test(value) && Number(value) > 0;
};

export { isPositiveInteger };
