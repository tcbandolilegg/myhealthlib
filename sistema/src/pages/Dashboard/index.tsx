import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import { Container, TableContainer, Title } from './styles';

interface Usuarios {
  id: number;
  cpf: number;
  nome: string;
  // ??? existe este tipo?
  dataNascimento: Date;
  enderecoRua: string;
  enderecoNumero: number;
  enderecoBairro: string;
  // cidade buscar na tabela de Estado
  codEstado: number;
  // cidade buscar na tabela de Estado cidade
  codCidade: number;
  userDependente1: number;
  userDependente2: number;
  userDependente3: number;
  userDependente4: number;
  userDependente5: number;
}

const Dashboard: React.FC = () => {
  const { logOut } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
  const token = localStorage.getItem('@CadastroDeUsuarios:token');

  useEffect(() => {
    async function loadUsuarios(): Promise<void> {
      try {
        const response = await api.get('/usuarios/listar', {
          params: {
            token,
          },
        });
        setUsuarios(response.data);
      } catch (err) {
        logOut();
      }
    }
    loadUsuarios();
  }, [token, logOut]);

  return (
    <>
      {/* <Header /> */}
      <Container>
        <Title>Dados Cadastrados</Title>

        <TableContainer>
          <table>
            <img src="myhealthlib.png" alt="" />
            <thead>
              <tr>
                <th>ID</th>
              </tr>
              <tr>
                <th>CPF:</th>
              </tr>
              <tr>
                <th>Nome:</th>
              </tr>
              <tr>
                <th>Data nascimento</th>
              </tr>
              <tr>
                <th>Endereço</th>
              </tr>
              <tr>
                <th>Bairro</th>
              </tr>
              <tr>
                <th>Cidade</th>
              </tr>
              <tr>
                <th>Estado</th>
              </tr>
              <p></p>
              <p></p>
              <tr>
                <th>Dependente 1</th>

                <th>Dependente 2</th>

                <th>Dependente 3</th>

                <th>Dependente 4</th>

                <th>Dependente 5</th>
              </tr>
              <tr>
                <td> dd</td>
                <td> dd</td>
                <td> dd</td>
                <td> dd</td>
                <td> dd</td>
              </tr>
            </thead>
            <tbody>
              {/* // me peerdi aqi qual é com letra maiuscula */}
              {usuarios.map(usuarios => (
                <tr key={usuarios.id}>
                  <td>{usuarios.id}</td>
                  <td>{usuarios.nome}</td>
                  <td>{usuarios.dataNascimento}</td>
                  <td>{usuarios.enderecoRua}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
