import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AddPost } from '../../components/AddPost'
import { QueryClient, QueryClientProvider } from 'react-query'
import { toast } from 'react-toastify'
import * as api from '../../../api/api'

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

jest.mock('../../../api/api', () => ({
  api: {
    post: jest.fn(),
  },
}))

describe('AddPost Component', () => {
  const queryClient = new QueryClient()

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <AddPost />
      </QueryClientProvider>,
    )
  })

  test('renders AddPost component', () => {
    // Simular a abertura do diálogo
    fireEvent.click(screen.getByRole('button', { name: /fazer postagem/i }))

    // Verifica se o título do diálogo está presente
    expect(screen.getByText('Fazer Postagem')).toBeInTheDocument()
  })

  test('submits the form with correct data', async () => {
    // Simular a abertura do diálogo
    fireEvent.click(screen.getByRole('button', { name: /fazer postagem/i }))

    // Preencher o formulário
    fireEvent.change(screen.getByPlaceholderText('Título do post'), {
      target: { value: 'Título de Teste' },
    })
    fireEvent.change(screen.getByPlaceholderText('Resumo do post'), {
      target: { value: 'Resumo de Teste' },
    })
    fireEvent.change(screen.getByPlaceholderText('Conteúdo do post'), {
      target: { value: 'Conteúdo de Teste' },
    })
    fireEvent.change(screen.getByPlaceholderText('Autor do post'), {
      target: { value: 'Autor de Teste' },
    })

    // Simular o envio do formulário
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    // Esperar pela chamada do API e verificar se a API foi chamada com os dados corretos
    await waitFor(() => {
      expect(api.api.post).toHaveBeenCalledWith('/posts', {
        title: 'Título de Teste',
        resume: 'Resumo de Teste',
        content: 'Conteúdo de Teste',
        author: 'Autor de Teste',
        created_at: expect.any(String), // Verifica se a data foi adicionada
      })
      expect(toast.success).toHaveBeenCalledWith(
        'Postagem adicionada com sucesso!',
        {
          position: 'bottom-right',
          closeOnClick: true,
          theme: 'dark',
        },
      )
    })
  })

  test('shows error toast on submit failure', async () => {
    // Simular a falha na chamada da API
    ;(api.api.post as jest.Mock).mockRejectedValueOnce(new Error('Erro'))

    // Simular a abertura do diálogo
    fireEvent.click(screen.getByRole('button', { name: /fazer postagem/i }))

    // Preencher o formulário
    fireEvent.change(screen.getByPlaceholderText('Título do post'), {
      target: { value: 'Título de Teste' },
    })
    fireEvent.change(screen.getByPlaceholderText('Resumo do post'), {
      target: { value: 'Resumo de Teste' },
    })
    fireEvent.change(screen.getByPlaceholderText('Conteúdo do post'), {
      target: { value: 'Conteúdo de Teste' },
    })
    fireEvent.change(screen.getByPlaceholderText('Autor do post'), {
      target: { value: 'Autor de Teste' },
    })

    // Simular o envio do formulário
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    // Esperar pela chamada da API e verificar se o toast de erro foi chamado
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Erro ao adicionar a postagem ',
        {
          position: 'bottom-right',
          closeOnClick: true,
          theme: 'dark',
        },
      )
    })
  })
})
