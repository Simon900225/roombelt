import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/macro";
import { deviceNameSelector, currentMeetingSelector, nextMeetingSelector } from "../store/selectors";

import { Time, PageLoaded } from "../../../theme";
import NextMeeting from "./NextMeeting";
import CurrentMeeting from "./CurrentMeeting";
import RoomAvailable from "./RoomAvailable";
import FullScreenToggle from "./FullScreenToggle";
import ActionsBar from "./actions-bar";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  background: #F3F3F3;
  font-family: "Roboto", sans-serif;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-size: 6px;

  @media (min-width: 300px) {
    font-size: 10px;
  }

  @media (min-width: 500px) {
    font-size: 16px;
  }

  @media (min-width: 700px) {
    font-size: 20px;
  }

  @media (min-width: 900px) {
    font-size: 24px;
  }

  @media (min-width: 1100px) {
    font-size: 30px;
  }

  @media (min-width: 1300px) {
    font-size: 35px;
  }

  @media (min-width: 1500px) {
    font-size: 40px;
  }

  @media (min-width: 1700px) {
    font-size: 46px;
  }
`;

const Header = styled.header`
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  background: #696969;
  color:white;
  border-bottom: 0.1rem solid #ccc;
`;

const CalendarName = styled.span`
  font-size: 1.5em;
  padding: 0.3em;
`;

const CurrentTime = styled.span`
  font-size: 1.5em;
  padding: 0.3em;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (orientation:portrait){
    flex: 1 auto 1;
    align-items:center;
    padding: 1.5em;
  }

  @media screen and (orientation:landscape){
    flex: 1 1 auto;
    padding: .5em;
  }
`;

const Footer = styled.div`
  padding: 1.5em;
  flex: 0 0 auto;
`;

const ActionsBarWrapper = styled.div`
  @media screen and (orientation:landscape){
    margin: 1rem 0;
    height: 3rem;
  }
    
  display:flex;
`;

const CalendarView = props => (
  <Wrapper style={props.style}>
    <PageLoaded/>
    <Header>
      <CalendarName available={!props.currentMeeting}>{props.calendarName}</CalendarName>
      <CurrentTime>
        <Time timestamp={props.currentTimestamp} blinking/>
      </CurrentTime>
    </Header>
    <MainContent>
      {props.currentMeeting ? <CurrentMeeting/> : <RoomAvailable/>}
      <ActionsBarWrapper><ActionsBar/></ActionsBarWrapper>
    </MainContent>
    <Footer>{props.nextMeeting && <NextMeeting/>}</Footer>
    <FullScreenToggle/>
  </Wrapper>
);

const mapStateToProps = state => ({
  currentTimestamp: state.timestamp,
  calendarName: deviceNameSelector(state),
  currentMeeting: currentMeetingSelector(state),
  nextMeeting: nextMeetingSelector(state)
});

export default connect(mapStateToProps)(CalendarView);
