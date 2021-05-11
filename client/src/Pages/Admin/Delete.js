import { React, useState, useEffect } from "react";
import axios from "axios";
import { Form, Container, Row, Button, Card } from "react-bootstrap";
import { useMessage } from "../../hooks/message.hook";

export default function Delete() {
  const [form, setForm] = useState({ title: "", object: "" });
  const [error, setError] = useState("");
  const message = useMessage();
  useEffect(() => {
    message(error.message);
  }, [message, error]);

  const deleteHandler = () => {
    axios
      .post("/api/admin/delete", form)
      .then((res) => setError(res.data))
      .catch((err) => setError(err.response.data));
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Container className="my-4 col-4">
      <Card>
        <Card.Header>Удаление сущности</Card.Header>
        <Card.Body>
          <Row className="justify-content-around mb-4 px-5">
            <Form.Check
              type="radio"
              label="Статья"
              name="object"
              value="Article"
              onChange={changeHandler}
            />
            <Form.Check
              type="radio"
              label="Юзер"
              name="object"
              value="User"
              onChange={changeHandler}
            />
            <Form.Check
              type="radio"
              label="Проект"
              name="object"
              value="Project"
              onChange={changeHandler}
            />
          </Row>
          <Form.Group>
            <Form.Label>
              Введите заголовок/имя/название сущности, которую хотите удалить
            </Form.Label>
            <Form.Control name="title" onChange={changeHandler} />
          </Form.Group>
          <Row className="justify-content-center">
            <Button variant="primary" onClick={deleteHandler}>
              Удалить
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
