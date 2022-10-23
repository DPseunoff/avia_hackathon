import React from 'react';
import styled from 'styled-components';


const ScheduleCard = ({flight, history}) => {
    return (
        <CardSchedule history={history}>
            <CardScheduleCol>
                <span>Самолет:</span>
                <span>Заявлено пассажиров:</span>
                <span>Время прилета:</span>
                <span>Авиакомпания:</span>
                <span>Точка посадки:</span>
            </CardScheduleCol>
            <CardScheduleCol>
                <span>{flight.flight}</span>
                <span>{flight.loading}</span>
                <span>{flight.load}</span>
                <span>{flight.arrivalTime}</span>
                <span>{flight.airline}</span>
                <span>{flight.landingPoint}</span>
            </CardScheduleCol>
            {/*<CardScheduleLink>*/}
            {/*    >>*/}
            {/*</CardScheduleLink>*/}
        </CardSchedule>
    );
};

export default ScheduleCard;

const CardSchedule = styled.div`
  width: 400px;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  gap: 50px;
  position: relative;
  background: ${props => props.history ? "#D9D9D9" : "#fff"};
  margin-bottom: 20px;
`

const CardScheduleCol = styled.div`
  display: flex;
  flex-direction: column;
`
const CardScheduleLink = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`



