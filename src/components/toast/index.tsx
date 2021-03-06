import React from "react";
import { Container } from "./styles";
import { Message } from "../../context/toast";
import Toast from "./toast";
import { useTransition } from "react-spring";

interface PropsMessages {
  messages:Message[]
}

const ToastContainer:React.FC<PropsMessages> = ( { messages }) => {

  const messagesWithTransitions = useTransition(
     messages , 
     message => message.id,
     {
       from: { right: '-120%'  },
       enter: { right: '0%'  },
       leave: { right: '-120%' }
     }
     )
  
  return (
    
      <Container>
        {
          messagesWithTransitions.map( ({item , key , props}) => (
            <Toast message={item} key={key} style={props} />
          ))
        }
          
      </Container>

      
  )
}

export default ToastContainer;