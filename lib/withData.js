import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

import initApollo from './initApollo';

export default ComposedComponent => {
  class WithData extends Component {
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
      let serverState = {};
      let composedInittialProps = {};
      let { asPath, pathname, query, res } = context;

      if (ComposedComponent.getInitialProps) {
        composedInittialProps = await ComposedComponent.getInitialProps(context);
      }

      if (res && res.finished) return; // no need to continue to render since res is completed
      
      let apollo = initApollo();
      
      try {
        let rootElement = (
          <ApolloProvider client={apollo}>
            <ComposedComponent {...composedInittialProps} />
          </ApolloProvider>
        );
        let rootContext = { router: { asPath, pathname, query } };

        await getDataFromTree(rootElement, rootContext);
      } catch (err) {
        console.log(err);
      }

      if (!process.browser) Head.rewind();

      serverState = apollo.cache.extract();

      return { ...composedInittialProps, serverState };
    }

    constructor(props) {
      super(props);
      
      this.apollo = initApollo(this.props.serverState);
    }
    
    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }
  
  return WithData;
};
