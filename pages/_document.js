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
          <link rel='stylesheet' type='text/css' href='/static/css/styles.css' />
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
