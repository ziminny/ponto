import { shade } from "polished"
import styled from "styled-components"


export const Container = styled.table`

  display:flex;
  flex-direction:column;
 
 

`

export const THead = styled.thead`

  tr {
    display: flex;
    justify-content:space-between;
    margin-bottom:10px;
   
    td {
      border: 1px solid ${shade("0.20","#507DBC")};
      width:25%;
      padding:2px 5px;
      color:#fff;
      border-radius: 4px;
      background-color:#507DBC;
      &:first-child {
        width:30%;
      }
      &:nth-child(2) {
        width:20%;
      }
      &:nth-child(3) {
        width:10%;
      } 
      &:nth-child(4) {
        width:7%;
      }
      &:nth-child(5) {
        width:7%;
      } 
      &:nth-child(6) {
        width:7%;
      }
      &:nth-child(7) {
        width:7%;
      } 
      &:nth-child(8) {
        width:12%;
      }
      & + td {
        margin-left:5px;
      }
    }
  }

`

export const TBody = styled.tbody`

  tr {
    display: flex;
    justify-content:space-between;
     @media(max-width:1500px) {
      font-size:13px;
     }
     @media(max-width:1200px) {
      font-size:12px;
     }
    & + tr {
      margin-top:5px;
    }

  
    td {
       small.colaborador {
         background-color:#FE5F55;
         color:#fff;
         border-radius:4px;
         padding: 1px 2px;
       }
       small.admin {
         background-color:#333745;
         color:#fff;
         border-radius:4px;
         padding: 1px 2px;         
       }
      &:first-child {
        width:30%;
      }
      &:nth-child(2) {
        width:20%;
      }
      &:nth-child(3) {
        width:10%;
      } 
      &:nth-child(4) {
        width:7%;
      }
      &:nth-child(5) {
        width:7%;
      } 
      &:nth-child(6) {
        width:7%;
      }
      &:nth-child(7) {
        width:7%;
      } 
      &:nth-child(8) {
        width:12%;
      }                           
      border: 1px solid ${shade("0.20","#ffffff")};
      border-radius: 4px;
     
      padding:2px 5px;
      background-color:#fff;
      min-height: 30px;
      display:flex;
      align-items:center;

      & + td {
        margin-left:5px;
      }
      button {
        border:0;
      }
      button + button {
        margin-left: 10px;
      }
      .view {
        background-color:#118ab2;
        &:hover {
          background-color:${ shade("0.20", "#118ab2") }
        }
        
      }
      .edit {
        background-color:#ffd166;
        &:hover {
          background-color:${ shade("0.20", "#ffd166") }
        }        
      }
      .delete {
        background-color:#ef476f;
        &:hover {
          background-color:${ shade("0.20", "#ef476f") }
        }        
      }

      .view , .edit , .delete {
        
        padding: 2px;
        color:#fff;
        border-radius: 4px;
        width: 25px;
        height: 25px;
        display:flex;
        align-items:center;
        justify-content:center;
        transition: background-color .2s;

      }      
    }
    &:nth-child(even) {
         td {
          background-color:${ shade("0.05" , "#fff") }
         }
      }
  }

`
