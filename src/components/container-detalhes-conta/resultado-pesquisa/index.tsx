import React, { useRef } from "react"
import { Container , HorasTrabalhadas, Result , HoursDifference } from "./styles"
import { format } from "date-fns";
import diferenceInSeconds from "date-fns/differenceInSeconds";
import differenceInHours from "date-fns/differenceInHours";
import locale from "date-fns/locale/pt-BR"
import { Horarios, Period } from "..";
import { useReactToPrint } from 'react-to-print';
import { Day } from "../../../utils/Day";
import { FiPrinter } from "react-icons/fi";


interface PropsResutadoPesq
{
  relatorio:object
  horarios:Horarios;
  period:Period
}

interface IntervalDates {
  data:string;
  entrada:string;
  pausa:string;
  volta:string
  saida:string;

}

const ResultadoPesquisa:React.FC<PropsResutadoPesq> = ({period, relatorio , horarios}) => {

 

  const stylesPrint = `
        @media print {
          
          .container-printer {
            border:0 !important;
          }
          .title-printer {
            display:flex !important;
          }
          .days {
            display:none !important;
          }
          .hide-td {
            display: none;
          }
         
            td {
              border:0 !important;
              font-size:14px !important;
            }
            small {
              border:0 !important;
            }
        }
  `

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle:stylesPrint
  });


  function isEmpty(obj:object) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}



const hoursDaily = () =>
{
  if(!!horarios.horario) {
    const depoisDoAlmoco:number = diferenceInSeconds(
      new Date(`2000-01-01
                ${horarios.horario.saida}`) , 
      new Date(`2000-01-01 
                ${horarios.horario.volta}`));

      const antesDoalmoco:number = diferenceInSeconds(
        new Date(`2000-01-01
                  ${horarios.horario.pausa}`) , 
        new Date(`2000-01-01 
                  ${horarios.horario.entrada}`));
       const sec = antesDoalmoco + depoisDoAlmoco; 
      return (sec/60)/60;
  }
  return 0;
}

console.log("AQUI" , hoursDaily());








function calculateDiference({data , entrada , pausa , saida , volta}:IntervalDates)
{

  let antesDoAlmoco = 0
  let depoisDoAlmoco = 0;
  if(saida != "undefined") {
    depoisDoAlmoco = diferenceInSeconds(new Date(`${data} ${saida}`) , new Date(`${data} ${volta}`));
  }
  if(pausa != "undefined") {
    antesDoAlmoco = diferenceInSeconds(new Date(`${data} ${pausa}`) , new Date(`${data} ${entrada}`));
  }
  let sec:any = antesDoAlmoco+depoisDoAlmoco;
  var hours:any = Math.floor(sec/3600);
  (hours >= 1) ? sec = sec - (hours*3600) : hours = '00';
  if(hours <= 9 && hours > 0) { hours = `0${hours}`}
  var min:any = Math.floor(sec/60);
  (min >= 1) ? sec = sec - (min*60) : min = '00';
  (sec < 1) ? sec='00' : void 0;

  (min.toString().length == 1) ? min = '0'+min : void 0;    
  (sec.toString().length == 1) ? sec = '0'+sec : void 0;    

  const compare = (hours - hoursDaily());

  // trabalhou menos
  if(compare < 0) {
     let nSeg:any = (hoursDaily()*3600) - (antesDoAlmoco+depoisDoAlmoco);
     var nHours:any = Math.floor(nSeg/3600);
     (nHours >= 1) ? nSeg = nSeg - (nHours*3600) : nHours = '00';
     if(nHours <= 9 && nHours > 0) { nHours = `0${nHours}`}
     var nMin:any = Math.floor(nSeg/60);
     (nMin >= 1) ? nSeg = nSeg - (nMin*60) : nMin = '00';
     (nSeg < 1) ? nSeg='00' : void 0;
   
     (nMin.toString().length == 1) ? nMin = '0'+nMin : void 0;    
     (nSeg.toString().length == 1) ? nSeg = '0'+nSeg : void 0;   
    return "- "+nHours+':'+nMin+':'+nSeg;
  }

  // trabalhou mais , já está certo
  return "+ "+compare+':'+min+':'+sec;

  
  
}

 function convertDate(date:string)
 {
   const lDate = format(new Date(date),"dd/MM/yyyy",{locale});
   return lDate;
 }

function orderObject(obj:object) {
  let response = [];
  
  for(const o in obj) {
    //@ts-ignore
    obj[o].sort( (a , b ) => a.periodo - b.periodo)
    //@ts-ignore
    response.push(obj[o]);
  }
  return response;

}

