import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Container, Form } from "react-bootstrap";
import { AuthContext } from "../context/Auth.Context";
import { useMessage } from "../hooks/message.hook";
import axios from "axios";

export default function Login() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    message(error);
  }, [message, error]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    axios
      .post("/api/auth/login", form)
      .then((res) => {
        auth.login(res.token, res.userId);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
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
            <Button className="m-2" variant="primary" onClick={loginHandler}>
              Войти
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
