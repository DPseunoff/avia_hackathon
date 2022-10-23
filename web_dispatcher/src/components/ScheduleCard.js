import React from 'react';
import styled from 'styled-components';


const ScheduleCard = ({flight, history}) => {
    return (
        <CardSchedule history={history}>
            <CardScheduleCol>
                <span>Номер рейса:</span>
                <span>Заявлено пассажиров:</span>
                <span>Время прилета:</span>
                <span>Точка посадки:</span>
                <span>Гейт:</span>
            </CardScheduleCol>
            <CardScheduleCol>
                <span>{flight.id}</span>
                <span>{flight.loading}</span>
                <span>{flight.passenger_num}</span>
                <span>{flight.time.slice(0, 19)}</span>
                {/*<span>{flight.airline}</span>*/}
                <span>{flight.parking}</span>
                <span>{flight.gate}</span>
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
  gap: 20px;
  position: relative;
  background: ${props => props.history ? "#D9D9D9" : "#fff"};
  margin-bottom: 20px;
`

const CardScheduleCol = styled.div`
  display: flex;
  flex-direction: column;
  //font-size: 16px;
`


