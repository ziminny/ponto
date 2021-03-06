import React, { useCallback } from "react"
import { Link } from "react-router-dom";
import { Container, Molde } from "./styles";

interface ClassNameContainer {
  className:string,
  jsonObject:{
      header:string,
      main?:Array<string>
      links:Array<string>
  }

}

const Options:React.FC<ClassNameContainer> = ({ className , jsonObject }) => {
  
 const hideSidbar = useCallback( () => {
  const container:HTMLElement | null = document.querySelector(".container-menu");
  const molde:HTMLElement | null = document.querySelector(".molde");
      if(container && molde) {
        container.style.animation = "hideContainerMenu 0.2s ease-in-out forwards";
        molde.style.display = "none"
      }
 },[])
  
  return (
    <>
      <Container className={className}>
          <header>
            { jsonObject.header }
          </header>
          <main>
            {
              jsonObject.main?.map( (el , index) => 
                (
                  <span key={index}><Link to={jsonObject.links[index]} onClick={ hideSidbar }>{el}</Link></span>
                ))
            }
          </main>
          <footer>

          </footer>
      </Container>
      <Molde className="molde"/>
    </>
  );

}

export default Options;