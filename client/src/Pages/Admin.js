import { React, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CreateArticle from "./Admin/CreateArticle";
import Delete from "./Admin/Delete";

export default function Admin() {
  const [tab, setTab] = useState("article");
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
        <Tab eventKey="delete" title="Удалить">
          <Delete />
        </Tab>
        <Tab eventKey="project" title="Добавить Проект">
          здесь ничего еще нет
        </Tab>
      </Tabs>
    </div>
  );
}
