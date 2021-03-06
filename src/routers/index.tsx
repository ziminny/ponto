import React , { useContext }from "react";
import {  Switch } from "react-router-dom";
import Route from "./Router";
import Login from "./login";
import Dashboard from "./dashboard";
import SideBar from "../components/sidebar";
import LogOut from "./logout";
import { AppContext } from "../context/auth";
import ListaDeUsuarios from "./listadeusuarios";
import DetalhesDaConta from "./detalhesdaconta";
import HorarioEDetalhes from "./horarios-e-detalhes";

const Main:React.FC = () => {
  const { datas } = useContext(AppContext);
  
  
  return (
  <>
    { !!datas.user && <SideBar/> }
   <Switch>
     <Route exact path="/" component={Login}/>
     <Route exact path="/dashboard" component={Dashboard} isPrivate/>
     <Route exact path="/logout" component={LogOut} isPrivate/>
     <Route exact path="/lista-de-usuarios" component={ListaDeUsuarios} isPrivate/>
     <Route exact path="/detalhes-da-conta" component={DetalhesDaConta} isPrivate/>
     <Route exact path="/horarios-e-detalhes" component={HorarioEDetalhes} isPrivate/>
   </Switch>
  </>
  )
}

export default Main;