import React from "react";
import { HeadMeta } from "@components/Header/HeadMeta";
import clsx from "clsx";

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
 * シンプルなページのレイアウト要素を描画します。
 *
 * @param title ページタイトル
 * @param description 説明
 * @param children 子ノード
 * @constructor
 */
const SimpleLayout = ({
  title,
  description,
  children
}: IProps) => {
  return (
    <>
      <HeadMeta title={title} description={description} />
      <main className={clsx('content', 'reset-body-padding-top')}>
        {children}
      </main>
    </>
  );
};

export { SimpleLayout };
