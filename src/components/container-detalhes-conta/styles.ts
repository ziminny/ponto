import styled from "styled-components"


const Container = styled.div`
  display:flex;
  flex-direction:column;
   div.header {
     display:flex;
   }
`


const SectionBusca = styled.div`
  form {
      width: 630px;
      display:flex;
      align-items:flex-end;
      border-top:3px solid #6C75BA;
      border-bottom:1px solid #6C75BA;
      border-left:1px solid #6C75BA;
      border-right:1px solid #6C75BA;
      border-radius:4px;
      padding: 15px 20px;
      margin-right: 20px;
  }

`

const SectionHorarioUsuario = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  justify-content:space-around;
  border-top:3px solid #6C75BA;
  border-bottom:1px solid #6C75BA;
  border-left:1px solid #6C75BA;
  border-right:1px solid #6C75BA;
  border-radius:4px;
  padding: 15px 20px;
`

export { Container  , SectionBusca , SectionHorarioUsuario}