import React, {useState} from 'react';
import styled from 'styled-components';
import BusTransferCard from "./BusTransferCard";
import ModalDetailTask from "./ModalDetailTask";
import {Statistics} from "./Statistics";
import {DESKTOP_ROUTE, HISTORY_ROUTE} from "../utils/consts";
import {Link} from "react-router-dom";
import DetailTask from "./DetailTask";

function getAllAttributes(obj, search) {
    for (let key in obj) {
        if (typeof obj[key] === "object") {
            if (getAllAttributes(obj[key], search)) return true
        } else if (obj[key].indexOf(search) > -1) return true
    }
}

function search(arr, searchText) {
    return arr.filter(el => {
        if (searchText.length === 1) return true
        for (let key in el) {
            if (typeof el[key] === "object") {
                if (getAllAttributes(el[key], searchText)) return true
            }
            if (typeof el[key] === "string" && el[key].indexOf(searchText) !== -1) return true
        }
    })
}

const BusTransfer = ({tasksData, history}) => {
    const [searchText, setSearchText] = useState("")
    const [tasks, setTasks] = useState(tasksData)
    const [show, setShow] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [currentTask, setCurrentTask] = useState(tasks[0])

    return (
        <BusTransferStyled history={history}>
            <Header history={history}>
                <BusTransferHeader history={history}>{history ? "История" : "Расписание"} автобусов</BusTransferHeader>
                <StatButton onClick={() => setShowStats(true)}>
                    Посмотреть статистику
                </StatButton>
                <Link to={history ? DESKTOP_ROUTE : HISTORY_ROUTE} style={{textDecoration: "none"}}><HistoryButton history={history} onClick={() => setShowHistory(true)}>
                    {history ? "Вернуться" : "История"}
                </HistoryButton></Link>
                <Input history={history} onChange={e => setSearchText(e.target.value)} placeholder={"Поиск задания"} type="text"/>
            </Header>
            <TasksContainer>
                {search(tasks, searchText).map(task =>
                    <BusTransferCard setCurrentTask={setCurrentTask} setShow={setShow} key={task.id} task={task} history={history}/>)}
            </TasksContainer>
            {/*<ModalDetailTask currentTask={currentTask} history={history} onClose={() => setShow(false)} show={show} tasks={tasks}/>*/}
            <DetailTask currentTask={currentTask} onClose={() => setShow(false)} show={show} tasks={tasks}/>
            <Statistics onClose={() => setShowStats(false)} showModal={showStats}/>
        </BusTransferStyled>
    );
};

export default BusTransfer;

const Header = styled.div`
  position: fixed;
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${props => props.history ? "white" : "#2B2D33"};
  z-index: 10;
`
const TasksContainer = styled.div`
  width: inherit;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 15px;
  margin-top: 100px;
  overflow-y: scroll;
  max-height: calc(100vh - 100px);
  align-items: flex-start;
  padding-bottom: 20px;
`
const BusTransferStyled = styled.div`
  display: flex;
  justify-content: space-around;
  width: calc(100vw - 460px);
  background: ${props => props.history ? "white" : "#2B2D33"};
  align-items: flex-start;
`
const BusTransferHeader = styled.h1`
  margin-bottom: 30px;
  padding-top: 20px;
  color: ${props => props.history ? "black" : "white"};
`
const Input = styled.input`
  width: 300px;
  padding: 10px 15px;
  border-radius: 5px;
  outline: none;
  border: none;
  color: ${props => props.history ? "white" : "black"};
  background: ${props => props.history ? "black" : "white"};
`
const StatButton = styled.div`
  cursor: pointer;
  border-radius: 5px;
  border: none;
  outline: none;
  background: #63e751;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 30px;
`
const HistoryButton = styled(StatButton)`
  background: ${props => props.history ? "black" : "white"};
  color: ${props => props.history ? "white" : "black"};
`