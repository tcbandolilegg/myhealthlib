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
      font-size: 26px;
      line-height: 1.25;
      color: #c3c3c3;
      font-weight: 600;
    }

    > h2 {
      font-size: 20px;
      color: #c9c9c9;
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
  width: 16%;
  border-radius: 50%;

  @media (min-width: 768px) {
    width: 75%;
    margin-top: 36px;
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
