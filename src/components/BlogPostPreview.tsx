'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { api } from '../../api/api'
import { useQuery } from 'react-query'
import { Post } from '../../types/post'

interface Props {
  post: Post
}
export function BlogPostPreview({ post }: Props) {
  return (
    <div className="break-words">
      <div className="mt-4 grid grid-cols-1 gap-3 md:col-span-2">
        <h2 className="font-sans text-2xl font-semibold tracking-tighter text-primary md:text-3xl">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </h2>
        <div className="prose italic tracking-tighter text-muted-foreground lg:prose-lg">
          {post.created_at}
        </div>
        <div className="prose line-clamp-4 leading-relaxed text-muted-foreground lg:prose-lg md:text-lg">
          {post.resume}
        </div>
      </div>
    </div>
  )
}

export const BlogPostsPreview = () => {
  async function fetchPosts() {
    const response = await api.get('posts')
    return response.data
  }
  const { data: posts } = useQuery<Post[]>('getPosts', fetchPosts)

  return (
    <div
      className={cn(
        'my-8 grid grid-cols-1 gap-16 md:my-16 md:grid-cols-2 lg:gap-28',
      )}
    >
      {posts?.map((post) => {
        return <BlogPostPreview post={post} key={post.id} />
      })}
    </div>
  )
}
