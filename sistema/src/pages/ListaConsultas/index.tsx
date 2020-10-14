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

const ListaConsultas: React.FC = () => {
  // const formRef = useRef<FormHandles>(null);

  // // const { forgotPassword } = useAuth();
  // const { addToast } = useToast();
  // const history = useHistory();

  // const handleSubmit = useCallback(
  //   async (data: ForgotPasswordFormData) => {
  //     try {
  //       formRef.current?.setErrors({});

  //       const schema = Yup.object().shape({
  //         email: Yup.string().required('E-mail obrigatório'),
  //       });

  //       await schema.validate(data, {
  //         abortEarly: false,
  //       });

  //       // await forgotPassword({
  //       //   email: data.email,
  //       // });

  //       history.push('dashboard');
  //     } catch (err) {
  //       if (err instanceof Yup.ValidationError) {
  //         const errors = getValidationErrors(err);
  //         formRef.current?.setErrors(errors);
  //         return;
  //       }

  //       addToast({
  //         type: 'error',
  //         title: 'Erro na autenticação',
  //         description:
  //           'Ocorreu um erro ao fazer forgotPassword, cheque as credenciais.',
  //       });
  //     }
  //   },
  //   // [forgotPassword, addToast, history],
  //   [addToast, history],
  //);

  return (
    <div id="users">
      <Container>
        <Content>
          <AnimationContainer>
            {/* <img src="../../assets/myhealthlib.png" alt="MyHealthLib" /> */}
            <img src={LogoImg} alt="MyHelathLib" />

            {/* <Form ref={formRef} onSubmit={handleSubmit}>

              <h1>Escolha o periodo</h1>

              <Input
                type="email"
                name="email"
                icon={FiUser}
                placeholder="E-mail cadastrado"
              />
              <a href="mailto:myhealthlib.comercial@gmail.com? Subject: Senha perdida&body=Solicito o reenvio da minha password">
                <Button type="submit">Recuperar senha</Button>
              </a>
            </Form> */}
          </AnimationContainer>
        </Content>
      </Container>
    </div>
  );
};

export default ListaConsultas;
