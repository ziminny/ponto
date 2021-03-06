import styled, { css } from "styled-components";

interface BgColor {
  start:string;
  end?:string;
}



export const Component = styled.div<BgColor>`
 
     
      width:200px;
      border-radius: 5px;
      height:100px;
      color:white;
      padding: 10px;
      ${ props => props.end ? css`
        background-image: linear-gradient(to right ,${ props.start },${ props.end });
      ` : css`
        background-color:${props.start};
      ` }
      h2 {
        font-weight:100;
        font-size:35px;
        letter-spacing:0.03rem;
        font-weight:600;

      }
      p {
        color:white;
        margin-top:5px;
        font-size:14px;
        letter-spacing:0.03rem;
        font-weight:400;
      }
     

`