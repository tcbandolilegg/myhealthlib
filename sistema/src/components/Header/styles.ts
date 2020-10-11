import styled from 'styled-components';

export const Container = styled.div`
  background: blue;
  width: 100%;
  padding: 0 50px;

  header {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      max-width: 150px;
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: center;

      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        opacity: 0.8;
        transition: opacity 0.3s;
        padding: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;

        &:hover {
          opacity: 1;
          /* border: 1px solid;
          border-image: linear-gradient(90deg, #f27a54 0%, #a154f2 186.42%);
          border-image-slice: 7; */

          svg {
            color: linear-gradient(90deg, #f27a54 0%, #a154f2 186.42%);
          }
        }

        svg {
          font-size: 40px;
          margin-bottom: 10px;
        }

        & + a {
          border-left: 2px solid #30363d;
        }
      }
    }

    ul {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;

      li {
        font-size: 20px;

        button {
          background: none;
          border: none;
          margin: 10px 0 0 10px;

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
    }
  }
`;
