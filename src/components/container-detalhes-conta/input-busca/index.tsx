import { useField } from "@unform/core"
import React, { InputHTMLAttributes, useEffect, useRef } from "react"
import { Container } from "./styles"

interface PropsInput extends InputHTMLAttributes<HTMLInputElement>{
 type?:string;
 name:string;
}

const Input:React.FC<PropsInput> = ( { children ,type,name, ...rest }) => {

  const inputRef = useRef(null);

  const { defaultValue , error , fieldName , registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  
  return (
    <Container { ...rest }>
      <small>{children}</small>
      <input type={type || "text"} name={name} ref={inputRef}/>
    </Container>
  )

}

export { Input }