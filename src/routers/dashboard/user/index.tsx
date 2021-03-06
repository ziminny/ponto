import React, {  useCallback, useContext, useEffect, useState }   from "react";
import { Card, Container } from "./styles";
import { BiDoorOpen , BiCoffee , BiCheck } from "react-icons/bi";
import { FaCoffee } from "react-icons/fa"
import { RiDoorClosedLine } from "react-icons/ri"
import Breadcrumb from "../../../components/breadcrumb";
import { api } from "../../../services/api";
import { format } from "date-fns";
import ptbr from "date-fns/locale/pt-BR";
import { AppContext } from "../../../context/auth"
import { useToast } from "../../../context/toast";
import { authContext } from "../../../context/auth"
import { Month } from "../../../utils/Month";

interface Responsee {
    
  data:Array<{
    dataHorario:string,
    periodoId:number
  }>
  
}

const DashboardUser:React.FC = () => {

  const { addToast } = useToast();

  const { datas } = useContext(AppContext);
  
  const data = new Date();
  const dataHorario = format(data , 'yyyy-MM-dd HH:mm:ss', { locale: ptbr})


  const [hourState , setHourState] = useState([{}])
  /**
   * Deixa a tela mais escura do horario 
   * @param num  
   */
 //@ts-ignore
  const verifyIfDot = (num:number) => hourState.some( (res) => res.periodoId == num)
  
  
  //const { logOut } = authContext()

  /**
   *  Carrega os dados das horas do usuario atual 
   */
  useEffect( () => {
    
    
    api.get(`ponto/${datas.user.id}`,{
      headers: { 'Authorization':`barer ${datas.token}` }
    })

     .then( (response:Responsee) => {  
        const filterDate = response.data.map( res => {
          
              return { 
                   dataHorario:res.dataHorario.substr(0,10) , 
                   periodoId:res.periodoId
                  };                   
        }).filter( res => {

          
              return (
                  res.dataHorario == format(new Date() ,
                  "yyyy-MM-dd", { locale: ptbr})
                    )
        })    
        
        
        setHourState(filterDate)
     }).catch( err => {
       
       
      // if(err.response.status == 401) {

      // addToast({
      //   type:'error',
      //   title:'Ops !',
      //   description:`${err.response.data.message} logue-se novamente`
      // });
      
      //  setTimeout(() => {
      //   logOut();
      //  }, 1000);
    
      // } else {
      //   addToast({
      //   type:'error',
      //   title:'Ops !',
      //   description:`${err.response.data.message}`
      // });
      // }




     })


     
 
    
    
    
  },[authContext])
  /** Fim do useEffect */

  /**
   *  Função que grava a batida do ponto 
   *  Caso o ponto já tenha sido batido retarna um erro
   */
  const handleDot =  useCallback(async (periodoId:number) => {
              
      try {
        const response = await api.post("ponto" , {
          dataHorario,
          periodoId,
          userId:datas.user.id
         },{
          headers: { 'Authorization':`barer ${datas.token}` }
         })
        
         
         addToast({
          type:'success',
          title:'Ponto batido',
          description:response.data.message
        });
    
         setHourState([...hourState , { dataHorario:dataHorario.substr(0,10) , periodoId:periodoId }])
      } catch (error) {      
       
        addToast({
          type:'info',
          title:'Ops !',
          description:"Você já bateu este ponto"
        });
        
      }
       
  },[datas , data , dataHorario , verifyIfDot , hourState , setHourState])
  /** Fim da função */

  return (
      <Container>
          <header>
            <h1><span>Sys17</span> Sistema de ponto digital</h1>
            <p>{ Month.daysWeek(new Date)} </p>
          </header>
           <Breadcrumb
            options= {
              [
                { name:"Home" , path:"/" }
              ]
            }
           />
          <main>
            <h2> { Month.fullDate() }</h2>

            <div className="cardsMain">

              <div>
                  <Card isActive={verifyIfDot(10)} background="#069869" onClick={ () => {handleDot(10)}} color="#fff">
                    

                    <h3>1</h3>
                    <div className="icon">
                      <span>entrada</span>
                      <BiDoorOpen/>
                    </div>
                   <div className="check"> <BiCheck size="40"/> </div>
                  </Card>
                  <Card isActive={verifyIfDot(30)} background="#01C4CD" onClick={ () => {handleDot(30)}}>
                    <h3>3</h3>
                    <div className="icon">
                       <span>retorno</span>
                       <BiCoffee/>
                      
                    </div>
                    <div className="check"> <BiCheck size="40"/> </div>
                  </Card>
              </div>
              <div>
                  <Card isActive={verifyIfDot(20)} background="#F3CB46" onClick={ () => {handleDot(20)}}>
                    <h3>2</h3>
                    <div className="icon">
                       <span>pausa</span>
                       <FaCoffee/>
                    </div>
                    <div className="check"> <BiCheck size="40"/> </div>
                  </Card>
                  <Card isActive={verifyIfDot(40)} background="#FC6956" onClick={ () => { handleDot(40)}} color="#fff">
                    <h3>4</h3>
                    <div className="icon"> 
                      <span>saida</span>
                      <RiDoorClosedLine/>
                    </div>
                    <div className="check"> <BiCheck size="40"/> </div>
                  </Card>
              </div>
            </div>
          </main>
      </Container>
  );
}

export default DashboardUser;