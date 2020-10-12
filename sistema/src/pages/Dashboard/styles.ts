import styled from 'styled-components';

export const Container = styled.div`
  --horizontalPadding: 16px;
  --verticalPadding: 24px;

  padding: var(--verticalPadding) var(--horizontalPadding);
  overflow: hidden;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  max-width: 1280px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const LeftSide = styled.div`
  padding: 0 var(--horizontalPadding);

  @media (min-width: 768px) {
    width: 25%;
  }
`;

export const RightSide = styled.div`
  padding: 0 var(--horizontalPadding);

  @media (min-width: 768px) {
    width: 75%;
  }
`;

export const Tasks = styled.div`
  margin-top: var(--verticalPadding);

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;

    > h1 {
      font-size: 32px;
      font-weight: normal;

      > span {
        font-weight: 900;
        color: #f3ab2a;
      }
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
        margin: 0 auto;
      }
    }
  }

  > div {
    margin-top: 8px;

    display: grid;
    grid-gap: 16px;

    grid-template-columns: 1fr;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: minmax(min-content, max-content);
    }
  }
`;
