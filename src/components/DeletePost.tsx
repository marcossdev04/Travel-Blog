import { Trash } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api/api'
import { queryClient } from '../../api/queryClient'

interface Props {
  postId: string
}
export function DeletePost({ postId }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false)
  async function handleDeletePost() {
    try {
      await api.delete(`/posts/${postId}`)
      await queryClient.refetchQueries(['getPosts'])
      setDialogOpen(false)
      toast.success('Postagem deletada com sucesso!', {
        position: 'bottom-right',
        closeOnClick: true,
        theme: 'dark',
      })
    } catch (error) {
      setDialogOpen(false)
      toast.error('Erro ao deletar a postagem ', {
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
          // onClick={handleDeletePost}
          onClick={() => setDialogOpen(true)}
        >
          <Trash />
        </Button>
      </div>
      <DialogContent className="max-h-[95%] overflow-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Deletar Postagem</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja deletar esta postagem?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <DialogClose>
            <Button
              variant="outline"
              size="default"
              className="rounded-full "
              // onClick={handleDeletePost}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="outline"
            size="default"
            className="rounded-full bg-red-600 hover:bg-red-700"
            onClick={handleDeletePost}
          >
            Deletar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
