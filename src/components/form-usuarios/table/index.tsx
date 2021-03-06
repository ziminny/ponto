import React, { Fragment, TableHTMLAttributes, useCallback, useEffect, useState } from "react"
import { Container , TBody , THead } from "./styles"; 
import { AiOutlineEye , AiOutlineEdit , AiOutlineDelete } from "react-icons/ai"
import { api } from "../../../services/api";
import { useToast } from "../../../context/toast"
import { authContext } from "../../../context/auth"
import { Link } from "react-router-dom";
import Message from "../../messages";
import Box from "../../box-right-bottom";
import Modal from "./modal";
import { useSpring, useTransition } from "react-spring";
import { User } from "../../../routers/detalhesdaconta/admin/styles";


interface Regra {
  id: string
  nome: string
  codRegra: number
  createdAt: string
  updatedAt: string
}

interface RegraUser {
  id:string;
  idUser:string;
  idRule:string;
  createdAt:string;
  updatedAt:string;
  regra:Regra 
}

interface Horario {
  id:string;
  entrada:string;
  volta:string;
  pausa:string;
  saida:string;
}

export interface DataUser {
  id:string;
  nome:string;
  sobreNome:string;
  email:string;
  senha?:string;
  createdAt:string;
  updatedAt:string;
  regraUser:RegraUser
  horario:Horario
}

export interface DataUserCreate {
  
  nome:string;
  sobreNome:string;
  email:string;
  senha?:string;
  permissao:string;
  entrada:string;
  volta:string;
  pausa:string;
  saida:string;
}

interface InfoProps {
  method:'delete' | 'view' | 'update' | "create",
  user: DataUser | DataUserCreate
}

