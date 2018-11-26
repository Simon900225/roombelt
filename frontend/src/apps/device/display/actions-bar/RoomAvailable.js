import React from "react";
import i18next from "i18next";
import styled, { css } from "styled-components/macro";
import { connect } from "react-redux";
import { Button, LoaderButton } from "theme";
import { prettyFormatMinutes } from "services/formatting";
import { currentActionSourceSelector, minutesAvailableTillNextMeetingSelector } from "apps/device/store/selectors";
import { createMeeting, runMeetingAction } from "apps/device/store/meeting-actions";

import ButtonSet from "./components/ButtonSet";

const RoomAvailable = props => {
  const CreateButton = ({ value, name }) => (
    <LoaderButton
      white
      disabled={props.currentActionSource !== null}
      isLoading={props.currentActionSource === name}
      onClick={() => props.createMeeting(value, name)}
      children={prettyFormatMinutes(value)}
    />
  );

  const StartButton = styled(Button)`
    border-radius: 0em; 
    color:white;
    background:#F7522E;
    @media screen and (orientation:portrait){
      font-size: 2em;
      width: 100%;
    }
    @media screen and (orientation:landscape){
      font-size: 1em;
    }
  `;

  return (
    <div>  
      {props.minutesToNextMeeting > 0 && <StartButton style={{opacity:"1"}} disabled success children={i18next.t("start") }/>}
      <ButtonSet>
        {props.minutesToNextMeeting > 20 && <CreateButton value={15} name="create-15"/>}
        {props.minutesToNextMeeting > 40 && <CreateButton value={30} name="create-30"/>}
        {props.minutesToNextMeeting > 70 && <CreateButton value={60} name="create-60"/>}
        {props.minutesToNextMeeting > 130 && <CreateButton value={120} name="create-120"/>}
        {props.minutesToNextMeeting <= 130 && <CreateButton value={props.minutesToNextMeeting} name="create-custom"/>}
      </ButtonSet>
    </div>
  );
};

const mapStateToProps = state => ({
  minutesToNextMeeting: minutesAvailableTillNextMeetingSelector(state),
  currentActionSource: currentActionSourceSelector(state)
});

const mapDispatchToProps = dispatch => ({
  createMeeting: (minutes, source) => dispatch(runMeetingAction(createMeeting(minutes), source))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomAvailable);