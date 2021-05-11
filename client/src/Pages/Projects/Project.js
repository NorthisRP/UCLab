import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import styles from "./projects.module.scss";

export default function Project(props) {
  return (
    <Container className={styles.project}>
      <Card>
        <Card.Img
          className={styles.img}
          variant="top"
          src={`data:image;base64,${props.image}`}
        />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text className={styles.project__description}>
            {props.description}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
