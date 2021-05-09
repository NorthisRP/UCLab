import { React } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Calendar3, Folder } from "react-bootstrap-icons";
import axios from "axios";
import styles from "./blog.module.scss";
export default function Blog_New(props) {
  let readPDF = () => {
    axios
      .get("/api/feed/load_pdf", {
        params: { id: props.id },
        responseType: "blob",
      })
      .then((res) => {
        console.log(res);
        const file = new Blob([res.data], { type: "application/pdf" });
        window.open(URL.createObjectURL(file));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Container className={styles.blogNew}>
        <h3>{props.title}</h3>
        <Row className="details align-items-center">
          <Calendar3 />
          <strong>{props.date}</strong>
          <Folder />
          <strong>{props.category}</strong>
        </Row>
        <img
          src={`data:image;base64,${props.image}`}
          alt="Here's some pic"
        ></img>
        <div className="description">
          <p>{props.description}</p>
        </div>
        <Button onClick={readPDF}>Read more</Button>
      </Container>
    </div>
  );
}
