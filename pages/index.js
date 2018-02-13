import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import withData from 'lib/withData';
import getViewer from 'lib/getViewer';

import Layout from 'components/layout/layout';
import { Flex } from 'components/shared/styled-components';

const Container = Flex.extend`
  width: 100%;
  height: calc(100vh - 50px);
`;

class Index extends Component {

  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  static async getInitialProps(context, apolloClient) {
    const viewer = await getViewer(apolloClient) || {};

    return { viewer };
  }

  componentDidMount() {
    this.socket = io();
    this.registerSocketEventListeners(this.socket);
  }

  componentWillUnmount() {
    this.removeSocketEventListeners(this.socket);
    this.socket.close();
  }
  
  registerSocketEventListeners(socket) {

  }

  removeSocketEventListeners(socket) {

  }

  render() {
    const { viewer } = this.props;

    return (
      <Layout>
        <Container align='center' justify='center'>{`Hello ${viewer.firstName || 'world'}`}</Container>
      </Layout>
    );
  }
}

export default withData(Index);
