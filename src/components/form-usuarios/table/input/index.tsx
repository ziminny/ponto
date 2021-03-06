import React, { InputHTMLAttributes, useEffect, useRef } from "react"
import {Container, MessageError} from "./styles"
import {FiUser} from "react-icons/fi"
import { useField } from "@unform/core"
import { IconType } from "react-icons"

interface PropsInput extends InputHTMLAttributes<HTMLInputElement> {
  nome:string;
  placeholder?:string;
  icon?:IconType;
  selectType?:boolean
  def?:string
}

const Input:React.FC<PropsInput> = ({ nome , icon:Icon  , selectType , def , ...rest }) => {

  const inputRef = useRef(null)
  
  const { error, fieldName, defaultValue, registerField } = useField(nome);


  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: ref => {
        return ref.value;
      },
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <>
    <Container>
      {
        selectType ?  (
        <>
          {Icon && <Icon/> }
          <select 
                name={nome} 
                ref={inputRef}
                defaultValue={def || "924c167a-07d6-4dbe-9dde-8a62cf5bf082"}
                
          >
             
              <option value="43e1f634-9fb8-4832-b4ba-d2ab4eab4065">Administrador</option>
              <option value="924c167a-07d6-4dbe-9dde-8a62cf5bf082">Colaborador</option>

            </select>
        </>
        ) : (
          <>
       {Icon && <Icon/> }
      <input 
      defaultValue={defaultValue}
      type="text"
      name={nome} 
      ref={inputRef}
      { ...rest }/>
          </>
      )
      }




      </Container>
      {
        error && <MessageError className="message-error">{error}</MessageError>
      }
    </>
  )
}

export default Input;