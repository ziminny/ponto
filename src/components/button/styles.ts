
import styled, { css } from "styled-components";
import { shade } from "polished"

export const Container = styled.button`

  width: 60px;
  height: 60px;
  background-color:#1A33D5;
  border:0;
  border-radius: 50%;
  box-shadow: -2px 5px 7px rgba(0,0,0,0.2) , -3px 5px 7px rgba(0,0,0,0.1);
  transition: all 0.2s;
  &:hover {
    box-shadow: 0px 7px 8px rgba(0,0,0,0.3) , 0px 7px 9px rgba(0,0,0,0.2);
    background-color: ${shade("0.20", "#1A33D5")};
  }

  & > svg {
    color:#fff;
  }

`