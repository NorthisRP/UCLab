import { React, useState, useContext } from "react";
import { Tab, Tabs, Button } from "react-bootstrap";
import CreateArticle from "./CreateArticle";
import CreateProject from "./CreateProject";
import CreateUser from "./CreateUser";
import Delete from "./Delete";
import { AuthContext } from "../../context/Auth.Context";
export default function Admin() {
  const [tab, setTab] = useState("article");
  const auth = useContext(AuthContext);

  const logout = () => {
    auth.logout();
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
          <CreateArticle />
        </Tab>
        <Tab eventKey="project" title="Добавить проект">
          <CreateProject />
        </Tab>
        <Tab eventKey="user" title="Добавить сотрудника">
          <CreateUser />
        </Tab>
        <Tab eventKey="delete" title="Удалить">
          <Delete />
        </Tab>
      </Tabs>
      <Button variant="primary" onClick={logout}>
        Выйти
      </Button>
    </div>
  );
}
