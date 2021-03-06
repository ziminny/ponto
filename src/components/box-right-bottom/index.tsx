import React from "react"
import { Container } from "./styles"
import { RiUserAddLine } from "react-icons/ri"
import { useSpring } from "react-spring"

interface PropsBox {
  click():void
}

const Box:React.FC<PropsBox> = ( {click} ) => {
 const spring = useSpring({
  
    opacity:1,
    right: "10px",
    from: {
      opacity:0,
      right:"-100px"
    }

 })
  return (
    <Container to="#" style={spring} onClick={ click }>
        <RiUserAddLine size="20"/>
    </Container>
  );

}

export default Box;