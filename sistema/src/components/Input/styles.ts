import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  height: 56px;

  border-left: 4px solid #fff;
  border-right: 4px solid #fff;
  color: #747d88;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      color: #d25f5f;
      border-color: #d25f5f;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #a154f2;
      border-color: #a154f2;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #a154f2;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #30363d;

    &::placeholder {
      color: #747d88;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #d25f5f;
    color: #fff;

    &::before {
      border-color: #d25f5f transparent;
    }
  }
`;
