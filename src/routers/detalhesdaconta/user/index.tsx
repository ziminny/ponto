import React, {  useEffect, useState }  from "react";
import {  Container , Header ,User , CardDados , CardHours , Cards as CardsLocal} from "./styles";
import { FiUser } from "react-icons/fi"
import Breadcrumb from "../../../components/breadcrumb";
import { authContext } from "../../../context/auth"
import Cards from "../../../components/cards";
import { format } from "date-fns";
import locale from "date-fns/locale/pt-BR"
import { api } from "../../../services/api";

interface UserDetailsResponse {
  horasTrabalhadas: string,
  diasCompletos: number,
  diasIncompletos: number,
  diasTabalhados: number,
  mesAtual:string
}

const DetalhesDaContaUser:React.FC = () => {
  const { datas } = authContext();
  const [resumeUser , setResumeUser] = useState<UserDetailsResponse>({} as UserDetailsResponse)
  const formatDate = format(new Date(String(datas.user.createdAt)), 'dd/MM/yyyy',{locale})

  useEffect( () => {
      api.get<UserDetailsResponse>(`/ponto/${datas.user.id}/details`,{
        headers: { 'Authorization':`barer ${datas.token}` }
      }).then( response => {
        setResumeUser(response.data)
        
      })
  },[datas , setResumeUser])

  return (
    <Container>
      <Header>
         <User>
            <FiUser size="22"/> <span>{ datas.user.nome }</span>
         </User>
         <Breadcrumb options= { [ 
           { name:'Home' , path:'/' } ,
           { name:'Detalhes da conta' , path:'/detalhes-da-conta' }
           ] } />
      </Header>

      <CardsLocal>
            <CardDados>
                <h4>Cargo</h4>
                <span>Funcionário</span>

                <h4>Nome</h4>
                <span>{ datas.user.nome }&nbsp;{ datas.user.sobreNome }</span>
                
                <h4>Email</h4>
                <span>{ datas.user.email }</span>

                <h4>Data do cadastro </h4>
                  <span> { formatDate } </span>           

            </CardDados> 

            <CardHours>

           <h2>Detalhes do mês de { resumeUser.mesAtual } </h2>
           <div>
                  <Cards props={ { amount:String(resumeUser.diasTabalhados) ,  title:"Dias Trabalhados" , bgColor: {
                    one:'#E94987',
                    two:'#BE529E'
                  } } }/>
                  <Cards props={ { amount:String(resumeUser.diasCompletos) ,  title:"Completos" , bgColor: {
                    one:'#875FC0',
                    two:'#5A49BB'
                  } } }/>
                  <Cards props={ { amount:String(resumeUser.horasTrabalhadas || 0) ,    title:"Total de horas", bgColor: {
                    one:'#46C5F2',
                    two:'#609ADD'
                  } } }/>
                  <Cards props={ { amount:String(resumeUser.diasIncompletos) , title:"Incompletos", bgColor: {
                    one:'#FEB131',
                    two:'#F58553'
                  } } }/>
           </div>
              
            </CardHours>  
      </CardsLocal>     
      
    </Container>
  )

}

export default DetalhesDaContaUser;