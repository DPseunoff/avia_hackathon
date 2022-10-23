import React from 'react';
import ScheduleCard from "./ScheduleCard";
import styled from 'styled-components';

const Schedule = ({schedule, height, variant, history}) => {
    return (
        <ScheduleStyled variant={variant} history={history}>
            <ScheduleHeaderContainer variant={variant} history={history}>
                <ScheduleHeader variant={variant} history={history}>{history ? "История" : "Расписание"} рейсов</ScheduleHeader>
            </ScheduleHeaderContainer>
            <ScheduleList height={height} variant={variant} history={history}>
                {schedule.map(flight => <ScheduleCard key={flight.id} flight={flight} history={history}/>)}
            </ScheduleList>
        </ScheduleStyled>
    );
};

export default Schedule;

const ScheduleStyled = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 460px;
  align-items: center;
  background: ${props => props.history ? "#2B2D33" : "#D9D9D9"};
  border-radius: ${props => props.variant ? "15px" : "none"};
`
const ScheduleHeaderContainer = styled.div`
  background: ${props => props.history ? "#2B2D33" : "#D9D9D9"};
  border-radius: ${props => props.variant ? "15px 0 0 0" : "none"};
  position: fixed;
  z-index: 100;
  width: inherit;
  padding: 20px;
`
const ScheduleHeader = styled.h1`
  color: ${props => props.history ? "white" : "black"};
  border-radius: ${props => props.variant ? "15px" : "none"};
`
const ScheduleList = styled.div`
  border-radius: ${props => props.variant ? "15px" : "none"};
  width: 100%;
  height: ${props => props.height ? props.height + "px" : "calc(100vh - 100px)"};
  overflow-y: scroll;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`




