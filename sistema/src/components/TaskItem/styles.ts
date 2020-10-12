import styled, { css } from 'styled-components';
import {
  FiCalendar,
  FiCheckSquare,
  FiSquare,
  FiEdit,
  FiEye,
  FiXSquare,
} from 'react-icons/fi';

const iconCSS = css`
  width: 16px;
  height: 16px;
  color: #ededed;
  flex-shrink: 0;
`;

export const DateIcon = styled(FiCalendar)`
  ${iconCSS}
`;

export const CheckIcon = styled(FiCheckSquare)`
  ${iconCSS}
`;

export const EditIcon = styled(FiEdit)`
  ${iconCSS}
`;

export const EyeIcon = styled(FiEye)`
  ${iconCSS}
`;

export const XSquareIcon = styled(FiXSquare)`
  ${iconCSS}
`;

export const SquareIcon = styled(FiSquare)`
  ${iconCSS}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #ededed;
  border-radius: 6px;
`;

export const TopTask = styled.div`
  > header {
    display: flex;
    align-items: center;

    > h1 {
      margin-left: 8px;
      font-size: 24px;
      font-weight: 600;
      color: #ededed;
    }
  }
`;

export const ContentTask = styled.div`
  padding: 8px 0 16px;

  > p {
    margin: 8px 0 16px;
    font-size: 16px;
    color: #c3c3c3;
    letter-spacing: 0.1px;
  }

  > ul {
    display: flex;
    align-items: center;

    > li {
      display: flex;
      align-items: center;
      margin-right: 16px;

      > span,
      p {
        margin-left: 5px;
        font-size: 14px;
        color: #ededed;
      }
    }
  }
`;

export const BottomTask = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background: transparent;
    padding: 8px;
    color: #ededed;
    border: 1px solid #ededed;
    border-radius: 8px;
    display: flex;
    align-items: center;
    transition: 0.2s;

    &:hover {
      color: #30363d;
      background: #ededed;

      > svg {
        color: #30363d;
      }
    }

    > svg {
      margin-right: 8px;
    }
  }
`;
