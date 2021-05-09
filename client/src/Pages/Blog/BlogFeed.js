import { React, useState, useEffect } from "react";
import BlogNew from "./BlogNew";
import axios from "axios";

export default function BlogFeed() {
  const [articles, setArticles] = useState({});

  useEffect(() => {
    axios
      .get("/api/feed/load_articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {!!articles &&
        Object.values(articles).map((article, index) => {
          return (
            <BlogNew
              key={index}
              id={article.id}
              title={article.title}
              date={article.date}
              category={article.category}
              description={article.description}
              image={article.image}
            />
          );
        })}
    </div>
  );
}
