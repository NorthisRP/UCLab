import { React } from "react";
import { Button } from "react-bootstrap";
import { Calendar3, FolderFill } from "react-bootstrap-icons";
import axios from "axios";
import styles from "./blog.module.scss";
import { useTranslation } from "react-i18next";
export default function Blog_New(props) {
  const { t } = useTranslation();

  let readPDF = () => {
    axios
      .get("/api/load/pdf", {
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
    <div className={styles.blogNew}>
      <h3>{t(`${props.title}`)}</h3>
      <div className={styles.blogNew__details}>
        <Calendar3 style={{ color: "red" }} />
        <strong>{props.date.toLocaleDateString("ru")}</strong>
        <FolderFill style={{ color: "rgb(238, 145, 6)" }} />
        <strong>{t(`${props.category}`)}</strong>
      </div>
      <img
        src={`data:image;base64,${props.image}`}
        alt="Here's some pic"
        className={styles.blogNew__img}
      ></img>
      <div className={styles.blogNew__description}>
        <p>{props.description}</p>
      </div>
      <Button onClick={readPDF}>Читать подробнее</Button>
    </div>
  );
}
