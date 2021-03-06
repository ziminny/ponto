import React from "react";
import Breadcrumb from "../../components/breadcrumb";
import Form from "../../components/form-usuarios";
import { Container } from "./styles";

const ListaDeUsuarios:React.FC = () => {
  const modal = false;
  return (
    <>
        {/* <Modal/> */}
        <Container>
          <h2>Lista de usuários</h2>

          <Breadcrumb
            options={ [ 
              {name:'Home' , path:'dashboard'},
              {name:'Lista de usuários' , path:'lista-de-usuarios'}
            ]}
          />
          
          <Form/>

        
        </Container>
    </>
  )

}

export default ListaDeUsuarios;