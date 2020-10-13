import styled from 'styled-components';

export const Container = styled.div`
  --horizontalPadding: 16px;
  --verticalPadding: 24px;
  background: #bfd8c2;
  color: #163a7c;

  padding: var(--verticalPadding) var(--horizontalPadding);
  overflow: hidden;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  color: #163a7c;
  margin: 0 auto;
  max-width: 1280px;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  > h1 {
    color: #163a7c;
  }

  .consultas {
    color: #064e0e;
  }

  .botoes {
    display: flex;
    flex-direction: column;

    > button {
      margin-bottom: 10px;
      font-weight: 600;
      border-radius: 8px;
      border: 0;
      background: #177722;
      color: #fff;

      display: flex;
      flex-direction: row;
      align-items: center;

      .text {
        padding: 16px;
        padding: 16px 24px;
      }

      .icon {
        display: flex;
        padding: 16px 16px;
        background: #49b456;
        border-radius: 0 8px 8px 0;
        margin: 0 auto;
        align: flex;
        align: right;
      }
    }
  }
`;

export const LeftSide = styled.div`
  padding: 0 var(--horizontalPadding);
  color: #163a7c;
  @media (min-width: 768px) {
    width: 25%;
  }

  > h1 {
    color: #163a7c;
  }
`;

export const RightSide = styled.div`
  padding: 0 var(--horizontalPadding);
  color: #163a7c;
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
    color: #163a7c;

    > h1 {
      font-size: 32px;
      font-weight: normal;
      color: #163a7c;

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
    color: #163a7c;
    display: grid;
    grid-gap: 16px;

    grid-template-columns: 1fr;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: minmax(min-content, max-content);
    }
  }
`;
