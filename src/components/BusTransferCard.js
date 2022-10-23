import React from 'react';
import styled from "styled-components";
import {ReactComponent as Arrow} from "../img/arrow.svg";

const BusTransferCard = ({task, setShow, setCurrentTask, history}) => {
    return (
        <CardBusTransfer
            onClick={() => {
                setCurrentTask(task)
                setShow(true)
            }}
            history={history}
        >
            <CardBusTransferCol>
                <span><b>Задача: {task.id}</b></span>
                <span style={{marginBottom: "20px"}}>{task.actionFront}</span>
                <Row>
                    <Col>
                        <Circle/>
                        {task.route.from}
                    </Col>
                    <Col style={{marginTop: "-5px"}}>
                        <Arrow />
                        <span style={{marginTop: "-5px"}}>{task.route.timeToExecute} минут</span>
                    </Col>
                    <Col>
                        <Circle/>
                        {task.route.to[task.route.to.length - 1]}
                    </Col>
                </Row>

            </CardBusTransferCol>
            <CardBusTransferCol right={true}>
                <span><b>{task.timeStart}</b></span>
                <div style={{marginTop: "30px"}}>
                    {task.driver.map(driver => <p style={{textAlign: "right"}} key={driver.id}>{driver.name}</p>)}
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