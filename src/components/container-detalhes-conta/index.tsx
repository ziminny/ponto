import { Form } from "@unform/web"
import React, { useCallback, useState } from "react"
import { api } from "../../services/api"
import { isEmpty } from "../../utils/objectIsEmpty"
import { Busca } from "./busca"
import { Horario } from "./horario"
import { Input } from "./input-busca"
import { ResultadoPesquisa } from "./resultado-pesquisa"
import {Container  , SectionBusca , SectionHorarioUsuario} from "./styles"

interface Request {
  codigo:string;
  dataInicial:string;
  dataFinal:string
}

interface User {
  nome:string;
  sobreNome:string;
}

export interface Horarios {
  user:User;
  horario:{
    entrada:string;
    pausa:string;
    volta:string;
    saida:string
  }
}

export interface Period {
  dataInicial:string;
  dataFinal:string;
}

const ContainerDetalhesConta:React.FC = () => {

  const [relatorio, setRelatorio ] = useState({})
  const [ period , setPeriod ] = useState<Period>({} as Period)
  const [horarios, setHorarios ] = useState<Horarios>({} as Horarios)

  const handleBusca = useCallback( (data:Request) => {
  
      api.get(`ponto/${data.codigo}/filter?dataInicial=${data.dataInicial}&dataFinal=${data.dataFinal}`).then( res => {
        console.log(res.data);
        
        setRelatorio(res.data)
        setPeriod({
          dataInicial:data.dataInicial,
          dataFinal: data.dataFinal
        })
        
      })

      api.get(`horario/${data.codigo}`).then( res => {

        setHorarios(res.data);
      })
    
  },[setRelatorio,setHorarios,setPeriod])

  return (
   
    
      <Container>
        
        <div className="header">
            <SectionBusca>  
              <Form onSubmit={ handleBusca }>
                  
                    <Input name="codigo">
                        usuário 
                      </Input>               
                      <Input type="date" name="dataInicial">
                        data inicial
                      </Input>
                      <Input type="date" name="dataFinal">
                        data final
                      </Input>

                      <Busca>
                        Buscar
                      </Busca>
                 
              </Form>
              
            </SectionBusca>
           
              {
                !isEmpty(horarios) && (
                  <SectionHorarioUsuario>
                     <Horario horarios={horarios}></Horario> 
                  </SectionHorarioUsuario>
                )
              }
        </div>

        <ResultadoPesquisa period={period} relatorio={relatorio} horarios={horarios}/>
      </Container>
    
  )

}

export { ContainerDetalhesConta }