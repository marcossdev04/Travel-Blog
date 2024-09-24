import { BlogPostsPreview } from '@/components/BlogPostPreview'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const Page = () => {
  return (
    <div className="container mx-auto mb-10 max-w-6xl px-5">
      <Header />
      <BlogPostsPreview />
      <Footer />
      <div>teste</div>
    </div>
  )
}

export default Page
