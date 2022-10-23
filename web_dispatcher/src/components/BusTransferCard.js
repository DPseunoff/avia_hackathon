import React from 'react';
import styled from "styled-components";
import {ReactComponent as Arrow} from "../img/arrow.svg";

const BusTransferCard = ({task, setShow, setCurrentTask, history, identificator}) => {
    return (
        <CardBusTransfer
            onClick={() => {
                setCurrentTask(task)
                setShow(true)
            }}
            history={history}
        >
            <CardBusTransferCol>
                <span><b>Задача: {identificator}</b></span>
                <span style={{marginBottom: "20px"}}>{task.Action === "D" ? "Вылет" : "Посадка"}</span>
                <Row>
                    <Col style={{width: 50}}>
                        <Circle/>
                        {task.From}
                    </Col>
                    <Col style={{marginTop: "-5px"}}>
                        <Arrow />
                        <span style={{marginTop: "-5px"}}>{task.TimeToExecute} минут</span>
                    </Col>
                    <Col style={{width: 50}}>
                        <Circle/>
                        {task.To}
                    </Col>
                </Row>

            </CardBusTransferCol>
            <CardBusTransferCol right={true}>
                <span><b>{task.TimeStart.slice(0,19)}</b></span>
                <div style={{marginTop: "30px"}}>
                    {/*{drivers.filter(e => task.BusID == e.id)[0].name}*/}
                    {/*{tasks.drivers.map(e => e.id).filter(e => e.id === task.DriverName)}*/}
                    {/*{drivers.filter(e => e.id - 1 == task.DriverName)[0].name}*/}
                    <span>Driver_id: {task.BusID}</span>
                </div>
            </CardBusTransferCol>
        </CardBusTransfer>
    );
};

export default BusTransferCard;

const CardBusTransfer = styled.div`
  cursor: pointer;
  width: 370px;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: relative;
  background: ${props => props.history ? "#D9D9D9" : "white"};
  max-height: 300px;
  color: black;
`
const CardBusTransferCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.right ? "flex-end" : "unset"};
  text-align: ${props => props.right ? "right" : "unset"};
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Row = styled.div`
  display: flex;
  align-items: center;
`
const CardBusTransferLink = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
`
const Circle = styled.div`
  height: 10px;
  width: 10px;
  content: "";
  border-radius: 100px;
  background: black;
`