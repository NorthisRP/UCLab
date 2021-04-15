import { React, useState } from "react";
import { Tab, Tabs, Form, Container, Row, Button } from "react-bootstrap";

export default function Admin() {
  const [key, setKey] = useState("article");

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="justify-content-center"
      >
        <Tab eventKey="article" title="Добавить статью">
          <Container className="my-4">
            <Form action="" method="POST">
              <Form.Group controlId="formGroupHeader" className="px-5">
                <Form.Label>Заголовок статьи</Form.Label>
                <Form.Control name="header" placeholder="Введите заголовок" />
              </Form.Group>
              <Form.Group controlId="formGroupDescription">
                <Form.Label>Краткое описание статьи</Form.Label>
                <Form.Control name="description" style={{ height: "150px" }} />
              </Form.Group>
              <Row className="justify-content-around gx-4">
                <Form.Group controlId="formGroupDate">
                  <Form.Label>Введите дату публикации статьи</Form.Label>
                  <Form.Control type="date" name="date" />
                </Form.Group>
                <Form.Group controlId="formGroupCategory">
                  <Form.Label>Введите категорию статьи</Form.Label>
                  <Form.Control name="category" />
                </Form.Group>
              </Row>
              <Row className="justify-content-center">
                <Form.Group>
                  <Form.File
                    name="article"
                    label="Выберите загружаемую статью"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.File name="image" label="Загрузите картинку 1280х720" />
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">
                Добавить
              </Button>
            </Form>
          </Container>
        </Tab>
        <Tab eventKey="project" title="Добавить Проект">
          жопа
        </Tab>
      </Tabs>
    </div>
  );
}
