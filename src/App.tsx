import React  from 'react'
import { render } from 'react-dom'
import { Globals } from './styles/GlobalStyle'
import {  HashRouter } from "react-router-dom";
import Main from './routers';
import Context from './context';


const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {

  
  return (
    <>
      <HashRouter>
          <Context>
              <Main/>  
          </Context>
      </HashRouter>
      <Globals />     
    </>
  )
}

render(<App />, mainElement)
