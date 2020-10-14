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
    flex-direction: column;
  }

  > h5 {
    flex-direction: column;
    color: #163a7c;
  }

  .consultas {
    color: #064e0e;
  }
`;

export const LeftSide = styled.div`
  padding: 0 var(--horizontalPadding);
  color: #163a7c;
  @media (min-width: 768px) {
    width: 30%;
  }

  > h1 {
    color: #163a7c;
  }
`;

export const Middle = styled.div`
  padding: 0 var(--horizontalPadding);
  color: #163a7c;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const RightSide = styled.div`
  padding: 0 var(--horizontalPadding);
  color: #163a7c;
  @media (min-width: 768px) {
    width: 20%;
  }

  > div {
    margin-top: var(--verticalPadding);
  }

  .botoes {
    margin-top: 82px;
    display: flex;
    // @media (min-width: 768px) {
    //   width: 50%;
    flex-direction: column;
    align: right;

    > button {
      align-self: flex-end;
      text-align: center;
      width: 170px;
      margin-bottom: 10px;
      padding: 10px;
      font-weight: 600;
      border-radius: 8px;
      border: 0;
      background: #fff;
      color: #177722;

      &:hover {
        background: #177722;
        color: #fff;
      }

      display: flex;
      flex-direction: row;
      align-items: center;

      .text {
        padding: 16px;
        text-align: center;
        align: center;
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

export const Tasks = styled.div`
  margin-top: var(--verticalPadding);

  // Esse sinal de > aqui serve pra indicar que é o primeiro elemento dentro dessa div
  // aqui é o primeio header dentro da div
  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    color: #163a7c;

    //Aqui é o primeiro h1 dentro do header
    > h1 {
      display: flex;
      font-size: 32px;
      font-weight: normal;
      color: #163a7c;
      flex-direction: row;

      > span {
        font-weight: 900;
        color: #177722;
      }
    }

    // Aqui é o primeiro button dentro do header, mas no header não tem button                                                                    n     a
    > button {
      font-weight: 600;
      border-radius: 8px;
      border: 0;
      background: #177722;
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
        background: #177722;
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
