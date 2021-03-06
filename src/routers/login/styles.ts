import styled, { css } from "styled-components";
import { shade } from "polished"


export const Container = styled.div`

 display:flex;
 height: 100vh;
 width:100vw;

 a{
   position:absolute;
   right: 15px;
   top: 15px;
   color:#1A33D5;
   font-weight:600; 
 }


`

export const Box = styled.div`

  background-color:#1A33D5;
  margin-left:8%;
  width:40%;
  display:flex;
  justify-content:center;
  padding-left:5%;
  padding-right:5%;
  flex-direction:column;
  color:#fff;

  h1 {
    font-size:3rem;
    text-shadow: 0.1em 0.1em 0.2em rgba(0,0,0,0.3);
  }
  p{
    font-size:1.5rem;
    font-weight:100;
    line-height:32px;
    margin-top:20px;
  }

`

export const BoxForm = styled.div`

 display:flex;
 justify-content:center;
 align-items:center;
 width:100%;
 

 form {
  padding: 5px;
   max-width: 70%;
 
   h5 {
     color:#bbb;
     font-size: 20px;
     font-weight:100;
     width: 95%;
   }

   .btn {
     margin-top:40px;
     width:100%;
     text-align:center;
     padding: 0 0 15px 0;
   }
 }

`



