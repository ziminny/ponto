import styled from "styled-components";

export const Container = styled.main`

  padding:40px;

`

export const Header = styled.header`

    > div {
      display: flex;
      align-items:flex-end;
       svg {
         color:#0044E9;
         margin-right:10px;
       }
    }

`

export const User = styled.header`

      display: flex;
      align-items:flex-end;
      margin-bottom:20px;
       svg {
         color:#0044E9;
         margin-right:10px;
       }
       span {
         font-weight:600;
       }
    

`

export const Cards = styled.div`

    display:flex; 
    flex-wrap:wrap; 
    

`

export const CardDados = styled.div`

    background-color:#fff;
    padding: 30px 50px 10px 50px;
    margin-top: 80px;
    margin-right: 10px;
    border-radius: 5px;

    h4 {
      margin-bottom: 5px;
    }
    span {
      margin-bottom: 20px;
      display:block;
    }

`

export const CardHours = styled.div`

    background-color:#fff;
    padding: 20px 40px;
    margin-top: 80px;
    border-radius: 5px;
    flex:1;
    display:flex;
    flex-direction: column;
    flex-wrap:wrap;


    h2 {

    }
    > div {
      flex:1;
      display:flex;
      flex-wrap:wrap;
      justify-content:space-between;
      align-items:center;
    }
`    