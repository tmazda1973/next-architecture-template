import { SessionProvider } from "next-auth/react";
import { AppBlockUiProvider } from "@app/contexts";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import "@locales/configs";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      <AppBlockUiProvider>
        <Component {...pageProps} />
      </AppBlockUiProvider>
    </SessionProvider>
  );
}

export default MyApp;
