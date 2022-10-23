import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import {LineChart} from "./LineChart";
import zoomLogo from "../img/zoom.png";
import {VerticalChart} from "./VerticalChart";
import {PieChart} from "./PieChart";
import ModalStat from "./ModalStat";
import styled from "styled-components";
import {Button} from "../styledComponents";

export function Statistics ({onClose, showModal}) {
    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
            onClose();
        }
    };

    const [show, setShow] = useState({});
    const [flights, setFlights] = useState(prepareFlightsStat(flightsData))
    const [drivers, setDrivers] = useState(prepareDriversStat(driversData))

    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, []);

    return ReactDOM.createPortal(
        <CSSTransition
            in={showModal}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className="modal" onClick={onClose}>
                <div className="modal-content modal-content-stat modal-content-stats" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h4 className="modal-title">Статистика</h4>
                    </div>
                    <div className="modal-body">
                        <StatisticStyled>
                            <Container>
                                <h3>Количество обслуженных пассажиров</h3>
                                <LineChart stat={flights}/>
                                <Zoom onClick={() => setShow({
                                    show: true,
                                    component: <LineChart stat={flights}/>,
                                    title: "Количество обслуженных пассажиров"
                                })}>
                                    <img src={zoomLogo} style={{width: 25, height: 25, filter: "invert(199)"}} alt="fireSpot"/>
                                </Zoom>
                            </Container>
                            <Container>
                                <h3>Количество выполненных заданий</h3>
                                <VerticalChart stat={drivers}/>
                                <Zoom onClick={() => setShow({
                                    show: true,
                                    component: <VerticalChart stat={drivers}/>,
                                    title: "Статистика перевезенных пассажиров"
                                })}>
                                    <img src={zoomLogo} style={{width: 25, height: 25, filter: "invert(199)"}} alt="fireSpot"/>
                                </Zoom>
                            </Container>
                            <Container>
                                <h3>Статистика свободных автобусов</h3>
                                <PieChart/>
                                <Zoom onClick={() => setShow({
                                    show: true,
                                    component: <PieChart/>,
                                    title: "Статистика свободных автобусов"
                                })}>
                                    <img src={zoomLogo} style={{width: 25, height: 25, filter: "invert(199)"}} alt="fireSpot"/>
                                </Zoom>
                            </Container>
                            <ModalStat title={show.title} onClose={() => setShow({show: false, component: null})} show={show.show}
                                       component={show.component}>
                            </ModalStat>
                        </StatisticStyled>
                    </div>
                    <div className="modal-footer">
                        <Button onClick={onClose} className="button">
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("root")
    );
};

function prepareFlightsStat(data) {
    let labels = [...new Set(data.map(flight => flight.gate))]
    let statData = labels
        .map(label => data
            .reduce((count, flight) =>
                flight.gate === label ? count + flight.passengers : count, 0))
    let stat = []
    for(let i = 0; i < labels.length; i++) {
        stat.push({label: labels[i], data: statData[i]})
    }
    return stat
}

function prepareDriversStat(data) {
    let labels = [...new Set(data.map(task => task.driver))]
    let statData = labels
        .map(label => data
            .reduce((count, driver) =>
                driver.driver === label ? count + 1 : count, 0))

    let stat = []
    for(let i = 0; i < labels.length; i++) {
        stat.push({label: labels[i], data: statData[i]})
    }
    return stat
}

const StatisticStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Container = styled.div`
  width: 45%;
  //height: 350px;
  padding: 15px;
  position: relative;
  margin-bottom: 60px;
`
const Zoom = styled.button`
  position: absolute;
  bottom: 0;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  border: none;
  outline: none;
  background: #2B2D33;
  display: flex;
  align-items: center;
  justify-content: center;
`

const driversData = [
    {
        timeFinish: "14.05.99 12:09",
        driver: "id_1",
        task: "id_2"
    },
    {
        timeFinish: "14.05.99 12:09",
        driver: "id_1",
        task: "id_7"
    },
    {
        timeFinish: "14.05.99 12:09",
        driver: "id_1",
        task: "id_8"
    },
    {
        timeFinish: "14.05.99 12:09",
        driver: "id_1",
        task: "id_9"
    },
    {
        timeFinish: "14.05.99 12:09",
        driver: "id_1",
        task: "id_0"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1",
        task: "id_20"
    },
    {
        timeFinish: "14.05.99 12:09",
        driver: "id_112",
        task: "id_2"
    },
    {
        timeFinish: "14.05.99 12:09",
        driver: "id_144",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_100",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_132",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1ыва",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1233ая",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1па",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1ла",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1лрп",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1длпа",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1ьжв",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1зхз",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_1",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_2",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_2",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_2",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_2",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_2",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_2",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_2",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_2",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_2",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_2",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_2",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },
    {
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_3",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_4",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_5",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_5",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },{
        timeFinish: "14.05.99 12:09",
        driver: "id_6",
        task: "id_2"
    },












]

const flightsData = [
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },
    {
        date: "12.09.2020 12:00",
        AD: "вылет",
        gate: "DGA_D",
        passengers: 444,
    },
    {
        date: "12.09.2020 14:00",
        AD: "прилет",
        gate: "DGA_I",
        passengers: 134,
    },
    {
        date: "12.09.2020 10:00",
        AD: "прилет",
        gate: "42",
        passengers: 10,
    },
    {
        date: "12.09.2020 14:30",
        AD: "прилет",
        gate: "46",
        passengers: 12,
    },
    {
        date: "12.09.2020 19:00",
        AD: "вылет",
        gate: "47",
        passengers: 199,
    },


]

const gates = [
    'DGA_D',
    'DGA_I',
    '2',
    '3',
    '5',
    '4D',
    '6',
    '7A',
    '7',
    '9A',
    '14',
    '23',
    '22',
    '21',
    '21A',
    '20',
    '19',
    '19A',
    '18',
    '15',
    '16',
    '24',
    '25',
    '26',
    '27A',
    '27',
    '28',
    '29A',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '34A',
    '35',
    '44',
    '45',
    '43A',
    '42A',
    '42',
    '36',
    '37',
    '48',
    '49',
    '48A',
    '47',
    '46',
    '41',
    '40',
    '39',
    '38',
    '37A',
    '50',
    '52',
    '51',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '60',
    '53A',
    '65A',
    '64B',
    '63B',
    '62B',
    '61',
    '67A',
    '68',
    '69',
    '70',
    '71',
    '72',
    '73',
    '74A',
    '74',
    '75',
    '77',
    '79',
    '80',
    '81',
    '83',
    '84',
    '93',
    '131',
    '184',
    '177'
]

