import "@/styles/globals.css";
import { ModalContextProvider } from "@/lib/ModalContext";




export default function App({ Component, pageProps }) {
  return (
    <ModalContextProvider>
      <Component {...pageProps} />
    </ModalContextProvider>
  );
}
