import React, { useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import Modal from '../Modal';

import { Container } from './styles';

interface TaskItem {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
  isOpen: boolean;
}

interface IModalProps {
  task: TaskItem;
  isOpen: boolean;
  setIsOpen: () => void;
  handleFinishTask: (task: TaskItem) => void;
}

const ModalFinishTask: React.FC<IModalProps> = ({
  task,
  isOpen,
  setIsOpen,
  handleFinishTask,
}) => {
  const setFinishTask = useCallback(() => {
    handleFinishTask(task);
    setIsOpen();
  }, [task, handleFinishTask, setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen();
  }, [setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <h1>Deseja concluir a tarefa</h1>
        <div className="buttonsContainer">
          <button onClick={setFinishTask} type="button">
            <p className="text">Concluir</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
          <button className="close" onClick={handleClose} type="button">
            <p className="text">Fechar</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </div>
      </Container>
    </Modal>
  );
};

export default ModalFinishTask;
