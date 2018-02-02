import React, { Component } from 'react';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 25px;
  height: 50px;
  box-sizing: border-box;
  color: #fff;
  background: #1ABC9C;
`;

class Nav extends Component {
  render() {
    return (
      <NavWrapper>
        <span>Cleverlab</span>
      </NavWrapper>
    );
  }
}

export default Nav;