import React, { Component } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

import Nav from 'components/nav/nav';

import { Flex } from 'components/shared/styled-components';


NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Container = styled.div`
  width: 100%;
`;

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <Container>
        <Nav />
        {children}
      </Container>
    );
  }
}

export default Layout;