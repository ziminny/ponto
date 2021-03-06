import { css } from 'styled-components';
import { createGlobalStyle } from 'styled-components'

interface PropsGlobal {
  isHome:boolean;
}

export const Globals =  createGlobalStyle`
  body {
    font-size: 16px;
    background-color:#fff;
    color:#000;
    font-family: 'open sans' ,sans-serif;
  }
  * {
    outline: none;
    padding:0;
    margin:0;
    box-sizing:border-box;
    overflow: hidden;

  }
  a {
    text-decoration:none;
  }
  body {
   
  }

  button , a {
    cursor:pointer;
  }
`
export const GlobalHome = createGlobalStyle<PropsGlobal>`

overflow:hidden;

${ props => props.isHome && css`
    body {
        margin-left:60px;
        width:calc(100%-60px);
        background-color:#F9FAFC;
        

        @media(max-width:772px) {
          margin-left:0;
          width:100%;
        }   
      }
`}

`
