import React from "react";
import Breadcrumb from "../../components/breadcrumb";
import { ContainerDetalhesConta } from "../../components/container-detalhes-conta";
import Form from "../../components/form-usuarios";
import { Container } from "./styles";

const HorarioEDetalhes:React.FC = () => {
  const modal = false;
  return (
    <>
        {/* <Modal/> */}
        <Container>
          <h2>Horários e detalhes</h2>

          <Breadcrumb
            options={ [ 
              {name:'Home' , path:'dashboard'},
              {name:'Horários e detalhes' , path:'horarios-e-detalhes'}
            ]}
          />
          
         <ContainerDetalhesConta/>

        
        </Container>
    </>
  )

}

export default HorarioEDetalhes;