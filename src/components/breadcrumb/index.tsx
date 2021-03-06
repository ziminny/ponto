import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles";

interface Objects {
  path:string;
  name:string
}

interface PropsBreadcrumb {
    options:Array<Objects>,

}

const Breadcrumb:React.FC<PropsBreadcrumb> = ( { options }) => {

  return (
    <Container>
        
  {  options.map( (option , index) => (
        <Link to={ option.path } key={option.name} >{ option.name } { options.length -1 != index && '/' } </Link>
    ))}
    </Container>
  )
}

export default Breadcrumb;