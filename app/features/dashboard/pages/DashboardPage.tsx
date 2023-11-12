import React from "react";
import { useTranslation } from "react-i18next";
import { SimpleLayout } from "@components/Layout";

/**
 * ダッシュボードページ要素を描画するコンポーネントです。
 *
 * @constructor
 */
export const DashboardPage = () => {
  const { t } = useTranslation('dashboard');

  return (
    <SimpleLayout title={t('title')}>
      <></>
    </SimpleLayout>
  );
};
