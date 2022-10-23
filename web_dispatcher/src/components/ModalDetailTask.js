import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {CSSTransition} from "react-transition-group";
import styled from "styled-components";
import {ReactComponent as Arrow} from "../img/arrow.svg";
import {Button, Row} from "../styledComponents";
import Autocomplete from "./Autocomplete";

const ModalDetailTask = ({show, onClose, currentTask, tasks, history}) => {

    const [timeStart, onChangeTimeStart] = useState(currentTask.timeStart);
    const [duration, onChangeDuration] = useState(currentTask.timeStart);

    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
            onClose();
        }
    };

    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, []);


    return ReactDOM.createPortal(
        <CSSTransition
            in={show}
            unmountOnExit
            timeout={{enter: 0, exit: 300}}
        >
            <div className="modal" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h4 className="modal-title">Задача: {currentTask.id}</h4>
                    </div>
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
                                <h4>Водители</h4>
                                {currentTask.driver.map(driver => <div style={{marginBottom: "10px"}}>
                                    <h6>Идентификационный номер - ФИО</h6>
                                    <Autocomplete
                                        suggestions={drivers.map(driver => driver.name + "\t" + driver.status)}
                                        currentTask={currentTask}
                                        currentValue={`#${driver.id} - ${driver.name}`}
                                    />
                                    {/*<Label>#{driver.id} - {driver.name}</Label>*/}
                                </div>)}
                            </div>
                            <div style={{marginBottom: "0"}}>
                                <h4>Время</h4>

                                <h6>Старт</h6>
                                <Label>{currentTask.timeStart}</Label>
                                <h6>Продолжительность</h6>
                                <Label>{currentTask.route.timeToExecute}</Label>
                            </div>
                        </Col>
                        <Col style={{alignItems: "flex-start"}}>
                            <ColInput>
                                <InputLabel>Водители автобусов</InputLabel>
                                <Autocomplete
                                    suggestions={drivers.map(driver => driver.name + "\t" + driver.status)}
                                    currentTask={currentTask}
                                />
                            </ColInput>
                            <ColInput>
                                <InputLabel>Время начала выполнения задачи</InputLabel>
                                <div style={{display: "flex"}}><InputTime maxlength="2"/><span
                                    style={{fontSize: "25px", marginRight: "10px"}}>:</span><InputTime maxlength="2"/>
                                </div>
                            </ColInput>
                            <ColInput>
                                <InputLabel>Продолжительность задачи</InputLabel>
                                <div style={{display: "flex"}}><InputTime maxlength="2"/><span
                                    style={{fontSize: "25px", marginRight: "10px"}}>минут</span></div>
                            </ColInput>
                        </Col>
                    </div>
                    <div className="modal-footer">
                        <Button onClick={onClose} className="button">Close</Button>
                    </div>
                </div>
            </div>
        </CSSTransition>
        ,
        document.getElementById("root")
    );
};

export default ModalDetailTask;

const RouteDetail = styled.div`
  border-radius: 15px;
  width: 400px;
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
  width: 50px;
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
