'use client'
import { Post } from '../../types/post'
import { api } from '../../api/api'
import { useQuery } from 'react-query'
interface Props {
  params: string
}
export const BlogPostContent = ({ params }: Props) => {
  async function fetchPost() {
    const response = await api.get(`/posts/${params}`)
    return response.data
  }
  const { data: post } = useQuery<Post>('getPost', fetchPost)
  return (
    <div>
      <div className="prose mx-auto mb-10 break-words dark:prose-invert lg:prose-xl lg:mt-20 lg:prose-h1:text-4xl">
        <h1>{post?.title}</h1>
        <div>{post?.content}</div>
        <div className="mt-4 text-sm opacity-40">
          {post?.author}, {post?.created_at}
        </div>
      </div>
    </div>
  )
}
