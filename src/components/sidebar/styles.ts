import styled from "styled-components";

export const Article = styled.article`

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    height: 100vh;
    width:60px;
    background-color:#000;
    position:fixed;
    z-index:10;
    left:0;
    top:0;
    padding-top:10px;
    @media(max-width:772px) {
      display:none;
    }


`

export const Icon = styled.div`

`
export const Search = styled.div`
  margin-bottom: 15px;
`
