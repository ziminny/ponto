import { Link } from 'react-router-dom';
import { shade } from 'polished';
import styled from 'styled-components';
import { animated } from 'react-spring';



export const Container = styled(animated(Link))`

  height: 60px;
  width: 60px;
  background-color:#5cb85c;
  position:fixed;
  right:10px;
  bottom: 10px;
  border-radius: 50%;
  display:flex;
  justify-content:center;
  align-items:center;
  border: 2px solid #fff;

  svg {
    color:#fff;
  }
`