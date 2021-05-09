import { React, useState, useEffect } from "react";
import axios from "axios";
import { Form, Container, Row, Button, Card } from "react-bootstrap";
import { useMessage } from "../../hooks/message.hook";

export default function Delete() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const message = useMessage();
  useEffect(() => {
    message(error.message);
  }, [message, error]);

  const deleteHandler = () => {
    axios
      .post("/api/admin/delete", { title: title })
      .then((res) => setError(res.data))
      .catch((err) => setError(err.response.data));
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
              name="formHorizontalRadios"
            />
            <Form.Check type="radio" label="Юзер" name="formHorizontalRadios" />
            <Form.Check
              type="radio"
              label="Проект"
              name="formHorizontalRadios"
            />
          </Row>
          <Form.Group>
            <Form.Label>
              Введите заголовок статьи, которую хотите удалить
            </Form.Label>
            <Form.Control
              name="title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
          <Row className="justify-content-center">
            <Button variant="primary" onClick={deleteHandler}>
              Добавить
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
