'use client'
import { GetPostResult } from '@/lib/wisp'
import Link from 'next/link'
import sanitize, { defaults } from 'sanitize-html'

export const PostContent = ({ content }: { content: string }) => {
  const sanitizedContent = sanitize(content, {
    allowedTags: [
      'b',
      'i',
      'em',
      'strong',
      'a',
      'img',
      'h1',
      'h2',
      'h3',
      'code',
      'pre',
      'p',
      'li',
      'ul',
      'ol',
      'blockquote',
      // tables
      'td',
      'th',
      'table',
      'tr',
      'tbody',
      'thead',
      'tfoot',
      'small',
      'div',
      'iframe',
    ],
    allowedAttributes: {
      ...defaults.allowedAttributes,
      '*': ['style'],
      iframe: ['src', 'allowfullscreen', 'style'],
    },
    allowedIframeHostnames: ['www.youtube.com', 'www.youtube-nocookie.com'],
  })
  return (
    <div
      className="blog-content mx-auto"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    ></div>
  )
}

export const BlogPostContent = ({ post }: { post: GetPostResult['post'] }) => {
  if (!post) return null
  const { title, publishedAt, createdAt, content, tags } = post
  return (
    <div>
      <div className="prose mx-auto mb-10 break-words dark:prose-invert lg:prose-xl lg:mt-20 lg:prose-h1:text-4xl">
        <h1>{title}</h1>
        <PostContent content={content} />

        <div className="mt-10 text-sm opacity-40">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.name}`}
              className="mr-2 text-primary"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
        <div className="mt-4 text-sm opacity-40">
          {Intl.DateTimeFormat('en-US').format(
            new Date(publishedAt || createdAt),
          )}
        </div>
      </div>
    </div>
  )
}
