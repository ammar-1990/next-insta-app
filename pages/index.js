import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from '@/components/Header'
import Feed from '@/components/Feed'
import {AnimatePresence ,motion} from 'framer-motion'

import { useModal } from '@/lib/ModalContext'
import Modal from "@/components/Modal";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {modal} = useModal()
  console.log(modal)
  return (
   <div>

    <Head>
      <title>
        Instagram
      </title>
      <link rel='icon' href='/logo.png' />
    </Head>
    <Header />
    <Feed />

    
    <AnimatePresence>
{    modal && <Modal />}
    </AnimatePresence>
    
    
   </div>
  )
}
