import { React, useState, useEffect } from "react";
import { Form, Card, Button, Container } from "react-bootstrap";
import { useMessage } from "../../hooks/message.hook";
import { PlusCircleFill } from "react-bootstrap-icons";
import axios from "axios";

export default function CreateProject() {
  const [success, setSuccess] = useState("");
  const message = useMessage();
  const [publics, setPublics] = useState([""]);
  const [form, setForm] = useState({
    FIO: "",
    description: "",
    date: "",
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
    publics.forEach((publ) => formData.append("publications", publ));
    axios
      .post("/api/admin/create_user", formData)
      .then((res) => setSuccess(res.data))
      .catch((err) => setSuccess(err.response.data));
  };
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const fileHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.files[0] });
  };
  const addPublicHandler = () => {
    setPublics([...publics, publics.push("")]);
  };
  const publicHandler = (event) => {
    setPublics((oldPublics) => {
      let newPublics = [...oldPublics];
      newPublics[event.target.id] = event.target.value;
      return newPublics;
    });
  };

  return (
    <Container>
      <Card className="my-4">
        <Card.Header>Добавление сотрудника</Card.Header>
        <Card.Body>
          <Form.Group className="px-5">
            <Form.Label>ФИО сотрудника</Form.Label>
            <Form.Control
              required
              name="FIO"
              placeholder="Введите ФИО"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>О себе</Form.Label>
            <Form.Control
              required
              name="description"
              as="textarea"
              onChange={changeHandler}
              style={{ resize: "none", height: "200px" }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Введите дату рождения</Form.Label>
            <Form.Control
              required
              type="date"
              name="date"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Заполните список публикаций</Form.Label>
            {publics.map((publication, i) => {
              return (
                <Form.Control
                  key={i}
                  id={i.toString()}
                  required
                  type="text"
                  name="publications"
                  onChange={publicHandler}
                />
              );
            })}

            <PlusCircleFill onClick={addPublicHandler} />
          </Form.Group>
          <Form.Group>
            <Form.File
              required
              onChange={fileHandler}
              name="image"
              accept=".jpg"
              label="Загрузите фотографию 350х200"
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
