import { React, useState, useEffect } from "react";
import BlogNew from "./BlogNew";

export default function BlogFeed() {
  const [articles, setArticles] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div>
      {articles.map((article, index) => (
        <BlogNew
          key={index}
          header={article.header}
          date={article.date}
          category={article.category}
          description={article.description}
          pdf={article.file}
          image={article.image}
        />
      ))}
    </div>
  );
}
