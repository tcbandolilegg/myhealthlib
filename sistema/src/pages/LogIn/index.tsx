import React, { useCallback, useRef } from 'react';
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AnimationContainer } from './styles';

import LogoImg from '../../assets/myhealthlib.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface LogInFormData {
  login: string;
  senha: string;
}

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { logIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: LogInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          login: Yup.string().required('Usuário obrigatório'),
          senha: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await logIn({
          login: data.login,
          senha: data.senha,
        });

        history.push('dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [logIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          {/* <img src="../../assets/myhealthlib.png" alt="MyHealthLib" /> */}
          <img src={LogoImg} alt="MyHelathLib" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="login" icon={FiUser} placeholder="Usuário" />

            <Input
              type="password"
              name="senha"
              icon={FiLock}
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <Link to="/forgot">Esqueci minha senha</Link>
          </Form>
          <Link to="/newUser">
            <FiLogIn />
            Ainda não tenho cadastro
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default LogIn;
