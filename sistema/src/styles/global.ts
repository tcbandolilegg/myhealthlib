import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0%;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    /* background: #5a81a6; */
    // background: #d1a92a;
    color: #FFFFFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, select{
    font-family: 'Zilla Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

#users{
  background: #bfd8c2;
}

#users {
  color: #2a57a0;
}
`;
