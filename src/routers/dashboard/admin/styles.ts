import { shade } from 'polished';
import styled, { css } from "styled-components";

interface PropsCard {
  background:string;
  color?:string;
  isActive:boolean;
}

export const Container = styled.main`

    padding:20px 30px;
    height: 95vh;
    

    header {
      margin-bottom: 20px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      h1 {
        font-weight: bold;
      }
      p {
        letter-spacing: 1px;
        font-size: 15px;
        background-color:#41463D;
        padding: 3px 7px;
        border-radius: 15px;
        color:#fff;
        box-shadow: 2px 4px 5px rgb(0,0,0,0.2);
      }
      span {
        color:#BC4749;
      }
    }

    main {
     
      height: 97%;
      display: flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      position: relative;
      z-index: 1;
      

      h2 {
         font-weight: 100;
         letter-spacing:1px;
         font-size: 25px;
         margin-bottom: 20px; 
      }
      .cardsMain {
        display:flex;
         > div {
         
         }
      }

    } 

`

export const Card = styled.div<PropsCard>`
  width: 25vw;
  cursor: pointer;
  margin: 15px;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction:column;
  justify-content:space-around;
  position: relative;
  z-index:1;
   ${ props =>  {
          
     return (
       {
        backgroundColor: !props.isActive ? props.background : shade("0.60",props.background),
        borderBottom: ` 5px solid ${shade('0.30', props.background)}`,
        color:props.color ? (!props.isActive ? props.color : shade("0.50",props.color)) : '#000'
       }
     )
   }} 

   &:hover {
     ${ props => {
       return (
         !props.isActive && {
           backgroundColor:shade("0.20", props.background)
         }
       )
     }}
   }

   h3 {
     font-size: 4rem;
   }
   > div.icon {
     display: flex;
     justify-content:flex-end;
     align-items:flex-end;
     
      span{
        font-size:2.5rem;
        margin-bottom: 5px;
        margin-right: 20px;
      }
     > svg{
        font-size:5rem;
        
      }

   }

 .check {
   position:absolute;
   top:10px;
   right:10px;
   display:none;

   ${ props => props.isActive && css`
      display:block;
   `}
   svg {
 
   }
 }
`