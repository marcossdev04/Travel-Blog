import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from './ui/card'
import { Post } from '../../types/post'
import { DeletePost } from './DeletePost'
import { UpdatePost } from './UpdatePost'

interface Props {
  post: Post
}
export function PostCard({ post }: Props) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>{post.title}</div>
        </CardTitle>
        <CardDescription>
          {post.author} em {post.created_at}
        </CardDescription>
      </CardHeader>
      <CardContent>{post.resume}</CardContent>
      <CardFooter className="flex justify-end">
        <UpdatePost postId={post.id} />
        <DeletePost postId={post.id} />
      </CardFooter>
    </Card>
  )
}
