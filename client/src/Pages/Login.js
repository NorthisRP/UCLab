import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Container, Form } from "react-bootstrap";
import { AuthContext } from "../context/Auth.Context";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export default function Login() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div>
      <Container className="d-flex justify-content-center my-5" style={{}}>
        <Card className="col-5 p-0 text-center">
          <Card.Header as="h5">Админ панель</Card.Header>
          <Card.Body>
            <Card.Title>
              Чтобы управлять контентом сайта, введите email и пароль
            </Card.Title>
            <Form.Group controlId="formGroupLogin" className="px-5">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                placeholder="Введите Email"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword" className="px-5">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                name="password"
                placeholder="Введите пароль"
                onChange={changeHandler}
              />
            </Form.Group>
            <Button
              className="m-2"
              variant="primary"
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
