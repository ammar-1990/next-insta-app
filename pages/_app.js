import "@/styles/globals.css";
import { ModalContextProvider } from "@/lib/ModalContext";
import Head from "next/head";




export default function App({ Component, pageProps }) {
  return (
    <ModalContextProvider>
       <Head>
        <title>Instagram</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </ModalContextProvider>
  );
}
