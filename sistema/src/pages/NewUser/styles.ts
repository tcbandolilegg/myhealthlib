import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;

  background: #bfd8c2;

  select {
    padding: 15px;
    margin-bottom: 10px;
    width: 600px;
    text-align: center;
  }

  form {
    margin: 0 10px;
    width: 600px;
    text-align: center;

    a {
      // color: #f4ede8;
      color: #f11325;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#160c8a')};
      }
    }
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: blue;
  padding: 15px 0;
`;
