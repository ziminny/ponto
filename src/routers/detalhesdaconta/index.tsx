import React  from "react";
import { authContext } from "../../context/auth"
import DetalhesDaContaAdmin from "./admin";
import DetalhesDaContaUser from "./user";

const DetalhesDaConta:React.FC = () => {

  const { datas } = authContext()
  const typeUser = datas.user.regraUser.regra.nome

  return (
    typeUser === "admin" ? 
    <DetalhesDaContaUser/> : <DetalhesDaContaAdmin/>
  );
}

export default DetalhesDaConta;