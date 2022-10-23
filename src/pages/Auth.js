import React from 'react';
import {Container, Card, Form, Button, Row} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

export default function Auth () {

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="me-lg-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите Ваш email"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите Ваш пароль"
                    />
                    <Row className={"d-flex justify-content-between"}>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйтесь</Link>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите</Link>
                            </div>
                        }
                        <Button className="mt-3" variant={"outline-success"}>
                            {isLogin ? "Войти" : "Зарегистрироваться"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};