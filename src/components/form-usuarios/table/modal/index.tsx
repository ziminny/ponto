import React, { useCallback, useEffect, useRef, useState }  from "react";
import { Container, ModalContainer } from "./styles";
import { AiFillCloseCircle } from "react-icons/ai"
import { useSpring, useTransition } from "react-spring";
import { FiUser , FiMail, FiDatabase, FiLock } from "react-icons/fi"
import {MdDateRange} from "react-icons/md"
import { DataUser, DataUserCreate } from "../"
import { format } from "date-fns";
import locale from "date-fns/locale/pt-BR"
import { Form  } from "@unform/web";
import { FormHandles } from "@unform/core";
import Input from "../input";
import * as Yup from "yup"
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";


interface PropsModal {
  modal():void;
  item:{
    method:'delete' | 'view' | 'update' | "create",
    user:DataUser
  };
  handle(user:DataUser | DataUserCreate):void
  style:object
}



const Modal:React.FC<PropsModal> = ({ modal , item , handle , style }) => {

  const override = css`
   
   display: flex;
   justify-content: center;
   align-items:center;
   width: 100%;
   cursor:not-allowed;

  
    `;

  const [loading , setLoading] = useState(false);
  const hideContainer = useCallback( ():void => {
    const container:HTMLElement | null = document.querySelector(".container")
    if(container) {                 
      container.style.display = "none"
    }
  },[])
  const formRef = useRef<FormHandles>(null);

   const handleUpdate = useCallback( async  (datas:DataUser) => {



     Object.assign(datas , {id:item.user.id})
     const schema = Yup.object().shape( {
      nome: Yup.string().required("O campo nome é obrigatório"),
      sobreNome: Yup.string().required("O campo sobrenome é obrigatório"),
      email: Yup.string().min(3,"Código deve conter 3 carac.").max(3,"Código deve conter 3 carac."),
        entrada: Yup.string().required(" * "),
        pausa: Yup.string().required(" * "),
        volta: Yup.string().required(" * "),
        saida: Yup.string().required(" * "),
      
    });
     try {


       await schema.validate(datas , {
         abortEarly:false
       })
      handle(datas)
      setLoading( old => !loading)
      setTimeout(() => {
        hideContainer();
        modal()
      }, 500);
     } catch (err) {
      const validationErrors:{[key:string]:string } = {};
      if(err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          if(error.path) {
            validationErrors[error.path] = error.message;
          }
          formRef.current?.setErrors(validationErrors);
        });
        
      }

        
     }
 
 
   },[])

   const handleCreate = useCallback( async  (datas:DataUserCreate) => {

  
  
    Object.assign(datas , {id:item.user.id})
    const schema = Yup.object().shape( {
     nome: Yup.string().required("O campo nome é obrigatório"),
     sobreNome: Yup.string().required("O campo sobrenome é obrigatório"),
     email: Yup.string().min(3,"Código deve conter 3 carac.").max(3,"Código deve conter 3 carac."),
     senha: Yup.string().min(3,"Senha deve conter ao menos 3 carac."),
     confirmarSenha : Yup.string()
     .oneOf([Yup.ref('senha'), null], 'As senhas não conferem'),
     permissao: Yup.string().required("O campo permissão é obrigatório"),
     entrada: Yup.string().required(" * "),
     pausa: Yup.string().required(" * "),
     volta: Yup.string().required(" * "),
     saida: Yup.string().required(" * ")
   });
    try {


      await schema.validate(datas , {
        abortEarly:false
      })
    handle(datas)
     setLoading( old => !loading)
     setTimeout(() => {
       hideContainer();
       modal()
     }, 500);
    } catch (err) {
     const validationErrors:{[key:string]:string } = {};
     if(err instanceof Yup.ValidationError) {
       err.inner.forEach(error => {
         if(error.path) {
           validationErrors[error.path] = error.message;
         }
         formRef.current?.setErrors(validationErrors);
       });
       
     }

       
    }


  },[setLoading])

  

  return (
     <>
  
          <ModalContainer style={style} method={item.method}>
              <div className="header">
                  <h2>
                    {
                      item.method === "delete" && <>Tem certeza que deseja deletar esse usuário ?</>
                      || 
                      item.method === "update" && <>Alteração de usuário</>
                      ||
                      item.method === "view" && <>Dados do usuário</>
                      ||
                      item.method === "create" &&<>Criação de usuário</> 
                      
                    }
                  </h2>
                  <AiFillCloseCircle onClick={ () => {
                  hideContainer()
                  modal()
                
                }}/>
              </div>
              
              {
              
                 
            item.method === "delete" && 
                <>
                   <p> 
                      Esta ação não podera ser disfeita , 
                      clique em confirmar para  deletar este usuário ou 
                      cancelar para voltar a tela anterior.
                   </p>
                    <div className="buttons">
                        <button 
                          onClick = { () => {
                            handle(item.user)
                            setLoading(old => !loading) 
                             setTimeout(() => {
                              hideContainer();
                              modal()
                             }, 250); 
                             
                        }}>
                          { loading ? (
                              <BeatLoader size={10}
                              loading={loading}
                              css={override}
                              color="#fff"
                            >
  
                            </BeatLoader>
                          ) : (
                            <span>CONFIRMAR</span>
                          )}
                          </button>                 
                        <button 
                          onClick={ () => {
                            hideContainer()
                            modal()
                          }}
                          >
                            CANCELAR
                          </button>
                      </div> 
                 </>
                 ||
              item.method === "view" && 
                  <>
                    <article>
                        <div>
                          <h4>Nome: </h4>
                          <p> { item.user.nome } { item.user.sobreNome } </p>
                        </div>

                        <div>
                           <h4>Email: </h4>
                           <p> { item.user.email } </p> 
                        </div>
                        
                        <div>
                           <h4>Permissão: </h4>
                           <p > { item.user.regraUser ? item.user.regraUser.regra.nome : 'não atribuida' } </p>  
                        </div>  
                        
                        <div>
                          <h4>Entrada: </h4>
                          <p className="date-in">{ item.user.horario.entrada }</p>
                          <h4>Intervalo: </h4>
                          <p className="date-middle"> { item.user.horario.pausa } as { item.user.horario.volta }</p>
                          <h4>Saida: </h4>
                          <p className="date-end"> { item.user.horario.saida }</p>
                        </div>
                        

                        <div>
                          <h4>Data do cadastro: </h4>
                          <p> {format(new Date(item.user.createdAt) , "dd/MM/yyyy HH:mm:ss" , { locale})} </p>
                        </div>
                        <div></div>
                    </article> 

                    <div className="buttons">                                
                      <button 
                        onClick={ () => {
                          hideContainer()
                          modal()
                      }}
                      >
                        FECHAR
                      </button>
                    </div>                       
                  </>
                   
                  ||

             item.method === "update" &&
                   <Form onSubmit={handleUpdate} ref={formRef}>
                     <article>
                    <Input nome="nome" placeholder="Nome" 
                     icon={FiUser} defaultValue={item.user.nome}
                     />
                    <Input nome="sobreNome" placeholder="Sobrenome" 
                    icon={FiUser} defaultValue={item.user.sobreNome}
                    />
                    <Input nome="email" placeholder="Código" 
                    icon={FiMail} defaultValue={item.user.email}
                    />
                    <Input selectType nome="permissao" placeholder="Permissão" 
                    icon={FiDatabase} 
                    def={item.user.regraUser.regra.id}
                    />                               

                        <div>
                          <p className="enter" >entrada</p>
                          <MdDateRange/>
                          <Input nome="entrada" type="time" defaultValue={item.user.horario.entrada}/>   
                        </div> 

                        <div>
                          <p className="stop">pausa</p> 
                          <MdDateRange/>
                          <Input nome="pausa" type="time" defaultValue={item.user.horario.pausa}/> 
                          <p className="back">volta</p>                    
                          <MdDateRange/>
                          <Input nome="volta" type="time" defaultValue={item.user.horario.volta}/>   
                        </div> 

                        <div>
                          <p className="exit">saida</p>
                          <MdDateRange/>
                          <Input nome="saida" type="time" defaultValue={item.user.horario.saida}/>    
                        </div>                             
                      </article>

                      <div className="buttons">

                      <button type="submit"
                        >
                          {
                            loading ? (
                              <BeatLoader size={10}
                              loading={loading}
                              css={override}
                              color="#fff"
                             >
   
                             </BeatLoader>
                            ) : (
                              <span>CONFIRMAR</span>
                            )
                          }    
                          </button>
                        
                        <button type="button"
                        onClick={ () => {
                          hideContainer()
                          modal()
                            }}>CANCELAR</button>
                       </div>
                    </Form>
                    
                    ||
                    item.method === "create" &&                

                    <Form onSubmit={handleCreate} ref={formRef}>
                     <article>
                    <Input nome="nome" placeholder="Nome" 
                     icon={FiUser} 
                     />
                    <Input nome="sobreNome" placeholder="Sobrenome" 
                    icon={FiUser} 
                    />
                    <Input nome="email" placeholder="Código" 
                    icon={FiMail} 
                    />
                    <Input nome="senha" type="password" placeholder="Senha" 
                    icon={FiLock} 
                    />    
                    <Input nome="confirmarSenha" type="password" placeholder="Confirme a senha" 
                    icon={FiLock} 
                    />                                     
                    <Input selectType nome="permissao" 
                    icon={FiDatabase} 
                    
                   
                    />                               

                        <div>
                          <p className="enter" >entrada</p>
                          <MdDateRange/>
                          <Input nome="entrada" type="time"/>   
                        </div> 

                        <div>
                          <p className="stop">pausa</p> 
                          <MdDateRange/>
                          <Input nome="pausa" type="time"/> 
                          <p className="back">volta</p>                    
                          <MdDateRange/>
                          <Input nome="volta" type="time"/>   
                        </div> 

                        <div>
                          <p className="exit">saida</p>
                          <MdDateRange/>
                          <Input nome="saida" type="time"/>    
                        </div>                             
                      </article>

                      <div className="buttons">

                          
                       <button type="submit"
                        >
                          {
                            loading ? (
                              <BeatLoader size={10}
                              loading={loading}
                              css={override}
                              color="#fff"
                             >
   
                             </BeatLoader>
                            ) : (
                              <span>CONFIRMAR</span>
                            )
                          }    
                          </button>
                        
                        <button type="button"
                        onClick={ () => {
                          hideContainer()
                          modal()
                            }}>CANCELAR</button>
                       </div>
                    </Form>

                       
             
               }
              
              
          </ModalContainer>
           <Container className="container"/>

       
      </> 

 
  )
}

export default Modal;