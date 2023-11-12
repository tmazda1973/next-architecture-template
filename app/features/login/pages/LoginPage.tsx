import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { LoginLayout } from "@components/Layout";
import { ILoginPageProps, ILoginForm } from "@features/login";
import { AppBlockUiContext, IBlockUiContext } from "@app/contexts";
import styles from "@styles/pages/Login.module.css";

/**
 * ログインページ要素を描画するコンポーネントです。
 *
 * @param csrfToken CSRFトークン
 * @constructor
 */
const LoginPage = ({
  csrfToken
}: ILoginPageProps) => {
  const router = useRouter();
  const [ isRevealPassword, setIsRevealPassword ] = useState<boolean>(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const { block, unblock } = useContext<IBlockUiContext>(AppBlockUiContext); // ブロック要素コンテキスト
  const { t } = useTranslation('login');

  /**
   * バリデーション定義
   */
  const schema = z.object({
    userId: z.string()
      .min(10, t('errors.loginId.min'))
      .max(10, t('errors.loginId.max'))
      .regex(/^\d+$/, t('errors.loginId.numeric')), // 半角数字 / 10桁
    password: z.string()
      .min(5, t('errors.password.min'))
      .max(5, t('errors.password.max'))
      .regex(/^\d+$/, t('errors.password.numeric')), // 半角数字 / 5桁
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver(schema),
  });

  /**
   * フォームサブミット時に呼び出されます。
   *
   * @param data フォームデータ
   */
  const onSubmit = async (data: ILoginForm) => {
    // ユーザーを認証する
    beforeSubmit();
    await userAuth(data);
    afterSubmit();
  };
  /**
   * サブミット処理の前処理を実行します。
   */
  const beforeSubmit = () => {
    toast.dismiss();
    setIsSubmitting(true);
  };
  /**
   * サブミット処理の後処理を実行します。
   */
  const afterSubmit = () => {
    setIsSubmitting(false);
  };

  /**
   * ユーザーを認証します。
   *
   * @param data フォームデータ
   */
  const userAuth = async (data: ILoginForm) => {
    block!();
    const response = await signIn('credentials', {
      userId: data.userId,
      password: data.password,
      redirect: false,
    });
    if (response?.ok) {
      await router.push('/dashboard');
      unblock!();
    }
    else {
      toast.error(t('errors.auth.failed'));
      unblock!();
    }
  };

  /**
   * パスワード表示切替アイコン押下時に呼び出されます。
   *
   * @param e イベントオブジェクト
   */
  const handlePasswordToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRevealPassword((prevState) => !prevState);
  };

  /**
   * クラス名を取得します。（パスワード表示切り替え）
   *
   * @param isRevealed true 表示する, false 表示しない
   */
  const togglePasswordClassName = (isRevealed: boolean) => {
    return isRevealed ? styles['toggle-password-icon-revealed'] : styles['toggle-password-icon'];
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className={styles['login-form-id']}>
                <h3 className={styles['headline-login-02']}>{t('form.labels.userId')}</h3>
                <input className={styles['input-text']} type="text"
                  inputMode="none" autoComplete="off"
                  maxLength={10}
                  {...register('userId')} />
                {errors.userId && <p className="error-wrapper">{errors.userId.message}</p>}
              </div>
              <div className={styles['login-form-pass']}>
                <h3 className={styles['headline-login-02']}>{t('form.labels.password')}</h3>
                <input className={styles['input-text']}
                  type={isRevealPassword ? 'text' : 'password'}
                  maxLength={5}
                  inputMode="none" autoComplete="off"
                  {...register('password')} />
                <div className={styles['toggle-password-wrapper']} onClick={handlePasswordToggle}>
                  <label className={styles['toggle-password-inner']}>
                    <span className={togglePasswordClassName(isRevealPassword)}></span>
                  </label>
                </div>
              </div>
              {errors.password && <p className="mt-2 w-full text-center text-red-800">{errors.password.message}</p>}
              <div className={styles['login-btn']}>
                <button type="submit" disabled={isSubmitting} className={styles['login-btn-input']}>
                  {t('buttons.login')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </LoginLayout>
  );
};

export { LoginPage };
