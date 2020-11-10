import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import axios from 'axios';
import InputMask from 'react-input-mask';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
// import Header from '../../components/Header';

import { Container, Title } from './styles';

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

interface IBGEUfResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const NewUser: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const history = useHistory();

  useEffect(() => {
    axios
      .get<IBGEUfResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(res => {
        const ufInitials = res.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }
    // Carregar as cidades toda cez que a uf mudar
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(res => {
        const cityNames = res.data.map(uf => uf.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  const handleSelectUf = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;
      setSelectedUf(uf);
    },
    [],
  );

  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const city = event.target.value;
      setSelectedCity(city);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cpf: Yup.number().required('Preencha o numero do CPF'),
          nome: Yup.string().required('Preencha o nome do nome do usuário'),
          dataNascimento: Yup.string().required(
            'Preencha a data de nascimento',
          ),
          // tem como utilizar .style.format para datas?
          // Para as datas, temos q fazer igual ao cpf com um input mask
          tipoLogradouro: Yup.string().required(
            'Preencha o tipo do Lougradouro',
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

        // Esses são os campos para cadastro na api
        // Só ajustar o form de acordo e
        // Preencher com os dados do form

        // await api.post('users', {
        //   name: ,
        //   password: ,
        //   email: ,
        //   cpf: ,
        //   birth: ,
        //   address: ,
        //   address_two: ,
        //   city: ,
        //   uf: ,
        // });

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu login no MyHealthLib',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [history, addToast],
  );
  return (
    <>
      {/* <Header /> */}
      <div id="users">
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
            {/* <Input name="codEstado" placeholder="Estado" /> */}
            {/* <Input name="codCidade" placeholder="cidade" /> */}

            <div className="field-group">
              <div className="field">
                {/* <label htmlFor="uf">Estado (UF)</label> */}
                <select
                  name="uf"
                  id="uf"
                  value={selectedUf}
                  onChange={handleSelectUf}
                >
                  <option value="0">Selecione um UF</option>
                  {ufs.map(uf => (
                    <option value={uf} key={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                {/* <label htmlFor="city">City</label> */}
                <select
                  name="city"
                  id="city"
                  value={selectedCity}
                  onChange={handleSelectCity}
                >
                  <option value="0">Selecione uma cidade</option>
                  {cities.map(city => (
                    <option value={city} key={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

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

            {/* Não entendi.........  se cancelar não deveria voltar praa a tela de login??? */}
            <Link to="/dashboard">Cancelar</Link>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default NewUser;
