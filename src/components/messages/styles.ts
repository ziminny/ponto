import { lighten, shade } from "polished"
import { animated } from "react-spring"
import styled, { css } from "styled-components"


interface PropsMessage
{
  type:'success' | 'error' | 'info'  | 'warning',
  fontSize?:string;

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
 const color = (type:'success' | 'error' | 'info'  | 'warning' ) => {
 
  return  String(
    variations[type][0])
    .trim()
    .split(";")[0]
    .split("#")[1]
    .replace("","#")

 }


export const Container = styled(animated.div)<PropsMessage>`

  ${ props => variations[props.type || "info"] }
  font-size:${ props => !!props.fontSize ? props.fontSize : "16px" };
  letter-spacing: 1px;
  padding:15px;
  border-radius:5px;
  position:relative;
  display:flex;

${ props => css`
a {
    color: ${ shade("0.9" , color(props.type)) };
    font-weight:600;
    transition: color .2s;
    
    &:hover {
    color: ${ lighten("0.1" , color(props.type)) };
  }    
  }

`}

.icon {
  position:absolute;
  right:10px;
  svg {
    ${ props => css`
      a {
          color: ${ color(props.type) };
          font-weight:600;
          transition: color .2s;   
        }

      `}
  }
   
}

`