import React, { useCallback, useState } from 'react';

import ModalFinishTask from '../ModalFinishTask';

import {
  Container,
  TopTask,
  ContentTask,
  BottomTask,
  DateIcon,
  CheckIcon,
  EditIcon,
  XSquareIcon,
  SquareIcon,
} from './styles';

interface TaskItemExame {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
  isOpen: boolean;
}

interface Props {
  task: TaskItemExame;
  handleEditTask: (task: TaskItemExame) => void;
  handleDeleteTask: (id: string) => void;
}

const TaskItemExame: React.FC<Props> = ({
  task,
  handleEditTask,
  handleDeleteTask,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const setEditingTask = useCallback(() => {
    handleEditTask(task);
  }, [handleEditTask, task]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  return (
    <Container>
      <TopTask>
        <header>
          {/* {task.isOpen ? <SquareIcon /> : <CheckIcon />} */}
          {/* <CheckIcon /> */}
          {/* <h1>{task.title}</h1> */}
          <h1>Próxima Consulta</h1>
        </header>
      </TopTask>

      <ContentTask>
        {/* Colocar que tipo de compromiso "consulta ou exame" */}
        <p>
          <span>
            <CheckIcon />
          </span>
          Consulta
        </p>

        {/* <p>{task.description}</p> */}
        {/* <p>Descrição</p> */}
        <ul>
          <li>
            <DateIcon />
            <p>Data: </p>
            <span>Data</span>
          </li>
        </ul>
        <ul>
          <li>----------------------------</li>
        </ul>
        <ul>
          <li>
            <p>Descrição</p>
          </li>
          {/* {task.completionDate && (
            <li>
              <DateIcon />
              <p>Data de conclusão: </p>
              <span>{task.completionDate}</span>
            </li>
          )} */}
        </ul>
      </ContentTask>

      <BottomTask>
        {/* {task.isOpen && ( */}
        {/* <> */}
        <button type="button" className="icon" onClick={() => setEditingTask()}>
          <EditIcon />
          Editar
        </button>
        <button type="button" className="icon" onClick={toggleModal}>
          <CheckIcon />
          Conluir
        </button>
        {/* </> */}
        {/* )} */}

        <button
          type="button"
          className="icon"
          onClick={() => handleDeleteTask(task.id)}
        >
          <XSquareIcon />
          Excluir
        </button>
      </BottomTask>
    </Container>
  );
};

export default TaskItemExame;
