import { ErrorPage, IErrorPageProps } from "@features/error";

/**
 * エラーページ要素を描画します。
 *
 * @param props プロパティ値
 * @constructor
 */
const Error = (props: IErrorPageProps) => {
  return (
    <ErrorPage {...props} />
  );
};

export default Error;
