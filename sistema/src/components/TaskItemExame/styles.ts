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
  color: #08420f;
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
  border: 2px solid #0b4611;
  border-radius: 6px;
  margin-bottom: 10px;
`;

export const TopTask = styled.div`
  > header {
    display: flex;
    align-items: center;

    > h1 {
      margin-left: 8px;
      font-size: 24px;
      font-weight: 600;
      color: #08420f;
    }
  }
`;

export const ContentTask = styled.div`
  padding: 8px 0 16px;

  > p {
    margin: 8px 0 16px;
    font-size: 16px;
    color: #08420f;
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
        color: #08420f;
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
    color: #62a76a;
    border: 1px solid #0b4611;
    border-radius: 8px;
    display: flex;
    align-items: center;
    transition: 0.2s;

    &:hover {
      color: white;
      background: #62a76a;

      > svg {
        color: #30363d;
      }
    }

    > svg {
      margin-right: 8px;
    }
  }
`;
