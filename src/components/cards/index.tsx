import React from "react"
import { Component } from "./styles";

interface PropsCards {
  props: {
    amount:string,
    title:string,
    bgColor: {
      one:string,
      two?:string
    } 
  }
}

const Cards:React.FC<PropsCards> = ( { props }) => {


  return (
    <Component 
      start={props.bgColor.one} 
      end={props.bgColor.two}>
      <h2> { props.amount }</h2>
      <p> {props.title } </p>
    </Component>
  );
}

export default Cards;