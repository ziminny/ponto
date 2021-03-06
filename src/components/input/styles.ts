import { shade } from "polished";
import styled, { css } from "styled-components";

interface PropsInput {
  focus:boolean;
}

export const Container = styled.div<PropsInput>`



      background-color:#fff;
      box-shadow: 1px 2px 7px rgba(0,0,0,0.1) , -5px 2px 7px rgba(0,0,0,0.1);
      display:flex;
      align-items:center;
      margin-top:40px;
      margin-bottom:5px;
      height:40px;
      border-radius:5px;
      border:2px solid transparent;
      ${ props => props.focus && css`
        border-color:#1A33D5;    
      `}
      input {
        flex:1;
        background-color:transparent;
        border:0;
        height:100%;
        margin-left:10px;
        letter-spacing:1px;
        &::placeholder {
          color:#bbb; 
        }
      }

      svg {
        margin-left: 10px;
        color:#bbb;
        ${ props => props.focus && css`
        color:${ shade("0.30","#bbb")};
      `}
      }



`