'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import api from '../../services/api'

export default function NewTaskPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post('/tasks', {
      title,
      description,
      dueDate,
      priority,
    })
    router.push('/')
  }

  return (
    <Wrapper>
      <FormContainer>
        <Header>
          <Title>📋 Nova Tarefa</Title>
          <BackButton onClick={() => router.back()}>← Voltar</BackButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Título</label>
            <input
              type="text"
              placeholder="Digite aqui"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Descrição</label>
            <textarea
              placeholder="Digite uma descrição opcional"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>Data de conclusão</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Prioridade</label>
            <select
              value={priority}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setPriority(e.target.value as 'high' | 'medium' | 'low')
              }
            >
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>
          </FormGroup>

          <SubmitButton type="submit">Salvar Tarefa</SubmitButton>
        </Form>
      </FormContainer>
    </Wrapper>
  )
}

// ----- STYLES -----

const Wrapper = styled.div`
  min-height: 100vh;
  background: #fffde7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const FormContainer = styled.div`
  background: #fdd835;
  padding: 3rem 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`

const Title = styled.h2`
  font-size: 1.8rem;
  color: #212121;
  font-weight: 700;
  margin: 0;
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #000;
    text-decoration: underline;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    font-weight: 600;
    font-size: 0.95rem;
    color: #212121;
  }

  input,
  textarea,
  select {
    padding: 0.75rem;
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    background-color: #fffde7;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #4caf50;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`
