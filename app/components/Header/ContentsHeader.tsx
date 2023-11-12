import React, { useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import styles from "@styles/components/Header/Header.module.css";
import { AppImage } from "@components/Elements/Image/AppImage";
import clsx from "clsx";

/**
 * プロパティ値
 * @interface
 */
interface IProps {
  children?: ReactNode;
}

/**
 * アプリケーション全体のヘッダー要素を描画します。
 *
 * @param children 子ノード
 * @constructor
 */
const ContentsHeader = ({
  children
}: IProps) => {
  const { t } = useTranslation('common');
  const [ isOpenSpNav, setIsOpenSpNav ] = useState<boolean>(false); // SPメニュー開閉

  return (
    <>
      <input type="checkbox" id={styles['gnav-check']} checked={isOpenSpNav} readOnly />
      <header id={styles['header']}>
        <div className={styles['header-logo-wrapper']}>
          <h1 className={styles['header-logo']}>
            <Link href={{ pathname: "/dashboard" }} className={styles['header-logo-link']}>
              <AppImage
                className={styles['header-logo-img']}
                src="/images/logo.svg"
                width={134} height={54}
                alt={t('header.site')}
                priority={true}
              />
            </Link>
            {t('header.links.site.former')}<br className="pc-none" />{t('header.links.site.latter')}
          </h1>
        </div>
        <label
          className={styles['gnav-btn']}
          htmlFor="gnav-check"
          onClick={() => setIsOpenSpNav(!isOpenSpNav)}
        >
          <span className={styles['gnav-btn-inner']}>
            <span className={styles['gnav-btn-icon-top']}></span>
            <span className={styles['gnav-btn-icon-middle']}></span>
            <span className={styles['gnav-btn-icon-bottom']}></span>
          </span>
          <span className={clsx(styles['gnav-btn-text'], styles['open'])}>{t('header.buttons.menu')}</span>
          <span className={clsx(styles['gnav-btn-text'], styles['close'])}>{t('header.buttons.close')}</span>
        </label>
        <nav className={styles['header-nav']}>
          <ul className={styles['header-nav-list']}>
            <li></li>
          </ul>
        </nav>
        {children}
      </header>
    </>
  );
};

export { ContentsHeader };
