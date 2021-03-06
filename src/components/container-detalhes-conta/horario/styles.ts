import styled from "styled-components";

const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction:column;

 p {
   margin-bottom:2px;
   display: flex;
   align-items: center;
   justify-content: center;
   svg {
    margin-right: 2px;
   }
 }

 small {
   display:flex;
   background-color: #000000;
   border-radius:5px;
   color:#fff;
   padding: 2px 8px;
   font-size: 14px;
   box-shadow: 2px 4px 8px rgba(0,0,0,0.2);
 }
`

export {Label};