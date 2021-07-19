import React from "react";
import { Button, Card, Container } from "react-bootstrap";
//import styles from "./projects.module.scss";

export default function User(props) {
  return (
    <Container>
      <Card>
        <Card.Img variant="top" src={`data:image;base64,${props.image}`} />
        <Card.Body>
          <Card.Title>{props.FIO}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Card.Text>{props.date}</Card.Text>
          <Card.Text>{props.publications}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
