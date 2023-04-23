import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";


export const ModalContext =createContext(false);


export const ModalContextProvider =({children})=> {
    const [modal , setModal]= useState(false)
    return (
<ModalContext.Provider value={{modal,setModal}}>
   {children}
</ModalContext.Provider>
    )
}


export const useModal=()=>useContext(ModalContext)