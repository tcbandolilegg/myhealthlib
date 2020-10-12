import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
// import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
// import Header from '../../components/Header';

import { Container, Title } from './styles';
// import { AxiosInterceptorManager } from 'axios';

interface FormData {
  cpf: number;
  nome: string;
  dataNascimento: string;
  tipoLogradouro: string;
  enderecoLogradouro: string;
  enderecoNumero: number;
  enderecoComplemento: string;
  enderecoBairro: string;
  codEstado: number;
  codCidade: number;
}

const NewUser: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          // cpf: ,
          cpf: Yup.number().required('Preencha o numero do CPF'),
          nome: Yup.string().required('Preencha o nome do nome do usuário'),
          dataNascimento: Yup.string().required(
            'Preencha a data de nascimento',
          ),
          // tem como utilizar .style.format para datas?
          tipoLogradouro: Yup.string().required(
            'Preencha o typo do Lougradouro',
          ),
          enderecoLogradouro: Yup.string().required(
            'Preencha o nome do Logradouro',
          ),
          enderecoNumero: Yup.number().required('Preencha o numero'),
          enderecoComplemento: Yup.string().required('Preencha o complemento'),

          enderecoBairro: Yup.string().required('Preencha o bairro'),

          codEstado: Yup.number().required('Escolha o Estado'),
          codCidade: Yup.number().required('Escolha a Cidade'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [history],
  );
  return (
    <>
      {/* <Header /> */}
      <Container>
        <Title>Novo usuário</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputMask mask="999.999.999-99">
            {() => <Input name="cpf" placeholder="CPF somente numeros" />}
          </InputMask>
          <Input name="nome" placeholder="Nome" />

          <InputMask mask="99/99/9999">
            {() => (
              <Input name="dataNascimento" placeholder="Data de nascimento" />
            )}
          </InputMask>
          <Input name="codEstado" placeholder="Estado" />
          <Input name="codCidade" placeholder="cidade" />
          <Input
            name="tipoLogradouro"
            placeholder="Rua, Avenida, Beco, Alameda, etc"
          />
          <Input name="enderecoLogradouro" placeholder="Nome do logradouro" />
          <Input name="enderecoNumero" placeholder="Número do logradouro" />
          <Input name="enderecoComplemento" placeholder="Complemento" />
          <Input name="enderecoBairro" placeholder="Bairro" />
          <Input name="codEstado" placeholder="Estado" />
          <Input name="codCidade" placeholder="Cidade" />

          <Button type="submit">Salvar</Button>
          <Link to="/dashboard">Cancelar</Link>
        </Form>
      </Container>
    </>
  );
};

export default NewUser;
