import React, { createContext, useState } from "react";
import { AppBlockUi } from "@components/Layout";

/**
 * プロパティ値（コンテキスト）
 * @interface
 */
export interface IBlockUiContext {
  blocking: boolean;
  message?: string;
  loader?: React.ReactNode;
  block?: () => void;
  unblock?: () => void;
}
/**
 * プロパティ値（プロバイダー）
 * @interface
 */
interface IBlockUiProviderProps {
  children: React.ReactNode;
}

/**
 * コンテキストオブジェクト
 */
const AppBlockUiContext = createContext<IBlockUiContext>({
  blocking: false,
  block: () => {},
  unblock: () => {},
});

/**
 * ブロッキング要素のプロバイダーコンポーネントです。
 *
 * @param children 子要素
 * @constructor
 */
const AppBlockUiProvider = ({
  children
}: IBlockUiProviderProps) => {
  const [blocking, setBlocking] = useState(false);

  /**
   * ブロッキングを開始します。
   */
  const block = () => {
    setBlocking(true);
  };
  /**
   * ブロッキングを終了します。
   */
  const unblock = () => {
    setBlocking(false);
  };

  return (
    <AppBlockUiContext.Provider value={{ blocking, block, unblock }}>
      <AppBlockUi blocking={blocking} message="loading...">
        {children}
      </AppBlockUi>
    </AppBlockUiContext.Provider>
  );
};

export {
  AppBlockUiContext,
  AppBlockUiProvider
};
