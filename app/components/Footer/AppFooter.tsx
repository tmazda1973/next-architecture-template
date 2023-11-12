import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

/**
 * プロパティ値
 * @interface
 */
interface IProps {
  scrollTopRef?: React.RefObject<HTMLDivElement>;
}

/**
 * アプリケーション全体のフッター要素を描画します。
 *
 * @param scrollTopRef ref属性（スクロールトップ要素）
 * @constructor
 */
const AppFooter = ({
  scrollTopRef
}: IProps) => {
  const { t } = useTranslation('common');

  /**
   * 「ページTOPへ」リンク押下時に呼び出されます。
   *
   * @param e イベントオブジェクト
   * @return {void}
   */
  const handleScrollTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    scrollTopRef?.current?.scrollIntoView({behavior: 'smooth'});
  }, []);

  return (
    <footer id="footer">
      <small className="copyright">
        {t("footer.copyright", {year: new Date().getFullYear()})}
      </small>
    </footer>
  );
};

export { AppFooter };
