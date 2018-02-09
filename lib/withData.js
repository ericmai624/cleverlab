import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

import initApollo from './initApollo';

const getCookie = ({ req } = {}) => {
  if (!!req) return req.headers.cookie;
  if (typeof document !== 'undefined') return document.cookie;
  return {};
};

const getBaseUrl = req => (!!req ? `${req.protocol}://${req.headers.host}` : '');

export default ComposedComponent => (
  class WithData extends Component {

    static displayName = `WithData(${ComposedComponent.displayName})`

    static propTypes = {
      serverState: PropTypes.object.isRequired
    }

    /*
    getInitialProps receives a context object with the following properties:

      pathname - path section of URL
      query - query string section of URL parsed as an object
      asPath - String of the actual path (including the query) shows in the browser
      req - HTTP request object (server only)
      res - HTTP response object (server only)
      jsonPageRes - Fetch Response object (client only)
      err - Error object if any error is encountered during the rendering

    */
    static async getInitialProps(context) {
      let { asPath, pathname, query, req, res } = context;
      let apollo = initApollo({}, {
        getCookie: () => getCookie(context),
        baseUrl: getBaseUrl(req)
      });
      let composedInitialProps = {};

      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(context, apollo);
      }

      // no need to continue to render since response is completed
      if (res && res.finished) return;

      try {
        let rootElement = (
          <ApolloProvider client={apollo}>
            <ComposedComponent {...composedInitialProps} />
          </ApolloProvider>
        );
        let rootContext = { router: { asPath, pathname, query } };

        await getDataFromTree(rootElement, rootContext);
      } catch (err) {
        console.log('An error has occured while using getDataFromTree: ', err);
      }

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      if (!process.browser) Head.rewind();

      let serverState = { apollo: { data: apollo.cache.extract() } };

      return { ...composedInitialProps, serverState };
    }

    constructor(props) {
      super(props);

      this.apollo = initApollo(this.props.serverState.apollo.data, {
        getCookie: () => getCookie(),
        baseUrl: getBaseUrl()
      });
    }
    
    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }
);
