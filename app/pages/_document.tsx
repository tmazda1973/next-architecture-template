import Document, {
  Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps
} from "next/document";

/**
 * アプリケーション全体のドキュメントコンポーネントです。
 * @extends Document
 */
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja" dir="ltr">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" type="image/svg+xml" href="" />
          <link rel="icon" type="image/png" href="" />
          <link rel="apple-touch-icon" sizes="180x180" href="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
