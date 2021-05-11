import { React } from "react";
import { ArrowRight } from "react-bootstrap-icons";
import styles from "./blog.module.scss";
import { useTranslation } from "react-i18next";

export default function BlogFilter(props) {
  const { t } = useTranslation();
  return (
    <div className={styles.BlogFilter}>
      <input
        placeholder={t("Поиск по заголовку...")}
        onChange={(event) => props.searchHandler(event.target.value)}
      />

      <div className={styles.BlogFilter__categories}>
        <h3>{t("Категории")}</h3>
        <div
          name="all"
          onClick={() => {
            props.categoryHandler("all");
          }}
          className={styles.BlogFilter__category}
        >
          <ArrowRight />
          <strong>{t("Все статьи")}</strong>
        </div>
        <div
          name="transport"
          onClick={() => {
            props.categoryHandler("transport");
          }}
          className={styles.BlogFilter__category}
        >
          <ArrowRight />
          <strong>{t("Транспорт")}</strong>
        </div>
        <div
          name="education"
          onClick={() => {
            props.categoryHandler("education");
          }}
          className={styles.BlogFilter__category}
        >
          <ArrowRight />
          <strong>{t("Образование")}</strong>
        </div>
        <div
          name="neurals"
          onClick={() => {
            props.categoryHandler("neurals");
          }}
          className={styles.BlogFilter__category}
        >
          <ArrowRight />
          <strong>{t("Нейросети")}</strong>
        </div>
      </div>
    </div>
  );
}
