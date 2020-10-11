import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  place-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  img {
    max-width: 300px;
  }

  form {
    margin: 50px 0;
    max-width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #ffffff;
      display: block;
      margin-top: 12px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#ffffff')};
      }
    }
  }

  > a {
    color: #04045a;
    display: block;
    /* margin-top: 10px; */
    text-decoration: none;
    transition: color 0.2s;
    font-size: 22px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 14px;
    }

    &:hover {
      color: ${shade(0.2, '#1d1de2')};
    }
  }
`;
