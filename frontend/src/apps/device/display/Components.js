import styled from "styled-components/macro";

export const MeetingHeader = styled.div`
  margin-bottom: 0.5em;
  font-size: 1.5em;
`;

export const MeetingTitle = styled.div`
  @media screen and (orientation:portrait){  
    font-size: 2.5em;
  }
  @media screen and (orientation:landscape){  
    font-size: 1.2em;
  }  
`;

export const MeetingSubtitle = styled.div`
  @media screen and (orientation:portrait){  
    font-size: 2em;
  }
`;
