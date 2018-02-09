import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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

  static propTypes = {
    viewer: PropTypes.object
  }

  render() {
    const { viewer } = this.props;

    let auth = [
      <LinkWrapper key='join'>
        <Link href='/join' prefetch>
          <HtmlLink>Join</HtmlLink>
        </Link>
      </LinkWrapper>,
      <LinkWrapper key='login'>
        <Link href='/login' prefetch>
          <HtmlLink>Login</HtmlLink>
        </Link>
      </LinkWrapper>
    ];
    if (viewer && viewer.id) {
      auth = (
        <LinkWrapper>
          <HtmlLink href='/signout'>Sign out</HtmlLink>
        </LinkWrapper>
      );
    }

    return (
      <NavWrapper>
        <LinkWrapper>
          <Link href='/' prefetch>
            <HtmlLink>Cleverlab</HtmlLink>
          </Link>
        </LinkWrapper>
        <SignupAndSignOut align='center' justify='space-around'>
          {auth}
        </SignupAndSignOut>
      </NavWrapper>
    );
  }
}

const query = gql`
  query checkLogin {
    viewer {
      id
    }
  }
`;

const mapQueryToProps = graphql(query, {
  props: ({ data }) => ({ viewer: data.viewer })
});

export default mapQueryToProps(Nav);
