import { ErrorPage } from "@features/error";

/**
 * 404エラーページ要素を描画します。
 * - _error.tsxをカスタマイズしたことにより、このページを作成しないと警告が出るため、作成しています。
 *
 * @constructor
 */
const NotFoundError = () => {
  return (
    <ErrorPage statusCode={404} />
  );
};

export default NotFoundError;
