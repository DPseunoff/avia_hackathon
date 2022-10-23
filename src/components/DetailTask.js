import React, {useState} from 'react';
import styled from "styled-components";
import {Row} from "../styledComponents";
import {ReactComponent as Arrow} from "../img/arrow.svg";
import Autocomplete from "./Autocomplete";

const DetailTask = ({show, currentTask, onClose}) => {

    const [timeStart, onChangeTimeStart] = useState(currentTask.timeStart);
    const [duration, onChangeDuration] = useState(currentTask.route.timeToExecute);

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
                        <h4>Маршрут</h4>
                        <RouteDetail style={{marginBottom: "30px"}}>
                            <Col>
                                <Row>
                                    <Col
                                        style={{justifyContent: "space-between", height: "40px", marginTop: "7px"}}>
                                        <Circle/>
                                        {currentTask.route.from}
                                    </Col>
                                    <Col>
                                        <Arrow/>
                                        <span>{currentTask.route.timeToExecute} минут</span>
                                    </Col>
                                    <Col
                                        style={{justifyContent: "space-between", height: "40px", marginTop: "7px"}}>
                                        <Circle/>
                                        {currentTask.route.to[currentTask.route.to.length - 1]}
                                    </Col>
                                </Row>
                            </Col>
                        </RouteDetail>
                        <div style={{marginBottom: "30px"}}>
                            <h4 style={{width: 400}}>Водители</h4>
                            {currentTask.driver.map(driver => <div style={{marginBottom: "10px"}}>
                                <h6 style={{width: 400}}>Идентификационный номер - ФИО</h6>
                                <Autocomplete
                                    suggestions={drivers.map(driver => driver.name + "\t" + driver.status)}
                                    currentTask={currentTask}
                                    currentValue={`#${driver.id} - ${driver.name}`}
                                />
                                {/*<Label>#{driver.id} - {driver.name}</Label>*/}
                            </div>)}
                        </div>
                        <div style={{marginBottom: "0"}}>
                            <h4 style={{width: 400}}>Время</h4>

                            <h6 style={{width: 400}}>Старт</h6>
                            {/*<Label>{currentTask.timeStart}</Label>*/}
                            <InputTime value={timeStart} onChange={e => onChangeTimeStart(e.target.value)}/>
                            <h6 style={{width: 400}}>Продолжительность</h6>
                            {/*<Label>{currentTask.route.timeToExecute}</Label>*/}
                            <InputTime value={duration} onChange={e => onChangeDuration(e.target.value)}/>
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
  width: 600px;
  align-items: center;
  background: ${props => props.history ? "#2B2D33" : "#D9D9D9"};
  border-radius: ${props => props.variant ? "15px" : "none"};
`
const DetailTaskHeaderContainer = styled.div`
  border-right: 2px solid black;
  background: #D9D9D9;
  border-radius: ${props => props.variant ? "15px 0 0 0" : "none"};
  position: fixed;
  z-index: 100;
  width: inherit;
  padding: 20px;
`
const DetailTaskHeader = styled.h1`
  display: flex;
  color: black;
  align-items: center;
  justify-content: space-around;
  border-radius: ${props => props.variant ? "15px" : "none"};
`
const DetailTaskList = styled.div`
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
const InputTime = styled.input`
  padding: 10px 15px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 400px;
  margin-right: 10px;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "center"};
`
const ColInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
`
const Circle = styled.div`
  height: 10px;
  width: 10px;
  content: "";
  border-radius: 100px;
  background: #000;
`
const InputLabel = styled.h4`
  color: white;
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
const drivers = [
    {
        id: "1",
        name: "Петров Александр",
    }, {
        id: "2",
        name: "Сидоров Петр",
    }, {
        id: "3",
        name: "Козлов Геннадий",
    }, {
        id: "4",
        name: "Саня",
    }, {
        id: "4",
        name: "Саня",
    }, {
        id: "5",
        name: "Коля",
    }, {
        id: "6",
        name: "Вася",
    }, {
        id: "7",
        name: "Гоча",
    }, {
        id: "8",
        name: "Федор",
    }, {
        id: "9",
        name: "Петя",
    }, {
        id: "10",
        name: "Женя",
    }, {
        id: "11",
        name: "Пуля",
    }, {
        id: "12",
        name: "Сергей",
    }, {
        id: "13",
        name: "Мария",
    }, {
        id: "14",
        name: "Саня",
    }, {
        id: "15",
        name: "Саша",
    }, {
        id: "16",
        name: "Лиза",
    }, {
        id: "17",
        name: "Гриша",
    }, {
        id: "18",
        name: "Дамир",
    }, {
        id: "19",
        name: "Дима",
    }, {
        id: "20",
        name: "Соня",
    }, {
        id: "21",
        name: "Настя",
    }, {
        id: "22",
        name: "Настя",
    }, {
        id: "23",
        name: "Оля",
    }, {
        id: "24",
        name: "Григорий",
    }, {
        id: "25",
        name: "Апостол",
    }, {
        id: "26",
        name: "Дуся",
    }, {
        id: "27",
        name: "Зоя",
    }, {
        id: "28",
        name: "Петр",
    }, {
        id: "29",
        name: "Саня",
    }, {
        id: "30",
        name: "Леня",
    }, {
        id: "31",
        name: "Дамир",
    }, {
        id: "32",
        name: "Дмитрий",
    }, {
        id: "34",
        name: "Дима",
    }, {
        id: "35",
        name: "Катя",
    }, {
        id: "36",
        name: "Екатерина",
    }, {
        id: "37",
        name: "Суфле",
    }, {
        id: "38",
        name: "Кот",
    }, {
        id: "39",
        name: "Ширик",
    }, {
        id: "40",
        name: "Апостол",
    },
]
