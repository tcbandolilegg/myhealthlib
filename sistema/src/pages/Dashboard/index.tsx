import React, { useCallback, useEffect, useState } from 'react';
import { uuid } from 'uuidv4';
import { FiCheckSquare } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';

// import Header from '../../components/Header';
import ProfileData from '../../components/ProfileData';
import ModalAddTask from '../../components/ModalAddTask';
import ModalEditTask from '../../components/ModalEditTask';
import TaskItem from '../../components/TaskItem';
// Faz o import
import Dropzone from '../../components/Dropzone';

import { Container, Main, LeftSide, RightSide, Tasks } from './styles';

import logoImg from '../../assets/myhealthlib.png';
import api from '../../services/api';

interface TaskItemData {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
  isOpen: boolean;
}

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const [tasks, setTasks] = useState<TaskItemData[]>([]);
  const [taskQuantity, setTaskQuantity] = useState(0);
  const [editingTask, setEditingTask] = useState<TaskItemData>(
    {} as TaskItemData,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Cria o estado
  // Estado para o arquivo
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    async function loadTasks(): Promise<void> {
      const response = await api.get('/consultations');

      if (response) {
        setTaskQuantity(response.data.lenght);
        setTasks(response.data);
      }
    }

    loadTasks();
  }, []);

  const handleAddTask = useCallback(
    async (task: Omit<TaskItemData, 'id'>): Promise<void> => {
      try {
        const id = uuid();
        const newTask = {
          id,
          title: task.title,
          description: task.description,
          deliveryDate: task.deliveryDate,
          completionDate: task.completionDate,
          isOpen: true,
        };

        await api.post('consultations', newTask);

        setTasks([...tasks, newTask]);
      } catch (err) {
        console.log(err);
        addToast({
          type: 'error',
          title: 'Erro ao adicionar',
          description:
            'Ocorreu um erro ao adicoinar uma nova tarefa, tente novamente.',
        });
      }
    },
    [tasks, addToast],
  );

  const handleUpdateTask = useCallback(
    (task: TaskItemData): void => {
      try {
        const newTask = {
          id: task.id,
          title: task.title,
          description: task.description,
          deliveryDate: task.deliveryDate,
          completionDate: task.completionDate,
          isOpen: true,
        };
        const taskIndex = tasks.findIndex(
          taskSelected => taskSelected.id === task.id,
        );

        if (taskIndex) {
          setEditingTask(tasks[taskIndex]);
          tasks.splice(taskIndex, 1);

          setTasks([newTask, ...tasks]);

          api.put('/consultations', newTask);
        }
      } catch (err) {
        console.log(err);
        addToast({
          type: 'error',
          title: 'Erro ao atualizar',
          description:
            'Ocorreu um erro ao atualizar sua tarefa, tente novamente.',
        });
      }
    },
    [tasks, addToast],
  );

  const handleDeleteTask = useCallback(
    (id: string): void => {
      try {
        api.delete(`/consultations/${id}`);

        const taskIndex = tasks.findIndex(task => task.id === id);
        tasks.splice(taskIndex, 1);

        setTasks([...tasks]);
        setTaskQuantity(tasks.length);
      } catch (err) {
        console.log(err);
        addToast({
          type: 'error',
          title: 'Erro ao excluir',
          description:
            'Ocorreu um erro ao excluir sua tarefa, tente novamente.',
        });
      }
    },
    [tasks, addToast],
  );

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleEditModal = useCallback(() => {
    setEditModalOpen(!editModalOpen);
  }, [editModalOpen]);

  const handleEditTask = useCallback(
    (task: TaskItem): void => {
      setEditingTask(task);
      toggleEditModal();
    },
    [toggleEditModal],
  );

  return (
    <>
      <Container>
        <Main>
          <LeftSide>
            <ProfileData
              avatarUrl={logoImg}
              name="Thereza Cristina"
              email="tcbandolilegg@gmail.com"
              birth="23/03/1966"
              // name="Anderson Pacheco"
              // email="anderson@ascenderideias.com.br"
              // birth="16/05/1994"
            />
          </LeftSide>

          <RightSide>
            <ModalAddTask
              isOpen={modalOpen}
              setIsOpen={toggleModal}
              handleAddTask={handleAddTask}
            />

            <ModalEditTask
              isOpen={editModalOpen}
              setIsOpen={toggleEditModal}
              editingTask={editingTask}
              handleUpdateTask={handleUpdateTask}
            />
            <Tasks>
              <header>
                <h1>
                  <span>{taskQuantity}</span> Consultas cadastradas
                </h1>
              </header>
              <div>
                <div>
                  <TaskItem
                    task={tasks[1]}
                    handleEditTask={handleEditTask}
                    handleDeleteTask={handleDeleteTask}
                  />
                </div>
                <div className="botoes">
                  <button type="submit" onClick={toggleModal}>
                    <p className="text">Nova consulta</p>
                    <div className="icon">
                      <FiCheckSquare size={24} />
                    </div>
                  </button>

                  <button type="submit" onClick={toggleModal}>
                    <p className="text">Nova exame</p>
                    <div className="icon">
                      <FiCheckSquare size={24} />
                    </div>
                  </button>

                  <button type="submit" onClick={toggleModal}>
                    <p className="text">Nova receita</p>
                    <div className="icon">
                      <FiCheckSquare size={24} />
                    </div>
                  </button>
                </div>
              </div>

              <div>
                {/* {tasks &&
                  tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      handleEditTask={handleEditTask}
                      handleDeleteTask={handleDeleteTask}
                    />
                  ))} */}
              </div>
            </Tasks>

            {/* E adiciona o componenete onde quiser na página */}
            {/* Chamada para o componente de upload de arquivo */}
            <Dropzone onFileUploaded={setSelectedFile} />
          </RightSide>
        </Main>
      </Container>
    </>
  );
};

export default Dashboard;
