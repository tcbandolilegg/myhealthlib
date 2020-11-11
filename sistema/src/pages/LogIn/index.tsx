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

import LogoImg from '../../assets/myhealthlib.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface LogInFormData {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: LogInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
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
    [signIn, addToast, history],
  );

  return (
    <div id="users">
      <Container>
        <Content>
          <AnimationContainer>
            <a href="https://tcbandolilegg.github.io/myhealthlib">
              {/* <img src="../../assets/myhealthlib.png" alt="MyHealthLib" /> */}
              <img src={LogoImg} alt="MyHelathLib" />
            </a>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu login</h1>

              <Input name="email" icon={FiUser} placeholder="Usuário" />

              <Input
                type="password"
                name="password"
                icon={FiLock}
                placeholder="Senha"
              />
              <Button type="submit">Entrar</Button>
              <Link id="linkUser" to="/forgotPassword">
                Esqueci minha senha
              </Link>
            </Form>
            <Link to="/newUser">
              <FiLogIn />
              Ainda não tenho cadastro
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
    </div>
  );
};

export default LogIn;
