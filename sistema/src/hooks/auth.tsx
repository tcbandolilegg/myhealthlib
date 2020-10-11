import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  administrador: boolean;
  token: string;
  nome: string;
}

interface LogInCredentials {
  login: string;
  senha: string;
}
interface AuthContextData {
  administrador: boolean;
  nome: string;
  logIn(credentials: LogInCredentials): Promise<void>;
  logOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const administrador = localStorage.getItem(
      '@CadastroDeUsuarios:administrador',
    );
    const token = localStorage.getItem('@CadastroDeUsuarios:token');
    const nome = localStorage.getItem('@CadastroDeUsuarios:nome');

    if (administrador && token && nome) {
      return { administrador: JSON.parse(administrador), token, nome };
    }

    return {} as AuthState;
  });

  const logIn = useCallback(async ({ login, senha }) => {
    const response = await api.post('usuario/autenticar', null, {
      params: {
        login,
        senha,
      },
    });

    const { administrador, token, nome } = response.data;

    localStorage.setItem(
      '@CadastroDeUsuarios:administrador',
      JSON.stringify(administrador),
    );
    localStorage.setItem('@CadastroDeUsuarios:token', token);
    localStorage.setItem('@CadastroDeUsuarios:nome', nome);

    setData({ administrador, token, nome });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('@CadastroDeUsuarios:administrador');
    localStorage.removeItem('@CadastroDeUsuarios:token');
    localStorage.removeItem('@CadastroDeUsuarios:nome');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        administrador: data.administrador,
        nome: data.nome,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whitin an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
