import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';

import { Container, Title, Select } from './styles';

interface CountryProps {
  id: number;
  nome: string;
  sigla: string;
  gentilico: string;
}

const EditCountrie: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { logOut } = useAuth();
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryProps[]>([]);
  const [checkedCountry, setCheckedCountry] = useState('0');
  const token = localStorage.getItem('@CadastroDeUsuarios:token');
  const history = useHistory();

  useEffect(() => {
    async function loadCountry(): Promise<void> {
      try {
        const response = await api.get('/pais/listar', {
          params: {
            token,
          },
        });
        setCountries(response.data);
      } catch (err) {
        logOut();
      }
    }

    loadCountry();
  }, [token, logOut]);

  const handleSelectCoutry = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const country = event.target.value;

      setCheckedCountry(country);
    },
    [],
  );

  const handleLoadCoutries = useCallback(async () => {
    const country = checkedCountry;

    const response = await api.get('/pais/pesquisar', {
      params: {
        filtro: country,
        token,
      },
    });

    setSelectedCountry(response.data);
  }, [checkedCountry, token]);

  const handleDeleteCountry = useCallback(
    async id => {
      const paisIndex = countries.findIndex(pais => pais.id === id);
      console.log(paisIndex);

      await api.get('pais/excluir', {
        params: {
          id,
          token,
        },
      });
      countries.splice(paisIndex, 1);
      selectedCountry.splice(0, 1);

      setCheckedCountry('');
      setCountries([...countries]);
      setSelectedCountry([...selectedCountry]);
    },
    [token, selectedCountry, countries],
  );

  const handleSubmit = useCallback(
    async (data: CountryProps) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Preencha o nome do País'),
          sigla: Yup.string()
            .required('Preencha a sigla')
            .max(2, 'A sigla deve conter apenas 2 caracteres'),
          gentilico: Yup.string().required('Preencha o gentílico'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await handleDeleteCountry(data.id);

        await api.post('pais/salvar', data, {
          params: {
            token,
          },
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [history, token, handleDeleteCountry],
  );
  return (
    <>
      <Header />
      <Container>
        <Title>Editar País</Title>

        <Form onSubmit={handleLoadCoutries}>
          <Select
            name="countries"
            id="countries"
            value={checkedCountry}
            onChange={handleSelectCoutry}
          >
            <option value="0">Selecione um País</option>
            {countries.map(country => (
              <option key={country.id} value={country.nome}>
                {country.nome}
              </option>
            ))}
          </Select>

          <Button type="submit">Buscar</Button>
        </Form>

        {selectedCountry.map(country => (
          <Form ref={formRef} onSubmit={handleSubmit} key={country.id}>
            <Input name="id" value={country.id} disabled />

            <Input name="nome" defaultValue={country.nome} />

            <Input name="sigla" defaultValue={country.sigla} maxLength={2} />

            <Input name="gentilico" defaultValue={country.gentilico} />

            <Button type="submit">Salvar</Button>

            <Button
              type="button"
              onClick={() => handleDeleteCountry(country.id)}
            >
              Excluir
            </Button>
            <Link to="/dashboard">Cancelar</Link>
          </Form>
        ))}
      </Container>
    </>
  );
};

export default EditCountrie;
