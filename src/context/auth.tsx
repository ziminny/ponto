import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface DatasInput {
  email:string,
  senha:string
}

export interface DatasUserRegra {
  user:{
    id:string;
    nome:string;
    sobreNome:string;
    email:string;
    createdAt?:string;
    updatedAt?:string;
    regraUser: {
      idUser:string;
      idRule:string;
      createdAt:Date;
      updatedAt:Date,
      regra: {
        id: string,
        nome: string,
        codRegra: number,
        createdAt: string,
        updatedAt: string
      }
    }
  };
  token:string
}

interface DatasContext {
  datas:DatasUserRegra;
  singIn( datas:DatasInput):Promise<void>;
  logOut():void;
}

const AppContext = createContext<DatasContext>( {} as DatasContext);

function authContext() {
  const context = useContext(AppContext);

  if(!context) {
    throw new Error("Você precisa instanciar o contexto de autenticação");
  }
  return context;
  
}

const ContextUser:React.FC = ({ children }) => {
  
  const [data , setDatas ] = useState<DatasUserRegra>( () => {

    
    
    const user = localStorage.getItem("@cartao_ponto:user") 
    const token = localStorage.getItem("@cartao_ponto:token") 
    if(user && token) {
      return { user : JSON.parse(user) , token };
    }
    
    return {} as DatasUserRegra;
  });

  

  const singIn = useCallback( async (datas:DatasInput) => {
       
        const response = await api.post("auth" , {
          email:datas.email,
          senha:datas.senha
        })
             const {user , token } = response.data
            localStorage.setItem("@cartao_ponto:user",JSON.stringify(user))
            localStorage.setItem("@cartao_ponto:token",token);
            
            
            
              setDatas({ token , user});
            
               
  },[])

  const logOut = useCallback( () => {   
    
    localStorage.removeItem("@cartao_ponto:user");
    localStorage.removeItem("@cartao_ponto:token");
    setDatas({} as DatasUserRegra);

    
  },[]) 



  return (
    <AppContext.Provider value={ { datas:data ,  singIn , logOut } }>
      { children }
    </AppContext.Provider>
  );
}

export { ContextUser , AppContext , authContext };