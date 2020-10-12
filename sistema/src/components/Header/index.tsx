import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/myhealthlib.png';

// Vc apagou aí o .svg?
//

import { Container } from './styles';

const Header: React.FC = () => {
  const { nome, logOut } = useAuth();

  const handleLogOut = useCallback(() => {
    logOut();
  }, [logOut]);

  return (
    <Container>
      <header>
        <img src={logoImg} alt="MyhealthLib" />
        <nav>
          <Link to="/dashboard">
            <FiHome />
            Home
          </Link>
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
