import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withData from 'lib/withData';
import getViewer from 'lib/getViewer';
import redirect from 'lib/redirect';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import Layout from 'components/layout/layout';

class Login extends Component {

  static propTypes = {

  }

  static async getInitialProps(context, apolloClient) {
    const viewer = await getViewer(apolloClient);

    if (viewer) redirect(context.res, '/');

    return {};
  }
  
  render() {
    return (
      <Layout>
        Join Page
      </Layout>
    );
  }
}

export default compose(withData)(Login);
