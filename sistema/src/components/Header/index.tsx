import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPlus, FiLogOut, FiEdit } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

// import logoImg from '../../assets/myhealthlib.svg';

// import logoImg from '../../assets/world.svg';

import { Container } from './styles';

const Header: React.FC = () => {
  const { nome, administrador, logOut } = useAuth();

  const handleLogOut = useCallback(() => {
    logOut();
  }, [logOut]);

  return (
    <Container>
      <header>
        <img src="../../assets/myhealthlib.png" alt="MyhealthLib" />
        {/* <img src={logoImg} alt="MyhealthLib" /> */}
        <nav>
          <Link to="/dashboard">
            <FiHome />
            Home
          </Link>
          {administrador && (
            <Link to="/new-country">
              <FiPlus />
              Novo
            </Link>
          )}
          {administrador && (
            <Link to="/edit-country">
              <FiEdit />
              Editar
            </Link>
          )}
        </nav>

        <ul>
          <li>
            <span>
              Bem vindo <strong>{nome}</strong>
            </span>
          </li>
          <li>
            <button type="button" onClick={() => handleLogOut()}>
              <FiLogOut />
            </button>
          </li>
        </ul>
      </header>
    </Container>
  );
};

export default Header;