{
  
  console.log(calculateDiference({
    data: '2021-02-02',

    entrada: '10:10:10',
    pausa: '11:10:10',
    
    volta: '12:20:10',
    saida: '13:50:10'
  }))
  
}
  return (
    <>

   {
     !isEmpty(relatorio) && (

       <>
        
    <Result>
      <small>resultado</small>
      <div onClick={handlePrint}><FiPrinter  title="Imprimir"/> <small>Imprimir</small></div>
    </Result>
    <Container ref={componentRef} className="container-printer">
        <div className="title-printer" style={{ justifyContent:'center' , alignItems:'center' ,display:'none' , flexDirection:'column' , marginBottom:'10px' }}>
            <h1 style={{ fontSize:'18px' }}>RELATÓRIO DE PONTO</h1>
            <div style={{ display:'flex' ,fontSize:'14px' }}>
                  <p>{ period.dataInicial && format(new Date(`${period.dataInicial} 10:10:10`),'dd/MM/yyyy',{locale}) } </p>
                  <p style={{ marginLeft:'5px' , marginRight:'5px'}}>até </p>
                  <p>{ period.dataFinal && format(new Date(`${period.dataFinal} 10:10:10`),'dd/MM/yyyy',{locale}) }</p>
            </div>
        </div>
        <div className="title-printer" style={{ margin:'5px' ,fontSize:'12px' , display:"none", justifyContent:'flex-start' , alignItems:'center', marginTop:'5px' , fontSize:'10px' }}>
              <p style={{ marginRight:'5px',width:'100%' ,fontSize:"14px" }}>Nome: { horarios.user && horarios.user.nome } {horarios.user && horarios.user.sobreNome}</p>
                  
        </div> 
        <div className="title-printer" style={{ display:'none', marginTop:'10px',width:'100%',justifyContent:'center'}}>
          <div style={{ width:'98%',height:'1px',border:'1px solid #000' , backgroundColor:'#000' }}></div>
        </div> 
    

      <table className="table-printer">
        <thead>
          <tr className="header-printer">
            <td>data</td>
            <td>entrada</td>
            <td>pausa</td>
            <td>retorno</td>
            <td>saida</td>
            <td>total</td>
            <td className="hide-td">editar</td>
          </tr>
        </thead>

        <tbody>
            {
              orderObject(relatorio).map( ( tr, index) => {
                const difference =      
                   calculateDiference({
                    data: tr[0].data,
                
                    entrada: tr[0] ? tr[0].hora : 'undefined',
                    pausa: tr[1] ? tr[1].hora : 'undefined',
                    
                    volta: tr[2] ? tr[2].hora : 'undefined',
                    saida: tr[3] ? tr[3].hora : 'undefined'
                  }).substr(0,1)
                
                return (
                  <tr key={index}>
                    <td>{ `${convertDate(tr[0].data)} `} 
                       <span
                        className={ `${Day.getDayOfWeek(tr[0].data).path} days` }
                       >
                            {Day.getDayOfWeek(tr[0].data).name}
                       </span>   
                    </td>
                       <td>{tr[0] ? tr[0].hora : '-----'}</td>
                       <td>{tr[1] ? tr[1].hora : '-----'}</td>
                       <td>{tr[2] ? tr[2].hora : '-----'}</td>
                       <td>{tr[3] ? tr[3].hora : '-----'}</td>
                       <td
                        className={
                            difference == '+' ? 'hours-ok' : 'he-must-hours' 
                        }
                       >{
                          calculateDiference({
                            data: tr[0].data,
                        
                            entrada: tr[0] ? tr[0].hora : 'undefined',
                            pausa: tr[1] ? tr[1].hora : 'undefined',
                            
                            volta: tr[2] ? tr[2].hora : 'undefined',
                            saida: tr[3] ? tr[3].hora : 'undefined'
                          })
                         }  </td>
                        <td className="hide-td"></td> 
                  </tr>
                )
              })
            }
        </tbody>        

      </table>
      <HorasTrabalhadas> 
            <div className="title-printer" style={{ marginBottom:'10px',display:'none' , marginTop:'10px',width:'100%',justifyContent:'center'}}>
              <div style={{ width:'100%',height:'1px',border:'1px solid #000' , backgroundColor:'#000' }}></div>
            </div>  
              <div className="title-printer" style={{display:'none', fontSize:'12px'}}>
                { format(new Date() , "dd/MM/yyyy HH:mm:ss",{locale}) }
              </div>
      </HorasTrabalhadas>    
    </Container>
   
       </>
     )
   }
    </>
  )
}

export {ResultadoPesquisa}