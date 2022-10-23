import React from 'react';
import Schedule from "../components/Schedule";
import BusTransfer from "../components/BusTransfer";
import styled from "styled-components";
import {serverData, flights} from "../mockData";

const Desktop = ({history}) => {

    return (
        <DesktopStyled>
            <Schedule schedule={flights} history={history}/>
            <BusTransfer tasksData={serverData} history={history}/>
        </DesktopStyled>
    );
};

export default Desktop;

const DesktopStyled = styled.div`
  display: flex;
  position: relative;
`
