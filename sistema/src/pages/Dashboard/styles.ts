import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #f27a54;
`;

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    th {
      color: #f27a54;
      font-weight: normal;
      padding: 20px 32px;
      font-size: 24px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;
      text-align: center;

      &.title {
        color: #363f5f;
      }

      a {
        font-size: 24px;
        color: #f27a54;
      }

      button {
        background: none;
        border: none;

        svg {
          font-size: 24px;
          color: #f27a54;
          transition: color 0.2s;
        }

        &:hover svg {
          color: #c53030;
        }
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
