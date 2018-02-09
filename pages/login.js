import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withData from 'lib/withData';
import getViewer from 'lib/getViewer';
import redirect from 'lib/redirect';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import Layout from 'components/layout/layout';
import { Flex, Button, Input } from 'components/shared/styled-components';

const LoginContainer = Flex.extend`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40vw;
  height: 40vh;
  transform: translate(-50%, -50%);
  background: #ECF0F1;
`;

const Title = styled.h2`

`;

const InputForm = styled.form``;

const Description = styled.dt`

`;

const Detail = styled.dd`

`;


class Login extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired
  }

  static async getInitialProps(context, apolloClient) {
    const viewer = await getViewer(apolloClient);

    if (viewer) redirect(context.res, '/');

    return {};
  }

  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  onInputChange(e) {

  }

  handleSubmit(e) {
    const { login } = this.props;

  }
  
  render() {
    return (
      <Layout>
        <LoginContainer align='center' justify='center'>
          <Title>Login</Title>
          <InputForm>
            <dl>
              <Description>Email</Description>
              <Detail>
                <Input type='email'></Input>
              </Detail>
              <Description>Password</Description>
              <Detail>
                <Input type='password'></Input>
              </Detail>
            </dl>
          </InputForm>
        </LoginContainer>
      </Layout>
    );
  }
}

const query = gql`
  mutation loginWithEmail($input: LoginInput!) {
    login(input: $input) {
      id
    }
  }
`;

const mapQueryToProps = graphql(query, {
  props: ({ mutate }) => ({
    login: (input) => mutate({ variables: { input } })
  })
});

export default compose(withData, mapQueryToProps)(Login);
