import { BlogPostContent } from '@/components/BlogPostContent'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
interface Props {
  params: { slug: string }
}

const Page = ({ params }: Props) => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <BlogPostContent params={params.slug} />
      <Footer />
    </div>
  )
}

export default Page
