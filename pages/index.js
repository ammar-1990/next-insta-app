import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Feed from "@/components/Feed";
import { AnimatePresence, motion } from "framer-motion";
import { auth } from "@/firebase";
import { useModal } from "@/lib/ModalContext";
import Modal from "@/components/Modal";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { BallTriangle } from "react-loader-spinner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { modal } = useModal();
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!user)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="black"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );

  return (
    <div>
     
      <Header />
      <Feed />

      <AnimatePresence>{modal && <Modal />}</AnimatePresence>
    </div>
  );
}
