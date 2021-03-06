import styled, { css } from "styled-components";
import { animated } from "react-spring";

interface PropsToast {

  background?: "success" | "error" | "info" | "warning",

}

 const variations = {
  info: css`
    color:#353535;
    background:#b6dcfe;
  `,
  success: css`
    background:#5cb85c;
    color:#fff;
  `,
  error: css`
    background:#d9534f;
    color:#fff;  
 `,
  warning: css`
    color:#353535;
    background:#ffd061; 
  `  
}

export const Container = styled(animated.section)<PropsToast>`

 border-radius: 5px;
 box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
 padding: 10px;
 position: relative;
 display:flex;
 width: 300px;

  ${ props => variations[props.background || 'info']}

 & + section {
   margin-top: 10px;
 }

  > svg {
   margin-right: 10px;
 }

 > div {
   flex:1;
   position:relative;
   h4 {
     font-weight:600;
      margin-bottom: 2px;
      padding-right: 25px;
   }

   p {
     font-size:14px;
     opacity: 0.8;
     width: 200px;
   }

 }
 button {
   position:absolute;
   top: 10px;
   right: 10px;
   background-color:inherit;
   color:inherit;
   border:0;
   > svg {
    
   }
 }

`