import React, { useRef , useContext } from "react";
import { Container , Box , BoxForm } from "./styles";
import { FiArrowRight, FiMail , FiLock } from "react-icons/fi"
import Input from "../../components/input";
import Button from "../../components/button";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { AppContext } from "../../context/auth";
import { FormHandles } from "@unform/core";
interface Obj {
  [key:string]:string
}

interface Response {
  email:string;
  senha:string;
}

const Dashboard:React.FC = () => {
  
  const formRef = useRef<FormHandles>(null);

  const { singIn , datas , logOut } = useContext(AppContext);

  console.log(datas.user);
  
  

  async function handleLogin(data:Response) {


    
    const schema = Yup.object().shape({
      email:Yup.string(),
      senha:Yup.string().required("O campo senha é obrigatório").min(4 , "A senha deve conter ao menos 4 carac.")
    });


    
      try {


        formRef.current?.setErrors({});
        await schema.validate(data, {
          abortEarly:false
        });
     
        await singIn(data)
        
        



      } catch (error) {
         const validate:Obj = {}
         if(error instanceof Yup.ValidationError) {
           error.inner.forEach(e => {
             if(e.path)
                validate[e.path] = e.message              
           });
         
           
           formRef.current?.setErrors(validate)
          
         } 
        
     
       
          
      }

      
  }
  return (
    <Container>
        <Box>
          <h1> Seja bem vindo </h1>
          <p>  Viva a vida intensamente e seja sua própria inspiração</p>
        </Box>
      
        <BoxForm>
           
            <Form onSubmit={ handleLogin } ref={formRef}>
                <h5>Por favor, logue-se em sua conta para poder bater o ponto</h5>
                <Input icon={FiMail} name="email" placeholder="CÓDIGO"/>
                <Input icon={FiLock} type="password" name="senha" placeholder="SENHA"/>
                <div className="btn">
                  <Button icon={FiArrowRight} type="submit"/> 
 
                </div>
               
            </Form>

        </BoxForm>
      
    </Container>
  )

}

export default Dashboard