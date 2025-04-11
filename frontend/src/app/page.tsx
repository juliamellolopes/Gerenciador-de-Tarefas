'use client'

import { useEffect, useState } from 'react'
import api from '../services/api'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'

export interface Task {
  id: number
  title: string
  description: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  completed: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const router = useRouter()

  const loadTasks = async () => {
    const res = await api.get('/tasks')
    setTasks(res.data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <Wrapper>
      <Container>
        <Header>
          <h1>📌 Minhas Tarefas</h1>
          <AddButton onClick={() => router.push('/new')}>+ Nova Tarefa</AddButton>
        </Header>

        {tasks.length === 0 ? (
          <EmptyMsg>Sem tarefas cadastradas.</EmptyMsg>
        ) : (
          <TaskList>
            {tasks.map(task => (
              <TaskCard key={task.id} $completed={task.completed}>
                <Top>
                  <Title>{task.title}</Title>
                  <Badge $priority={task.priority}>{task.priority}</Badge>
                </Top>
                {task.description && <p>{task.description}</p>}
                <p>
                  <small>Data limite: {new Date(task.dueDate).toLocaleDateString()}</small>
                </p>
                <Actions>
                  <button onClick={() => api.patch(`/tasks/${task.id}`, { completed: !task.completed }).then(loadTasks)}>
                    {task.completed ? 'Desmarcar' : 'Concluir'}
                  </button>
                  <button onClick={() => router.push(`/edit/${task.id}`)}>Editar</button>
                  <button onClick={() => api.delete(`/tasks/${task.id}`).then(loadTasks)}>Excluir</button>
                </Actions>
              </TaskCard>
            ))}
          </TaskList>
        )}
      </Container>
    </Wrapper>
  )
}

// ----- STYLES -----

const Wrapper = styled.div`
  min-height: 100vh;
  background: #fffde7;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  background: #fdd835;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    margin: 0;
    font-size: 1.8rem;
    color: #212121;
  }
`

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #388e3c;
  }
`

const EmptyMsg = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #333;
`

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const TaskCard = styled.div<{ $completed: boolean }>`
  background: ${({ $completed }) => ($completed ? '#e8f5e9' : '#fffde7')};
  padding: 1rem;
  border-radius: 10px;
  border-left: 5px solid ${({ $completed }) => ($completed ? '#4caf50' : '#fbc02d')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  p {
    margin: 0.4rem 0;
  }

  small {
    color: #666;
  }
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #212121;
`

const Badge = styled.span<{ $priority: string }>`
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  background-color: ${({ $priority }) =>
    $priority === 'high' ? '#e53935' : $priority === 'medium' ? '#fbc02d' : '#43a047'};
`

const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;

  button {
    background: #eeeeee;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      background: #e0e0e0;
    }
  }
`
