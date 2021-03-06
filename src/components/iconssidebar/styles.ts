import  styled, {css}  from 'styled-components';
import { darken, lighten } from "polished";

interface IsActive {
  active?:boolean
}

export const Container = styled.div<IsActive>`


   & + div {
     margin-top:20px;
   } 
   a {
     padding:8px;
     border-radius: 50%;
     display:flex;
     align-items:center;
     justify-content:center;
     background-color:#000;
     transition: all 0.4s;
     color:${darken("0.20","#ccc")};

     &:hover {
        background-color: ${lighten("0.1","#000")};
        color: #fff;
     }

        ${ props => props.active && css`
            background-color: ${lighten("0.1","#000")};
            color: #fff;       
          `}
   }
  svg {
 
    width: 22px;
    height:22px;

    
  }



`