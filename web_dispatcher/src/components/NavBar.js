import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Button, Nav, Navbar} from "react-bootstrap";
import {DESKTOP_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import Container from "react-bootstrap/Container"

const NavBar = () => {
    const user = {
        isAuth: true,
        setIsAuth: () => console.log("говно")
    }

    const navigate = useNavigate()
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link style={{color: 'white'}} to={DESKTOP_ROUTE}>ЫЫЫЫЫ</Link>
                {user.isAuth ?
                    <Nav className="me-lg-auto" style={{color: 'white'}}>
                        <Button variant={'outline-light'} onClick={() => navigate()}>Админка</Button>
                        <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={'outline-light'} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
}

export default NavBar;