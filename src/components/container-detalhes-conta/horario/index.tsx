import React from "react";
import { Horarios } from "..";
import {Label} from "./styles";
import { BiDoorOpen , BiCoffee } from "react-icons/bi"
import { FaCoffee } from "react-icons/fa"
import { RiDoorClosedLine } from "react-icons/ri"

interface PropsHorario {
  horarios:Horarios
}

const Horario:React.FC<PropsHorario> = ({ horarios }) => {


  return (
    <>

            <Label>
                { horarios.user.nome }
              </Label>
              <Label>
                <p><BiDoorOpen/> entrada</p>
                <small>{ horarios.horario.entrada }</small>
              </Label>

              <Label>
                <p><BiCoffee/> pausa</p>
                <small>{ horarios.horario.pausa }</small>
              </Label>

              <Label>
                <p> <FaCoffee/> retorno</p>
                <small>{ horarios.horario.volta }</small>
              </Label>

              <Label>
                <p> <RiDoorClosedLine/> saida</p>
                <small>{ horarios.horario.saida }</small>
             </Label> 
          </>
        )

  
}

export {Horario};