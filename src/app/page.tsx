import { BlogPostsPreview } from '@/components/BlogPostPreview'
import { BlogPostsPagination } from '@/components/BlogPostsPagination'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { wisp } from '@/lib/wisp'

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1
  const result = await wisp.getPosts({ limit: 6, page })
  return (
    <div className="container mx-auto mb-10 px-5">
      <Header />
      <BlogPostsPreview posts={result.posts} />
      <BlogPostsPagination pagination={result.pagination} />
      <Footer />
    </div>
  )
}

export default Page
