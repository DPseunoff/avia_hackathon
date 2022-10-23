import React, {useState} from 'react';
import styled from "styled-components";
import {Row} from "../styledComponents";
import {ReactComponent as Arrow} from "../img/arrow.svg";
import {flights} from "../mockData";

const DetailTask = ({show, currentTask, onClose}) => {

    // const [timeStart, onChangeTimeStart] = useState(currentTask.TimeStart);
    // const [duration, onChangeDuration] = useState(currentTask.TimeToExecute);

    let flight = flights.filter(e => e.time === currentTask.TimeStart && e.AD === currentTask.Action)
    // console.log(flight)

    return (
        <DetailTaskStyled show={show}>
            <DetailTaskHeaderContainer>
                <DetailTaskHeader>
                    Изменить задание
                    <Button onClick={onClose} className="button">Close</Button>
                </DetailTaskHeader>

            </DetailTaskHeaderContainer>
            <DetailTaskList>
                <div className="modal-body">
                    <Col align={"left"}>
                        <h3>Задание №{currentTask.BusID + 1}</h3>
                        <h4><b>{currentTask.Action === "D" ? "Вылет" : "Посадка"}</b></h4>
                        <h4>Маршрут</h4>
                        <RouteDetail style={{marginBottom: "30px"}}>
                            <Col>
                                <Row>
                                    <Col
                                        style={{justifyContent: "space-between", height: "40px", marginTop: "7px"}}>
                                        <Circle/>
                                        {currentTask.From}
                                    </Col>
                                    <Col>
                                        <Arrow/>
                                        <span>{currentTask.TimeToExecute} минут</span>
                                    </Col>
                                    <Col
                                        style={{justifyContent: "space-between", height: "40px", marginTop: "7px"}}>
                                        <Circle/>
                                        {currentTask.To}
                                    </Col>
                                </Row>
                            </Col>
                        </RouteDetail>
                        <div style={{marginBottom: "30px"}}>
                            <h4 style={{width: 400}}>Водитель</h4>
                            {/*drivers.map(driver => driversData.filter(e => e.id - 1 == driver.name)[0].name + "\t" + driversData.filter(e => e.id - 1 == driver.name)[0].id*/}
                            {/*{currentTask.driver.map(driver => <div style={{marginBottom: "10px"}}>*/}
                            {/*    <h6 style={{width: 400}}>Идентификационный номер - ФИО</h6>*/}
                            {/*<Autocomplete*/}
                            {/*    suggestions={driversData}*/}
                            {/*    currentTask={currentTask}*/}
                            {/*/>*/}
                                <Label>#{currentTask.BusID}</Label>
                            {/*</div>)}*/}
                        </div>
                        <div style={{marginBottom: "30px"}}>
                            <h4 style={{width: 400}}>Время</h4>

                            <h6 style={{width: 400}}>Старт</h6>
                            {/*<Label>{currentTask.timeStart}</Label>*/}

                            <Label>{currentTask.TimeStart}</Label>
                            <h6 style={{width: 400}}>Продолжительность</h6>
                            {/*<Label>{currentTask.route.timeToExecute}</Label>*/}
                            <Label>{currentTask.TimeToExecute}</Label>
                        </div>
                        <div style={{marginBottom: "30px"}}>
                            <h4 style={{width: 400}}>Рейс</h4>
                            <Row>

                                <Col align={"left"}>
                                    <Label>Рейс</Label>
                                    <Label>Количество пассажиров</Label>
                                    <Label>Гейт</Label>
                                    <Label>Место парковки</Label>
                                </Col>
                                <Col align={"left"}>
                                    <Label>{flight[0].id}</Label>
                                    <Label>{flight[0].passenger_num}</Label>
                                    <Label>{flight[0].gate}</Label>
                                    <Label>{flight[0].parking}</Label>
                                </Col>
                            </Row>

                        </div>
                    </Col>
                    {/*<Col style={{alignItems: "flex-start"}}>*/}
                    {/*    <ColInput>*/}
                    {/*        <InputLabel>Водители автобусов</InputLabel>*/}
                    {/*        <Autocomplete*/}
                    {/*            suggestions={drivers.map(driver => driver.name + "\t" + driver.status)}*/}
                    {/*            currentTask={currentTask}*/}
                    {/*        />*/}
                    {/*    </ColInput>*/}
                    {/*    <ColInput>*/}
                    {/*        <InputLabel>Время начала выполнения задачи</InputLabel>*/}
                    {/*        <div style={{display: "flex"}}><InputTime maxlength="2"/><span*/}
                    {/*            style={{fontSize: "25px", marginRight: "10px"}}>:</span><InputTime maxlength="2"/>*/}
                    {/*        </div>*/}
                    {/*    </ColInput>*/}
                    {/*    <ColInput>*/}
                    {/*        <InputLabel>Продолжительность задачи</InputLabel>*/}
                    {/*        <div style={{display: "flex"}}><InputTime maxlength="2"/><span*/}
                    {/*            style={{fontSize: "25px", marginRight: "10px"}}>минут</span></div>*/}
                    {/*    </ColInput>*/}
                    {/*</Col>*/}
                </div>
                {/*{DetailTask.map(flight => <DetailTaskCard key={flight.id} flight={flight} history={history}/>)}*/}
            </DetailTaskList>
        </DetailTaskStyled>
    );
};

export default DetailTask;

const DetailTaskStyled = styled.div`
  border-right: 3px solid black;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  display: ${props => props.show ? "flex" : "none"};
  flex-direction: column;
  //width: 600px;
  align-items: center;
  background: ${props => props.history ? "#2B2D33" : "#D9D9D9"};
  border-radius: ${props => props.variant ? "15px" : "none"};
`
const DetailTaskHeaderContainer = styled.div`
  //border-right: 2px solid black;
  background: #D9D9D9;
  border-radius: ${props => props.variant ? "15px 0 0 0" : "none"};
  position: fixed;
  z-index: 100;
  width: inherit;
  padding: 20px;
  //width: available;
`
const DetailTaskHeader = styled.h1`
  display: flex;
  color: black;
  align-items: center;
  justify-content: space-around;
  border-radius: ${props => props.variant ? "15px" : "none"};
`
const DetailTaskList = styled.div`
  padding-top: 30px;
  border-radius: ${props => props.variant ? "15px" : "none"};
  width: 100%;
  height: ${props => props.height ? props.height + "px" : "calc(100vh - 100px)"};
  overflow-y: scroll;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const RouteDetail = styled.div`
  border-radius: 15px;
  width: 300px;
  background: #fff;
  color: black;
  padding: 20px;
  height: min-content;
  margin-bottom: 15px;
`
const Label = styled.span`
  background: white;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: black;
  margin-bottom: 5px;
  border-radius: 5px;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "center"};
`
const Circle = styled.div`
  height: 10px;
  width: 10px;
  content: "";
  border-radius: 100px;
  background: #000;
`
const Button = styled.button`
  font-size: 24px;
  background: white;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  height: 48px;
`

