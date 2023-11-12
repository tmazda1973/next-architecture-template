import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { LoginLayout } from "@components/Layout";
import { ILoginPageProps } from "@features/login";
import styles from "@styles/pages/Login.module.css";
import clsx from "clsx";

/**
 * ログインページ要素を描画するコンポーネントです。（OIDC）
 *
 * @param csrfToken CSRFトークン
 * @constructor
 */
const OidcLoginPage = ({
  csrfToken
}: ILoginPageProps) => {
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const { t } = useTranslation('login');

  /**
   * ユーザーを認証します。
   *
   * @return {void}
   */
  const userAuth = useCallback((): void => {
    setIsSubmitting(true);
    signIn('selmid');
    setIsSubmitting(false);
  }, [csrfToken]);

  /**
   * ログインボタン押下時のイベントハンドラです。
   *
   * @param e イベントオブジェクト
   * @return {void}
   */
  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    userAuth();
  };

  return (
    <LoginLayout title={t('title')}>
      <section className="sec">
        <div className="sec-inner">
          <h2 className={styles['headline-login-01']}>
            <Link href={{ pathname: "/" }}>
              <Image src="/images/logo.svg" width={154} height={62}
                alt={t('site')} priority={true} />
            </Link>
          </h2>
          <div className={styles['login-form-wrapper']}>
            <div className={styles['login-btn']}>
              <button
                type="submit" className={clsx(styles['login-btn-input'])}
                onClick={(e) => handleLoginClick(e)}
                disabled={isSubmitting}>
                {t('buttons.login')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </LoginLayout>
  );
};

export { OidcLoginPage };
