import styled from "styled-components"

const Container = styled.div`
   display:flex;
   flex-direction:column;

     margin-right:20px;
   
   small {
     margin-bottom: 2px; 
   }
   input {
      height:25px;
      border-radius: 4px;
      border: 1px solid #ccc;
      padding-left: 5px;
   }
`

export { Container }