import { React, useState, useEffect } from "react";
import { Tab, Tabs, Form, Container, Row, Button } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export default function Admin() {
  const [tab, setTab] = useState("article");
  const [success, setSuccess] = useState(null);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    message(success.message);
  }, [message, success]);

  const createHandler = async () => {
    try {
      const data = await request("/api/create/article", "POST", { ...form });
      setSuccess(data);
    } catch (e) {}
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={tab}
        onSelect={(k) => setTab(k)}
        className="justify-content-center"
      >
        <Tab eventKey="article" title="Добавить статью">
          <Container className="my-4">
            <Form.Group controlId="formGroupTitle" className="px-5">
              <Form.Label>Заголовок статьи</Form.Label>
              <Form.Control
                name="title"
                placeholder="Введите заголовок"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group controlId="formGroupDescription">
              <Form.Label>Краткое описание статьи</Form.Label>
              <Form.Control
                name="description"
                style={{ height: "150px" }}
                onChange={changeHandler}
              />
            </Form.Group>
            <Row className="justify-content-around gx-4">
              <Form.Group controlId="formGroupDate">
                <Form.Label>Введите дату публикации статьи</Form.Label>
                <Form.Control
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
                <Form.File name="article" label="Выберите загружаемую статью" />
              </Form.Group>
              <Form.Group>
                <Form.File name="image" label="Загрузите картинку 1280х720" />
              </Form.Group>
            </Row>
            <Button
              variant="primary"
              type="submit"
              onClick={createHandler}
              disabled={loading}
            >
              Добавить
            </Button>
          </Container>
        </Tab>
        <Tab eventKey="project" title="Добавить Проект">
          здесь ничего еще нет
        </Tab>
      </Tabs>
    </div>
  );
}
