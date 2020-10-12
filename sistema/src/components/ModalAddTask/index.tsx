import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../Modal';
import Input from '../Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { Form } from './styles';

interface TaskItem {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
  isOpen: boolean;
}

interface ICreateTaskData {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
  isOpen: boolean;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddTask: (task: TaskItem) => void;
}

const ModalAddTask: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddTask,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateTaskData) => {
      try {
        const schema = Yup.object().shape({
          title: Yup.string().required('Este campo é obrigatório'),
          description: Yup.string(),
          deliveryDate: Yup.string().required('Este campo é obrigatório'),
          completionDate: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handleAddTask(data);
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleAddTask, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova consulta</h1>
        <Input name="title" placeholder="Título da tarefa" />
        <Input name="description" placeholder="Descrição" />

        <Input name="deliveryDate" placeholder="Data de entrega" />
        <Input name="completionDate" placeholder="Data de conclusão" />
        <button type="submit">
          <p className="text">Adicionar consulta</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddTask;
