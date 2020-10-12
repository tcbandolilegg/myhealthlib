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

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateTask: (task: TaskItem) => void;
  editingTask: TaskItem;
}

interface IEditTaskData {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
  isOpen: boolean;
}

const ModalEditTask: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingTask,
  handleUpdateTask,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditTaskData) => {
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

        handleUpdateTask(data);
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleUpdateTask, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingTask}>
        <h1>Editar consulta</h1>

        {/* <Input name="id" value={editingTask.id} hidden /> */}
        <Input name="title" placeholder="Nome do médico" />
        <Input name="description" placeholder="Especialidade" />

        <Input name="deliveryDate" placeholder="Descrição" />
        <Input name="completionDate" placeholder="Data de consulta" />

        <button type="submit">
          <div className="text">Salvas consulta</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditTask;
