import { React } from "react";
import { ArrowRight } from "react-bootstrap-icons";
import styles from "./blog.module.scss";

export default function BlogFilter(props) {
  return (
    <div className={styles.BlogFilter}>
      <input
        placeholder="Поиск по заголовку..."
        onChange={(event) => props.searchHandler(event.target.value)}
      />

      <div className={styles.BlogFilter__categories}>
        <h3>Категории</h3>
        <div
          name="all"
          onClick={() => {
            props.categoryHandler("all");
          }}
          className={styles.BlogFilter__category}
        >
          <ArrowRight />
          <strong>Все статьи</strong>
        </div>
        <div
          name="transport"
          onClick={() => {
            props.categoryHandler("transport");
          }}
          className={styles.BlogFilter__category}
        >
          <ArrowRight />
          <strong>Транспорт</strong>
        </div>
        <div
          name="education"
          onClick={() => {
            props.categoryHandler("education");
          }}
          className={styles.BlogFilter__category}
        >
          <ArrowRight />
          <strong>Образование</strong>
        </div>
        <div
          name="neurals"
          onClick={() => {
            props.categoryHandler("neurals");
          }}
          className={styles.BlogFilter__category}
        >
          <ArrowRight />
          <strong>Нейросети</strong>
        </div>
      </div>
    </div>
  );
}
