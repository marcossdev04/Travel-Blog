import { SquarePen } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api/api'
import { queryClient } from '../../api/queryClient'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'

interface Props {
  postId: string
}
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

export function UpdatePost({ postId }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [, setDefaultValues] = useState<FormData | null>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      resume: '',
      content: '',
      author: '',
    },
  })

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/posts/${postId}`)
        const postData = response.data

        form.reset({
          title: postData.title,
          resume: postData.resume,
          content: postData.content,
          author: postData.author,
        })

        setDefaultValues(postData)
      } catch (error) {
        toast.error('Erro ao carregar os dados da postagem.')
      }
    }

    if (dialogOpen) {
      fetchPost()
    }
  }, [dialogOpen, postId, form])

  async function handleUpdatePost(data: FormData) {
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

      await api.put(`/posts/${postId}`, postData)
      await queryClient.refetchQueries(['getPosts'])
      setDialogOpen(false)
      toast.success('Postagem editada com sucesso!', {
        position: 'bottom-right',
        closeOnClick: true,
        theme: 'dark',
      })
    } catch (error) {
      setDialogOpen(false)
      toast.error('Erro ao editar a postagem ', {
        position: 'bottom-right',
        closeOnClick: true,
        theme: 'dark',
      })
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div>
        <Button
          variant="outline"
          size="miniIcon"
          className="rounded-full border-none"
          onClick={() => setDialogOpen(true)}
        >
          <SquarePen />
        </Button>
      </div>
      <DialogContent className="max-h-[95%] overflow-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Postagem</DialogTitle>
          <DialogDescription>
            Altere os campos abaixo para modificar a postagem.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdatePost)}
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
                  className="rounded-full "
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                variant="outline"
                size="default"
                className="rounded-full bg-green-500 hover:bg-green-600 "
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
