import { Omit } from "@unform/core";
import React , { createContext, useCallback, useContext, useState } from "react";
import ToastContainer from "../components/toast";
import * as uuid from "uuidv4";



export interface Message
{
  id:string;
  title:string;
  type: 'info' | 'error' | 'success' | 'warning';
  description?:string;

}
interface ToastContextData
{
  addToast(message:Omit<Message , "id">):void;
  removeToast(id:string):void
}

const AppContext = createContext<ToastContextData>({} as ToastContextData); 

const ToastContext:React.FC = ({ children }) => {

  const [ messages , setMessages ] = useState<Message[]>([])

  const addToast = useCallback( ({ type , title , description }:Omit<Message , "id">) => {
      const id = uuid.uuid();

      const toast = {
        id,
        type,
        title,
        description

      }
      setMessages((old) => [ ...old , toast])

      
  },[])

  const removeToast = useCallback( (id:string) => {
      setMessages( state => state.filter( message => message.id != id))    
  },[]) 

  return (
  <AppContext.Provider value={ { addToast , removeToast } }>
      { children }
      <ToastContainer messages={messages}/>
    </AppContext.Provider>
  )

}

function useToast() {
  const context = useContext(AppContext)

  if(!context) {
    throw new Error("Você precisa envolver no contexto o toast antes de usar");
    
  }
  return context;
}

export { ToastContext , useToast };