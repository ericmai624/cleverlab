import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ column }) => column ? 'column' : 'row'};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  outline: none;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const HtmlLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;

  &:focus {
    outline: none;
  }
`;

