import { React, useState, useEffect, useContext } from "react";
import { Form, Container, Row, Button } from "react-bootstrap";
import { useMessage } from "../../hooks/message.hook";
import { AuthContext } from "../../context/Auth.Context";
import axios from "axios";

export default function CreateArticle() {
  const [success, setSuccess] = useState("");
  const message = useMessage();
  const auth = useContext(AuthContext);
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
  const logout = () => {
    auth.logout();
  };
  return (
    <Container className="my-4">
      <Form.Group controlId="formGroupTitle" className="px-5">
        <Form.Label>Заголовок статьи</Form.Label>
        <Form.Control
          required
          name="title"
          placeholder="Введите заголовок"
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group controlId="formGroupDescription">
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
        <Form.Group controlId="formGroupDate">
          <Form.Label>Введите дату публикации статьи</Form.Label>
          <Form.Control
            required
            type="date"
            name="date"
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group controlId="formGroupCategory">
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
      <Button variant="primary" onClick={logout}>
        Выйти
      </Button>
    </Container>
  );
}
