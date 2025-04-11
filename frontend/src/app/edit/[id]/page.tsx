'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styled from 'styled-components'
import api from '../../../services/api'

export default function EditTaskPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium')

  useEffect(() => {
    api.get(`/tasks/${id}`).then(res => {
      const task = res.data
      setTitle(task.title)
      setDescription(task.description)
      setDueDate(task.dueDate)
      setPriority(task.priority)
    })
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.patch(`/tasks/${id}`, {
      title,
      description,
      dueDate,
      priority,
    })
    router.push('/')
  }

  return (
    <Container>
      <h2>Editar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Descrição</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />

        <label>Data de conclusão</label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />

        <label>Prioridade</label>
        <select value={priority} onChange={e => setPriority(e.target.value as any)}>
          <option value="high">Alta</option>
          <option value="medium">Média</option>
          <option value="low">Baixa</option>
        </select>

        <button type="submit">Atualizar</button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input, textarea, select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    background: #2196f3;
    color: white;
    padding: 0.6rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
      background: #0b7dda;
    }
  }
`
