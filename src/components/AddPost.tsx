import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { api } from '../../api/api'
import { z } from 'zod'
import { Input } from './ui/input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { queryClient } from '../../api/queryClient'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Mínimo de 2 caracteres.',
  }),
  resume: z.string().min(2, {
    message: 'Mínimo de 2 caracteres.',
  }),
  content: z.string().min(2, {
    message: 'Mínimo de 2 caracteres.',
  }),
  author: z.string().min(2, {
    message: 'Mínimo de 2 caracteres.',
  }),
})
type FormData = z.infer<typeof formSchema>

export function AddPost() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      resume: '',
      content: '',
      author: '',
    },
  })

  const handleCreatePost = async (data: FormData) => {
    try {
      const today = new Date()
      const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(today)

      const postData = {
        ...data,
        created_at: formattedDate,
      }

      await api.post('/posts', postData)
      await queryClient.refetchQueries(['getPosts'])
      toast.success('Postagem adicionada com sucesso!', {
        position: 'bottom-right',
        closeOnClick: true,
        theme: 'dark',
      })
      setDialogOpen(false)
    } catch (error) {
      toast.error('Erro ao adicionar a postagem ', {
        position: 'bottom-right',
        closeOnClick: true,
        theme: 'dark',
      })
    }
  }

  const handleCloseDialog = () => {
    form.reset()
    setDialogOpen(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setDialogOpen(true)}
          aria-label="Fazer Postagem" // Adicionado atributo aria-label
        >
          <Plus size={40} />
        </Button>
      </div>
      <DialogContent className="max-h-[95%] overflow-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Fazer Postagem</DialogTitle>
          <DialogDescription>
            Faça a postagem da sua nova viagem.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreatePost)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do post" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumo</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Resumo do post"
                      {...field}
                      className="w-full resize-none overflow-hidden rounded-md border p-2"
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Conteúdo do post"
                      {...field}
                      className="w-full resize-none overflow-hidden rounded-md border p-2"
                      rows={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder="Autor do post" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <DialogClose>
                <Button
                  variant="outline"
                  size="default"
                  className="rounded-full"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                variant="outline"
                size="default"
                className="rounded-full bg-green-500 hover:bg-green-600"
                type="submit"
              >
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
