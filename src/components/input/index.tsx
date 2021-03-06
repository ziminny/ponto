import React, { HTMLProps, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { Container } from "./styles";
import { useField } from "@unform/core";

interface PropsInput extends HTMLProps<HTMLInputElement> {
  name:string;
  icon?:IconType
}

const Input:React.FC<PropsInput> = ( { icon:Icon , name , ...rest}) => {
  const [isfocus , setIsfocus] = useState(false);
  const inputRef = useRef(null);
  const { fieldName , error , defaultValue , registerField } = useField(name);
  useEffect( () => {
      registerField({
        name:fieldName,
        getValue: ref =>  ref.value,
        ref: inputRef.current
      })
  },[fieldName , registerField])
  return (
   <>
       <Container focus={isfocus} >
         { Icon && <Icon/> }
        <input { ...rest }
        onFocus={ () => setIsfocus(true) }
        onBlur={ () => setIsfocus(false) }
        ref={inputRef}
        name={name}
    />
   
    </Container>
    <small style={{border: "2px solid transparent" , color:"#FF312E"}}>{ error }</small>
    </>
  )
}

export default Input;