import React, { Component } from 'react';
import io from 'socket.io-client';

import Layout from 'components/layout/layout';

import { Flex } from 'components/shared/styled-components';

const Container = Flex.extend`
  width: 100%;
`;

class Index extends Component {

  static async getInitialProps() {

    return {};
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
    return (
      <Layout>
        <span>hello world!</span>
      </Layout>
    );
  }
}

export default Index;
