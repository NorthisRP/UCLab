import { React, useState, useEffect } from "react";
import { Form, Card, Button, Container } from "react-bootstrap";
import { useMessage } from "../../hooks/message.hook";

import axios from "axios";

export default function CreateProject() {
  const [success, setSuccess] = useState("");
  const message = useMessage();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: {},
  });

  useEffect(() => {
    message(success.message);
  }, [message, success]);

  const createHandler = async () => {
    let formData = new FormData();
    for (const name in form) {
      formData.append(name, form[name]);
    }
    axios
      .post("/api/admin/create_project", formData)
      .then((res) => setSuccess(res.data))
      .catch((err) => setSuccess(err.response.data));
  };
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const fileHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.files[0] });
  };

  return (
    <Container>
      <Card className="my-4">
        <Card.Header>Создание Проекта</Card.Header>
        <Card.Body>
          <Form.Group controlId="formGroupTitle" className="px-5">
            <Form.Label>Название Проекта</Form.Label>
            <Form.Control
              required
              name="title"
              placeholder="Введите название"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group controlId="formGroupDescription">
            <Form.Label>Описание Проекта</Form.Label>
            <Form.Control
              required
              name="description"
              as="textarea"
              onChange={changeHandler}
              style={{ resize: "none", height: "200px" }}
            />
          </Form.Group>
          <Form.Group>
            <Form.File
              required
              onChange={fileHandler}
              name="image"
              accept=".jpg"
              label="Загрузите картинку 350х200"
            />
          </Form.Group>
          <Button variant="primary" onClick={createHandler}>
            Добавить
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
