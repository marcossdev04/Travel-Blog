'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from '@/components/Header'
import { AddPost } from '@/components/AddPost'
import { Footer } from '@/components/Footer'

export default function Admin() {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <AddPost />
      <ToastContainer />
      <Footer />
    </div>
  )
}
