import React from 'react';
import Schedule from "../components/Schedule";
import BusTransfer from "../components/BusTransfer";
import styled from "styled-components";
import {schedule, tasksData} from "../mockData";

const Desktop = ({history}) => {

    return (
        <DesktopStyled>
            <Schedule schedule={schedule} history={history}/>
            <BusTransfer tasksData={tasksData} history={history}/>
        </DesktopStyled>
    );
};

export default Desktop;

const DesktopStyled = styled.div`
  display: flex;
  position: relative;
`
