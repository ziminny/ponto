import React, { HTMLProps, useState } from "react";
import { Container } from "./styles";
import {IconBaseProps, IconType } from "react-icons"


interface PropsButton extends HTMLProps<HTMLButtonElement>  {
  icon:IconType
}

const Button:React.FC<PropsButton> = ( { icon:Icon }) => {

  return (
    <Container> 
         <Icon size="20"/>              
    </Container>
  )
}

export default Button;