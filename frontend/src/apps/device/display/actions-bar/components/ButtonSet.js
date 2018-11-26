import styled from "styled-components/macro";
import { Button } from "theme/index";

export default styled.div`
  @media screen and (orientation:landscape){
    display: inline-block;  
  }

  @media screen and (orientation:portrait){
    display: flex;
    width: auto;
    flex-wrap: wrap;
  }
  
  & ${Button} {
    border-radius: 0;
    @media screen and (orientation:portrait){
      min-width:50%;
    }
  }

  & ${Button} + ${Button} {
    margin-left: 0;
  }
`;
