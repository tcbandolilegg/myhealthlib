import styled from 'styled-components';

export const Container = styled.div`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  .buttonsContainer {
    display: flex;
    align-items: center;

    button {
      margin: 24px 10px;
    }

    > button {
      font-weight: 600;
      border-radius: 8px;
      border: 0;
      background: #d5922a;
      color: #fff;

      display: flex;
      flex-direction: row;
      align-items: center;

      .text {
        padding: 16px 24px;
      }

      .icon {
        display: flex;
        padding: 16px 16px;
        background: #f3ab2a;
        border-radius: 0 8px 8px 0;
        margin-right: 0;
      }
    }

    > button.close {
      background: #c53030;

      .icon {
        background: #c61010;
      }
    }
  }
`;
