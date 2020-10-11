import styled from 'styled-components';

export const Container = styled.button`
  background: radial-gradient(#ee234c 0%, #701124 100%);
  color: #d0d3e7;
  font-weight: 500;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  margin-top: 16px;
  opacity: 0.5;
  transition: opacity 0.3s;

  &:hover {
    opacity: 2;
  }

  & #newUser {
    background: radial-gradient(#243cf3 0%, #09156f 100%);
    color: #d0d3e7;
  }
`;
