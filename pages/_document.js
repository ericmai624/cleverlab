import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {

  static getInitialProps({ renderPage }) {
    /* Server side render stylesheet with Styled-Components */
    const sheet = new ServerStyleSheet();
    const page = renderPage(Page => props => sheet.collectStyles(<Page {...props} />));
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    const { styleTags } = this.props;

    return (
      <html>
        <Head>
          <title>Cleverlab</title>
          <style>{`
            @font-face {
              font-family: Roboto;
              src: url(/static/fonts/Roboto-Regular.ttf);
            }

            @font-face {
              font-family: Roboto;
              src: url(/static/fonts/Roboto-Bold.ttf);
              font-weight: bold;
            }

            @font-face {
              font-family: Roboto;
              src: url(/static/fonts/Roboto-Italic.ttf);
              font-style: italic;
            }

            body {
              font-family: Roboto, sans-serif;
              margin: 0;
            }
          `}
          </style>
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
