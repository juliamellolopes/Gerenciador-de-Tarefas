'use client'

import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import api from '../services/api'

export interface Task {
  id: number
  title: string
  description: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  completed: boolean
}

export const TaskItem = ({ task, onDelete }: { task: Task; onDelete: () => void }) => {
  const router = useRouter()

  const handleDelete = async () => {
    await api.delete(`/tasks/${task.id}`)
    onDelete()
  }

  const handleComplete = async () => {
    await api.patch(`/tasks/${task.id}`, { completed: !task.completed })
    onDelete()
  }

  return (
    <Container $completed={task.completed}>
      <Info>
        <strong>{task.title}</strong>
        <p>{task.description}</p>
        <small>Prazo: {new Date(task.dueDate).toLocaleDateString()}</small>
        <Priority $level={task.priority}>Prioridade: {task.priority}</Priority>
      </Info>
      <Actions>
        <button onClick={handleComplete}>
          {task.completed ? 'Desmarcar' : 'Concluir'}
        </button>
        <button onClick={() => router.push(`/edit/${task.id}`)}>Editar</button>
        <button onClick={handleDelete}>Excluir</button>
      </Actions>
    </Container>
  )
}

const Container = styled.div<{ $completed: boolean }>`
  border: 1px solid #ccc;
  background: ${({ $completed }) => ($completed ? '#e0ffe0' : '#fff')};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`

const Info = styled.div`
  margin-bottom: 0.5rem;
`

const Priority = styled.div<{ $level: string }>`
  color: ${({ $level }) =>
    $level === 'high' ? 'red' : $level === 'medium' ? 'orange' : 'green'};
  font-weight: bold;
`

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  button {
    background: #eee;
    border: none;
    padding: 0.3rem 0.7rem;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background: #ddd;
    }
  }
`
