import { React, useState, useEffect } from "react";
import User from "./User";
import { Row, Container, Col } from "react-bootstrap";
import axios from "axios";

export default function About() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/load/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Row>
        {Object.values(users).map((user, index) => {
          return (
            <Col>
              <User
                key={index}
                id={user.id}
                FIO={user.FIO}
                description={user.description}
                date={user.date}
                publications={user.publications}
                image={user.image}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
