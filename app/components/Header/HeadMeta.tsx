import React from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";

/**
 * プロパティ値
 * @interface
 */
interface IProps {
  title: string;
  description?: string;
}

/**
 * メタ情報要素を描画します。
 *
 * @param title タイトル
 * @param description 説明文
 * @constructor
 */
const HeadMeta = ({
  title,
  description
}: IProps) => {
  const { t } = useTranslation('common');
  const _description = description ?? t('head.meta.description');
  const _title = `${title} | ${t('header.site')}`;

  return (
    <Head>
      <title>{_title}</title>
      <meta property="description" content={_description!} />
      <meta name="viewport" content="width=device-width, user-scalable=yes" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={_description!} />
    </Head>
  );
};

export { HeadMeta };
