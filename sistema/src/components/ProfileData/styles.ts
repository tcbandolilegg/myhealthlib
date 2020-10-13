import styled, { css } from 'styled-components';
import { FiSun, FiMap, FiMapPin, FiUserCheck } from 'react-icons/fi';

const iconsCSS = css`
  width: 16px;
  height: 16px;
  color: #ededed;
  flex-shrink: 0;
`;

export const Container = styled.div``;

export const Flex = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin-left: 24px;

    > h1 {
      font-size: 24px;
      line-height: 1.25;
      color: #103096;
      font-weight: 600;
    }

    > h2 {
      font-size: 16px;
      color: #103096;
      font-weight: 300;
    }
  }

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    > div {
      margin-left: 0;
      margin-top: 16px;
    }
  }
`;

export const Avatar = styled.img`
  // width: 16%;
  height: 120px;
  border-radius: 50%;
  border: solid 25%;
  padding: 10px;

  @media (min-width: 768px) {
    width: 75%;
    margin-top: 36px;
  }

  img {
    // heigth: 40px;
  }
`;

export const Column = styled.ul`
  margin: 20px 0;

  li {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  li + li {
    margin-top: 10px;
  }

  span {
    margin-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const BirthIcon = styled(FiSun)`
  ${iconsCSS}
`;

export const CepIcon = styled(FiMap)`
  ${iconsCSS}
`;

export const AddressIcon = styled(FiMapPin)`
  ${iconsCSS}
`;

export const CpfIcon = styled(FiUserCheck)`
  ${iconsCSS}
`;
