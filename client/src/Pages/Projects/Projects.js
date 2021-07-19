import { React, useState, useEffect } from "react";
import Project from "./Project";
import { Row, Container, Col } from "react-bootstrap";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("/api/load/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Container>
        <Row>
          {Object.values(projects).map((project, index) => {
            return (
              <Col>
                <Project
                  key={index}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
