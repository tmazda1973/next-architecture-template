import React from "react";
import BlockUi from "@availity/block-ui";
import "@availity/block-ui/dist/index.css";

/**
 * プロパティ値
 * @interface
 */
interface IBlockUiProps {
  blocking: boolean;
  message?: string;
  children: React.ReactNode;
}

/**
 * ブロック要素を描画します。
 *
 * @param blocking ブロッキング判定
 * @param message メッセージ
 * @param children 子要素
 * @constructor
 */
const AppBlockUi = ({
  blocking,
  message,
  children
}: IBlockUiProps) => {
  return (
    <BlockUi tag="div" className="app-blocker" blocking={blocking} message={message}>
      <div>{children}</div>
    </BlockUi>
  );
};

export  { AppBlockUi };
