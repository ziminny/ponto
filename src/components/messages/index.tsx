import React from "react"
import { Link } from "react-router-dom";
import { Container } from "./styles"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { useSpring } from "react-spring";

interface PropsMessage
{
  type:'success' | 'error' | 'info'  | 'warning',
 
}


const Message:React.FC<PropsMessage> = ( { type  , children }) => {

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  })

  return (
    <Container type={type} style={props}>
         { children }
        <span className="icon">
         <AiOutlineInfoCircle size="20"/>
        </span>
    </Container>
  )
}

export default Message;