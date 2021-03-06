import { lighten } from 'polished';
import styled from "styled-components";

export const Container = styled.div`



  background-color:#fff;
  color: #000;
  position: fixed;
  left:-240px;
  top:0;
  z-index:9;
  width:300px;
  height:100vh;
  display: flex;
  flex-direction:column;

  header {
    margin: 20px;
    font-weight:bold;
    letter-spacing:1px;
  }
  main {
    margin-left:20px;
    display:flex;
    flex-direction:column;

    span {
      font-weight:100;
      font-size: 14px;
      
       & + span {
         margin-top:20px;
       }
       a {
         color: #000;
         padding: 2px 10px;
        

          
       }
    }
    @keyframes moveTextOptions {
      from {
        margin-left:0;
        color: #000;
      }
      to {
        margin-left:10px;
        color: ${lighten("0.20", "#000")};
      }
   }

   @keyframes moveTextOptionsOut {
      from {
        margin-left:10px;
        color: ${lighten("0.20", "#000")};
        
      }
      to {
        margin-left:0;
        color: ${lighten("0.20", "#000")};
        color: #000;
      }
   }

  }

  @keyframes showContainerMenu {
    from {
      left:-240px;
    }
    to {
      left:60px;
    }
  }

  @keyframes hideContainerMenu {
    from {
      left:60px;
    }
    to {
      left:-240px;
    }
  }

`

export const Molde = styled.div`

    position:absolute;
    background-color:#000;
    opacity:0.5;
    height:100vh;
    right:0;
    top:0;
    z-index:2;
   

`