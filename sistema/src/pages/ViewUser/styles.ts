import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;

  form {
    margin: 0 30px;
    width: 400px;
    text-align: center;

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #f27a54;
  padding: 40px 0;
`;
