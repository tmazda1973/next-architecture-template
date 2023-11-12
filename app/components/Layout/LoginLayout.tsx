import React from "react";
import { HeadMeta } from "@components/Header";
import { AppFooter } from "@components/Footer";
import { AppToastContainer } from "@components/Elements/Message";

/**
 * プロパティ値
 * @interface
 */
interface IProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * ログインページのレイアウト要素を描画します。
 *
 * @param title ページタイトル
 * @param description 説明
 * @param children 子ノード
 * @constructor
 */
const LoginLayout = ({
  title,
  description,
  children
}: IProps) => {
  return (
    <>
      <HeadMeta title={title} description={description} />
      <AppToastContainer />
      <main className="content">
        {children}
        <AppFooter />
      </main>
    </>
  );
};

export { LoginLayout };
