import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Flex, HtmlLink } from 'components/shared/styled-components';

const NavWrapper = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 25px;
  height: 50px;
  box-sizing: border-box;
  color: #fff;
  background: #1ABC9C;
`;

const SignupAndSignOut = Flex.extend`
  width: auto;
`;

const LinkWrapper = styled.div`
  color: #fff;
  padding: 0 1em;
  cursor: pointer;

  &:hover {
    color: #ECF0F1;
  }
`;

class Nav extends Component {
  render() {
    return (
      <NavWrapper>
        <LinkWrapper>
          <Link href='/' prefetch>
            <HtmlLink>Cleverlab</HtmlLink>
          </Link>
        </LinkWrapper>
        <SignupAndSignOut align='center' justify='space-around'>
          <LinkWrapper>
            <Link href='/join' prefetch>
              <HtmlLink>Join</HtmlLink>
            </Link>
          </LinkWrapper>
          <LinkWrapper>
            <HtmlLink href='/signout'>Sign out</HtmlLink>
          </LinkWrapper>
        </SignupAndSignOut>
      </NavWrapper>
    );
  }
}

export default Nav;
