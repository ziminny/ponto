import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles";

interface PropsIcons {
   link?:string,
   click(obj:React.MouseEvent<HTMLElement>):void,
   active?:boolean,
}

export const Icons:React.FC<PropsIcons> = ( { children , link , click , active  }) => {



  return (
    <Container active={active} >
        { link ? (
              <Link to={link} >
              { children }
              </Link>
            ) : 
            (
              <a href="#" onClick={click}> 
                { children }
              </a>)
        }
    </Container>
  );
}