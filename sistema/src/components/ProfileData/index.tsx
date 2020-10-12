import React from 'react';

import {
  Container,
  Flex,
  Avatar,
  Column,
  BirthIcon,
  CepIcon,
  AddressIcon,
  CpfIcon,
} from './styles';

interface ProfileProps {
  avatarUrl?: string;
  name: string;
  email: string;
  birth: string;
}

const ProfileData: React.FC<ProfileProps> = (data: ProfileProps) => {
  return (
    <Container>
      <Flex>
        <Avatar src={data.avatarUrl} alt={data.name} />

        <div>
          <h1>{data.name}</h1>
          <h2>{data.email}</h2>
        </div>
      </Flex>

      <Column>
        <li>
          <BirthIcon />
          <span>Data de nascimento: {data.birth}</span>
        </li>
        <li>
          <CpfIcon />
          <span>CPF: </span>
        </li>
        <li>
          <AddressIcon />
          <span>Endereço: </span>
        </li>
        <li>
          <AddressIcon />
          <span>Número:</span>
        </li>
        <li>
          <CepIcon />
          <span>Cidade: </span>
        </li>
        <li>
          <CepIcon />
          <span>UF: </span>
        </li>
      </Column>
    </Container>
  );
};

export default ProfileData;
