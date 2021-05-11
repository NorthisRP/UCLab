import { React, useState, useEffect } from "react";
import axios from "axios";
import BlogFeed from "./Blog/BlogFeed";
import BlogFilter from "./Blog/BlogFilter";
import styles from "./Blog/blog.module.scss";
import { Row, Container, Col } from "react-bootstrap";

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [filtered_articles, setFilteredArticles] = useState([]);

  useEffect(() => {
    axios
      .get("/api/load/articles")
      .then((res) => {
        setArticles(res.data);
        setFilteredArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchHandler = (search) => {
    if (!search) {
      return setFilteredArticles(articles);
    }
    let filter = [];
    filtered_articles.forEach((article) => {
      if (article.title.includes(search)) {
        filter.push(article);
      }
    });
    setFilteredArticles(filter);
  };

  const categoryHandler = (category) => {
    let filter = [];
    switch (category) {
      case "education":
        articles.forEach((article) => {
          if (article.category === "Образование") {
            filter.push(article);
          }
        });
        break;
      case "neurals":
        articles.forEach((article) => {
          if (article.category === "Нейросети") {
            filter.push(article);
          }
        });
        break;
      case "transport":
        articles.forEach((article) => {
          if (article.category === "Транспорт") {
            filter.push(article);
          }
        });
        break;
      default:
        return setFilteredArticles(articles);
    }
    setFilteredArticles(filter);
  };
  if (articles.length) {
    return (
      <Container fluid="md">
        <Row>
          <Col md={2} className="order-1 order-md-2">
            <BlogFilter
              searchHandler={searchHandler}
              categoryHandler={categoryHandler}
            />
          </Col>
          <Col md={10} sm={12} className="order-2 order-md-1">
            <BlogFeed articles={filtered_articles} />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <h1 className={styles.no_articles}>Все статьи кто-то съел :(</h1>;
  }
}
