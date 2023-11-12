import React, { ReactNode, useCallback } from "react";
import Link from "next/link";
import { SimpleLayout } from "@components/Layout";
import { useTranslation } from "react-i18next";
import styles from "@styles/pages/Error.module.css";
import { useSession } from "next-auth/react";
import _ from "lodash";

/**
 * プロパティ値
 * @interface
 */
export interface IErrorPageProps {
  statusCode?: number; // ステータスコード
}

/**
 * エラーページ要素を描画します。
 *
 * @param statusCode ステータスコード
 * @constructor
 */
export const ErrorPage = ({
  statusCode = 404,
}: IErrorPageProps) => {
  const { t } = useTranslation('common');
  const { status: authStatus } = useSession(); // セッション情報

  /**
   * 戻るボタン要素を構築します。
   *
   * @param authStatus 認証ステータス
   * @return {ReactNode} 戻るボタン要素
   */
  const buildBackButtonElement = useCallback((authStatus: string): ReactNode => {
    if (_.isEmpty(authStatus) || authStatus === 'loading') return (<></>);
    let path = '/login'; // URLパス
    let label = t('buttons.doLogin'); // ラベル
    if (authStatus === 'authenticated') {
      path = '/dashboard';
      label = t('buttons.back');
    }
    return (
      <div className={styles['prev-button-box']}>
        <Link href={{ pathname: path }} className={styles['prev-button']}>
          {label}
        </Link>
      </div>
    );
  }, []);

  return (
    <SimpleLayout title={t(`errorPage.${statusCode}.meta.title`)}>
      <section className="sec">
        <div className="sec-inner">
          <div className={styles['title']}>{statusCode} | {t(`errorPage.${statusCode}.title`)}</div>
          {buildBackButtonElement(authStatus)}
        </div>
      </section>
    </SimpleLayout>
  );
};
