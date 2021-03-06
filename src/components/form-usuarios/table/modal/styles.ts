import { lighten, shade } from "polished"
import { animated } from "react-spring"
import styled, { css } from "styled-components"

interface PropsContainer {
  method:"update" | "delete" | "view" | "create"
}

const updateDelete = css`
article {
  > div {
    display: flex;
    align-items:center;
    border:1px solid #ccc;
    width: 100%;
    border-radius: 4px;
   
    height: 30px;
    & + div {
      margin-top: 10px;
    }

    svg {
      margin-right: 10px;
      margin-left: 5px;
    }
    input {
      border:0;
      background:transparent;
      flex:1;
    }
    > p {
      margin-left: 5px;
      font-size: 12px;
      width: 50px;
    }
    .enter , .stop , .back , .exit {
      font-weight:bold;
    }
    .enter {
      color:#D84727;
    }
    .stop {
      color:#EF7B45;
    }
    .back {
      color:#8B85C1 ;
    }

    .exit {
      color:#32965D;
    }
  }
}
`

const typeModal = {
  update: updateDelete,
  delete: css`
   > p {
    font-size: 14px;
    width: 80%;
    line-height: 18px;
    letter-spacing: 0.02rem;
  }
  `,

  view: css`
   article {
   display: flex;
   flex-direction:column;
       > div {
      
       display: flex;
       padding: 5px 0;
   
      > p {
       
        display:block;
        margin:0 5px;
        font-size:14px;
       
      }
      .date-in {
        background-color:#EF7B45;
        color:#fff;
        padding: 2px 8px;
        border-radius: 5px;
        box-shadow: 3px 4px 2px rgba(0,0,0,0.1);
        border:1px solid ${shade("0.10", "#EF7B45")};
      }
      .date-middle {
        background-color:#D84727;
        color:#fff;
        padding: 2px 8px;
        border-radius: 5px;
        box-shadow: 3px 4px 2px rgba(0,0,0,0.1);
        border:1px solid ${shade("0.10", "#D84727")};
      }
      .date-end {
        background-color:#2D3142;
        color:#fff;
        padding: 2px 8px;
        border-radius: 5px;
        box-shadow: 3px 4px 2px rgba(0,0,0,0.1);
        border:1px solid ${shade("0.10", "#2D3142")};
      }
      > h4 {
        
      }
    }
  }
  `,
  create: updateDelete
}


export const Container = styled.div`

width:100vw;
height:100vh;
background-color:rgba(0,0,0,0.3);
display:flex;
position:absolute;
z-index:99;
left:0;
top:0;
`

export const ModalContainer = styled(animated.div)<PropsContainer>`

  width:600px;
  background-color:#fff;
  position:absolute;
  z-index:100;
  left:calc(50% - 300px);
  top:calc(30%);
  border-radius:4px;
  padding: 20px;
  div.header {
      display:flex;
      justify-content:space-between;     
     
      h2 {
        font-size: 22px;
        font-weight:600;
        &::after {
          content: '';
          width: 100%;
          height: 1px;
          background-color: #bbb;
          display:block;
          margin: 10px 5px;
          
        }

      }
      svg {
          margin-top:7px;
          cursor: pointer;
          transition: color .2s;
           &:hover {
             color:${lighten("0.20","#000")}
           }
      }
  }
  ${ props => typeModal[props.method] }

  div.buttons {
    margin-top: 40px;
    display:flex;
    justify-content:flex-end;
    
    height: 40px;
    padding: 5px 0;
    
    button {
      border:0;
      color:#fff;
      padding: 7px 12px;
      border-radius: 4px;
      transition: background-color 0.2s;
      display:flex;
      justify-content: center;
      align-items:center;
      position: relative;
    }
    button:first-child {
      background-color:#2DCB70;
      margin-right: 10px;

      width: 120px;
     
       &:hover {
         background-color:${shade("0.20","#2DCB70")}
       }
    }
    button:last-child {
      background-color:#E84C3D;
      &:hover {
         background-color:${shade("0.20","#E84C3D")}
       }
    }
  }

`