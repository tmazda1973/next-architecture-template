import React from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";

/**
 * プロパティ値
 * @interface
 */
interface IProps {
  src: string;
  alt: string;
  className?: string;
  width?: ImageProps["width"];
  height?: ImageProps["height"];
  priority?: boolean;
}

/**
 * 画像要素を描画するコンポーネントです。
 *
 * @param src 画像ファイルパス
 * @param alt 画像注釈
 * @param className CSSクラス
 * @param width 幅
 * @param height 高さ
 * @param priority 優先判定
 * @constructor
 */
export const AppImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false
}: IProps) => {
  return (
    <span className={className}>
      <Image src={src} width={width} height={height} alt={alt} priority={priority} />
    </span>
  );
};
