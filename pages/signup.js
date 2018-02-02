import React, { Component } from 'react';
import styled from 'styled-components';
import Layout from 'components/layout/layout';
/* shared styled-components */
import { Flex, Button } from 'components/shared/styled-components';

const SignupContainer = Flex.extend`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40vw;
  height: 40vh;
  transform: translate(-50%, -50%);
  background: #ECF0F1;
`;

const Title = Flex.extend`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 13%;
  transform: translate(-50%, -50%);
  background: #3498DB;
  color: #fff;
  font-size: 1.5em;
  font-weight: bold;
`;

const QuestionList = styled.ul`
  list-style: none;
  width: 80%;
  height: 75%;
  padding: 0;
`;

const QuestionItem = styled.li`
  width: 100%;
  height: ;
  margin-bottom: 4%;
`;

const ButtonsWrapper = Flex.extend`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 50%;
  height: 12%;
  transform: translate(-50%, 50%);
`;

const Confirm = Button.extend`
  width: 35%;
  height: 100%;
  font-weight: bold;
  font-size: 1.1em;
  color: #fff;
  background: #1ABC9C;
`;

const Cancel = Confirm.extend`
  background: #E74C3C;
`;

class Signup extends Component {
  render() {
    return (
      <Layout>
        <SignupContainer align='center' justify='center'>
          <Title align='center' justify='center'><span>Sign up</span></Title>
          <QuestionList>
          
          </QuestionList>
          <ButtonsWrapper align='center' justify='space-around'>
            <Cancel>Cancel</Cancel>
            <Confirm>Submit</Confirm>
          </ButtonsWrapper>
        </SignupContainer>
      </Layout>
    );
  }
}

export default Signup;