const Table:React.FC = () => {


   
    
  const { addToast } = useToast()
  const { datas } = authContext();
  const [dataUsers , setDataUsers] = useState<DataUser[]>({} as DataUser[]);

  const [ isModal , setIsModal ] = useState(false);
  const [action , setAction] = useState<InfoProps>({} as InfoProps);



   const handle = useCallback( async (user:DataUser) => {
   
    
 
   if(action.method === 'delete') {
     
     
    api.delete(`users/${user.id}`, {
      headers: { 'Authorization':`barer ${datas.token}` }
    }).then( res => {
      const { affected } = res.data 

      if(affected) {
        setTimeout(() => {
          setDataUsers(updated => updated.filter( item => item.id != user.id))
          addToast({
            type:'success',
            title:"Deletado",
            description:"Usuário deletado com seucesso !"
          })
        }, 250);
      }       
     
   }).catch( err => {
    addToast({
      type:'error',
      title:"Erro!",
      description:"Aconteceu algum erro ao tentar deletar o usuário"
    })
     
   })      
     
   }
   
   if( action.method === 'update') {
     
    
     
try {
  //@ts-ignore
  const dataUserCreate:DataUserCreate = user;
  const response = await api.put(`users/${user.id}` , {
    nome:dataUserCreate.nome , 
    email:dataUserCreate.email , 
    sobreNome:dataUserCreate.sobreNome ,
    permissao:dataUserCreate.permissao,
    entrada:dataUserCreate.entrada,
    pausa:dataUserCreate.pausa,
    volta:dataUserCreate.volta,
    saida:dataUserCreate.saida
  }, {
    headers: { 'Authorization':`barer ${datas.token}` }
  })
   
   if(response.status === 200) {
    addToast({
      type:'success',
      title:"ok!",
      description:"Usuário alterado com sucesso"
    })
   }
  
} catch (error) {
  addToast({
    type:'error',
    title:"Erro!",
    description:error.response.data.message
  })
   
}
   
   }
   if(action.method === 'view') {
     
     api.get(`users/${user.id}`, {
      headers: { 'Authorization':`barer ${datas.token}` }
    }).then( res => { 

        
     })
     .catch( (error) => {

     })
     
   }

   if( action.method === 'create') {
     console.log(user);
     
     //@ts-ignore
      const userDataUserCreate:DataUserCreate = user;
    try {
      const response = await api.post(`users` , {
        nome:userDataUserCreate.nome , email:userDataUserCreate.email , sobreNome:userDataUserCreate.sobreNome,
        senha:userDataUserCreate.senha,      
        permissao:userDataUserCreate.permissao,
        entrada:userDataUserCreate.entrada,
        pausa:userDataUserCreate.pausa,
        volta:userDataUserCreate.volta,
        saida:userDataUserCreate.saida,
      }, {
        headers: { 'Authorization':`barer ${datas.token}` }
      })      
 
          if(response.status === 200) {
              addToast({
                type:'success',
                title:"ok!",
                description:"Usuário criado com sucesso"
              })
          }  
      
      } catch (error) {
          addToast({
            type:'error',
            title:"Erro!",
            description:error.response.data.message
          })
      }
     
    }
    

  
},[setDataUsers , action])


  
  useEffect( () => {
    api.get("admin/users").then( (response) => {
      const users:DataUser[] = response.data.filter( 
         (res:DataUser) => res.id !== datas.user.id )
      setDataUsers(users); 
                 
                  
    })
  },[setDataUsers , isModal])



 const hideModal = useCallback( () => {
   setIsModal(false);
 },[setIsModal])

 const transitions = useTransition(isModal, null, {
  from: { opacity: 0, transform: "translateY(-40px)" },
  enter: { opacity: 1, transform: "translateY(0px)" },
  leave: { opacity: 0, transform: "translateY(-40px)" }
});


  return (
    
    dataUsers.length > 0 ? (
      <>
        
         {
           
             
            transitions.map( ( {item , key , props : style } ) => (
              item  && <Modal 
               key={key} 
               modal={hideModal} 
               style={style} 
               // @ts-ignore
               item={action } 
               handle={handle}/>
            ))
          
         }
        <Container>
          
          <THead>
            <tr>
              <td>NOME</td>
              <td>EMAIL</td>
              <td>PERMISSÃO</td>
              <td>ENTRADA</td>
              <td>PAUSA</td>
              <td>RETORNO</td>
              <td>SAIDA</td>
              <td>AÇÕES</td>
            </tr>
          </THead>

        <TBody>

        {
          
            dataUsers.length > 0 && dataUsers.map( (response , index) => {
              
              
            return (
              <Fragment key={response.id}>
              <tr>
                <td>{ response.nome } { response.sobreNome }</td>
                <td>{ response.email }</td>
                <td> <small className={response.regraUser.regra.nome}>{ !!response.regraUser && response.regraUser.regra.nome }</small></td>
                <td>{response.horario.entrada}</td>
                <td>{response.horario.pausa}</td>
                <td>{response.horario.volta}</td>
                <td>{response.horario.saida}</td>
                <td>
                  <button  className="view"
                   onClick={ () =>  {

                    setIsModal( old => !isModal );
                    setAction({
                      user:response,
                      method:'view'
                    })
                    
                  } }
                  ><AiOutlineEye/></button>
                  <button  className="edit"
                   onClick={ () =>  {

                    setIsModal( old => !isModal );
                    setAction({
                      user:response,
                      method:'update'
                    })
                    
                  } }
                  ><AiOutlineEdit/></button>
                  <button 
                  
                      className="delete"
                      onClick={ () =>  {

                        setIsModal( old => !isModal );
                        setAction({
                          user:response,
                          method:'delete'
                        })
                        
                      } }
                      >
                        <AiOutlineDelete/></button>
                </td>        
              </tr>
              
            </Fragment>
            )
          })
        } 

        
                                    
        </TBody>
        
      </Container>
      <Box click={ () => 
   {
    setIsModal(old => !isModal);
     setAction( {
       method:"create",
       user: {} as DataUserCreate
     })
     
     
     
   }

      }/>
    </>
    ) : (
    

    <>
    {        
        transitions.map( ( {item , key , props : style } ) => (
          item  && <Modal 
          key={key} 
          modal={hideModal} 
          style={style} 
          // @ts-ignore
          item={action } 
          handle={handle}/>
        ))
      
    }
    
    <Message type="info">
        Não existe nenhum usuário cadastrado ainda 
         <a 
           onClick={ () => 
             {
                setIsModal(old => !isModal);
                setAction( {
                  method:"create",
                  user: {} as DataUserCreate
                })
              }
           }
        > &nbsp; click aqui &nbsp; </a> para adicionar.         
    </Message>
    </>
    )        
  )  
}

export default Table;