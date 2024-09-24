'use client'
import { cn } from '@/lib/utils'
import { GetPostsResult } from '@/lib/wisp'
import { formatDate } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent } from 'react'

export const BlogPostPreview: FunctionComponent<{
  post: GetPostsResult['posts'][0]
}> = ({ post }) => {
  return (
    <div className="break-words">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/9]">
          <Image
            alt={post.title}
            className="object-cover"
            src={post.image || '/images/placeholder.webp'}
            fill
          />
        </div>
      </Link>
      <div className="mt-4 grid grid-cols-1 gap-3 md:col-span-2">
        <h2 className="font-sans text-2xl font-semibold tracking-tighter text-primary md:text-3xl">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="prose italic tracking-tighter text-muted-foreground lg:prose-lg">
          {formatDate(post.publishedAt || post.updatedAt, 'dd MMMM yyyy')}
        </div>
        <div className="prose line-clamp-4 leading-relaxed text-muted-foreground lg:prose-lg md:text-lg">
          {post.description}
        </div>
        <div className="text-sm text-muted-foreground">
          {post.tags.map((tag) => (
            <div key={tag.id} className="mr-2 inline-block">
              <Link href={`/tag/${tag.name}`}>#{tag.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const BlogPostsPreview: FunctionComponent<{
  posts: GetPostsResult['posts']
  className?: string
}> = ({ posts, className }) => {
  return (
    <div
      className={cn(
        'my-8 grid grid-cols-1 gap-16 md:my-16 md:grid-cols-2 lg:gap-28',
        className,
      )}
    >
      {posts.map((post) => (
        <BlogPostPreview key={post.id} post={post} />
      ))}
    </div>
  )
}
