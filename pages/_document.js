import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
/* use module resolver to resolve /static/css to styles/ */
import normalize from 'styles/normalize-min.css';
import stylesheet from 'styles/main.css';

class MyDocument extends Document {

  static getInitialProps({ renderPage }) {
    /* Server side render stylesheet with Styled-Components */
    const sheet = new ServerStyleSheet();
    const page = renderPage(Page => props => sheet.collectStyles(<Page { ...props } />));
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    const { styleTags } = this.props;

    return (
      <html>
        <Head>
          <title>Cleverlab</title>
          <style dangerouslySetInnerHTML={{ __html: normalize }} />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
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
