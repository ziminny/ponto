import { lighten } from "polished";
import styled from "styled-components";

const Container = styled.div`


 
  display:flex;
  flex-direction:column;
  /* align-items:flex-end; */
  border-top:3px solid #6C75BA;
  border-bottom:1px solid #6C75BA;
  border-left:1px solid #6C75BA;
  border-right:1px solid #6C75BA;
  border-radius: 0 0 4px 4px;
  padding: 15px 20px;

  table {
    display: flex;
    width: 100%;
    flex-direction:column;
    

    thead {
       tr {
          
         display:flex;
         justify-content:space-between;
         margin-bottom: 10px;
         td {
          border: 1px solid #ccc;
          background-color:${lighten("0.10","#ccc")};
          border-radius: 4px;
          padding:5px;
          font-weight:600;
          width: 20%;
          & + td {
            margin-left: 10px;
          }          
         }
       }
    }
    tbody {
      tr {
         display:flex;
         justify-content:space-between;
         margin-bottom: 5px; 
         td {
          width: 20%;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding:5px; 
          span.days {
            font-size: 13px;
          }
          span.domingo {
            color:#00CC66;
          }
          span.sabado {
            color:#D90368;
          }
          span.segunda , span.terca , span.quarta , span.quinta , span.sexta {
            color:#1e6091;
          }
          &.he-must-hours {
            color:#E63B2E;
          } 
          &.hours-ok {
            color:#2d6a4f;
          }        
          & + td {
            margin-left: 10px;
          }
         }               
      }
    }
  }
  
`

const Result = styled.div`

  margin-top: 20px;
  background-color:#6C75BA;
  border-radius:4px 4px 0 0;
  color:#fff;
  display: flex;
  justify-content:space-between;
  align-items: center;
  padding: 2px 10px;
  font-weight: 100;
  

  small {
    font-style: 15px;
  }
   div {
     cursor: pointer;
     display: flex;
     align-items: center;

     small {
       margin-left: 5px;
     }
   }

`

const HorasTrabalhadas = styled.div`

 display:flex;
 flex-direction:column;
 justify-content:space-between;
 margin-top: 10px;
 


`

const PrintSearchResult = styled.div`
  margin-top: 10px;
  display: flex;

`
 interface PropsHoursDifference {
   color:string;
 }
const HoursDifference = styled.small<PropsHoursDifference>`

 border-radius: 4px;
 border: 1px solid ${ props => props.color };
 color: ${ props => props.color };
 padding: 1px 2px;
 font-size: 10px;
 margin-right:10px;

`

export {Container , Result , HorasTrabalhadas , PrintSearchResult , HoursDifference };