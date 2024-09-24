'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from '@/components/Header'
import { AddPost } from '@/components/AddPost'
import { Footer } from '@/components/Footer'
import { PostCard } from '@/components/PostCard'
import { useQuery } from 'react-query'
import { api } from '../../../api/api'
import { Post } from '../../../types/post'

export default function Admin() {
  async function fetchPosts() {
    const response = await api.get('posts')
    return response.data
  }
  const { data: posts } = useQuery<Post[]>('getPosts', fetchPosts)
  return (
    <div className="container mx-auto max-w-6xl px-5">
      <Header />
      <div className="flex justify-end">
        <AddPost />
      </div>
      <div className="mt-10 grid grid-cols-3 gap-2">
        {posts?.map((post) => {
          return <PostCard post={post} key={post.id} />
        })}
      </div>
      <ToastContainer />
      <Footer />
    </div>
  )
}
