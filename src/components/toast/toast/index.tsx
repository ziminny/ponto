import React, { useEffect } from "react"
import { AiFillCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { Message, useToast } from "../../../context/toast";
import { Container } from "./styles";

interface PropsMessage {
  message:Message;
  style:object;
}


const Toast:React.FC<PropsMessage> = ( { message , style }) => {
  const { removeToast } = useToast();

  useEffect( () => {

    const interval = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => clearInterval(interval)

  },[])

  return (
    <Container background={message.type} style={style}>
    <AiOutlineInfoCircle/>
    <div>
      <h4>{ message.title }</h4>
      { message.description && <p>{ message.description }</p>    }          
    </div>
    <button>
      <AiFillCloseCircle 
    size="16" 
    onClick={ () => {
        removeToast(message.id);
    }}/></button>
  </Container>
  )

}

export default Toast