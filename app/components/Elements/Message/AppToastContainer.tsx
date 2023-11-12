import { ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * 状態変化アニメーション用のコンポーネントです。（フェード）
 */
const Fade = cssTransition({
  enter: 'fadeIn',
  exit: 'fadeOut',
  collapseDuration: 300,
  collapse: true,
  appendPosition: true, // 位置に応じてクラス名を追加する
});

/**
 * トーストコンテナ要素を描画します。
 *
 * @constructor
 */
const AppToastContainer = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      hideProgressBar={true}
      draggable={false}
      theme="colored"
      transition={Fade}
    />
  );
};

export { AppToastContainer };
