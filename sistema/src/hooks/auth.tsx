/* eslint-disable camelcase */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  user: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    cpf: string;
    birth: string;
    address: string;
    address_two: string;
    city: string;
    uf: string;
    created_at: string;
    updated_at: string;
    avatar_url: string;
  };
  token: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credential: SingInCredentials): Promise<void>;
  logOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@MyHealthLib:token');
    const user = localStorage.getItem('@MyHealthLib:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@MyHealthLib:token', token);
    localStorage.setItem('@MyHealthLib:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('@MyHealthLib:token');
    localStorage.removeItem('@MyHealthLib:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@MyHealthLib:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, logOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('UseAuth must be used whitin an AuthProvider');
  }

  return context;
}
