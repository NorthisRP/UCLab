import { React, useState, useEffect } from "react";
import { Form, Container, Row, Button, Card } from "react-bootstrap";
import { useMessage } from "../../hooks/message.hook";
import axios from "axios";

export default function CreateArticle() {
  const [success, setSuccess] = useState("");
  const message = useMessage();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    image: {},
    article: {},
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
      .post("/api/admin/create_article", formData)
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
    <Container className="my-4">
      <Card>
        <Card.Header>Создание Статьи</Card.Header>
        <Card.Body>
          <Form.Group className="px-5">
            <Form.Label>Заголовок статьи</Form.Label>
            <Form.Control
              required
              name="title"
              placeholder="Введите заголовок"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Краткое описание статьи</Form.Label>
            <Form.Control
              required
              name="description"
              as="textarea"
              onChange={changeHandler}
              style={{ resize: "none", height: "200px" }}
            />
          </Form.Group>
          <Row className="justify-content-around gx-4">
            <Form.Group>
              <Form.Label>Введите дату публикации статьи</Form.Label>
              <Form.Control
                required
                type="date"
                name="date"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Введите категорию статьи</Form.Label>
              <Form.Control name="category" onChange={changeHandler} />
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
            <Form.Group>
              <Form.File
                required
                onChange={fileHandler}
                name="article"
                label="Выберите загружаемую статью"
                accept=".pdf"
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                required
                onChange={fileHandler}
                name="image"
                accept=".jpg"
                label="Загрузите картинку 1280х720"
              />
            </Form.Group>
          </Row>
          <Button variant="primary" onClick={createHandler}>
            Добавить
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
