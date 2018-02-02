import React, { Component } from 'react';
import styled from 'styled-components';

import Nav from 'components/nav/nav';

import { Flex } from 'components/shared/styled-components';

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