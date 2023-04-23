import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from '@/components/Header'
import Feed from '@/components/Feed'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
   </div>
  )
}
