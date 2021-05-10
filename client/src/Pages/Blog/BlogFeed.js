import { React } from "react";
import BlogNew from "./BlogNew";

export default function BlogFeed(props) {
  return (
    <div>
      {Object.values(props.articles).map((article, index) => {
        return (
          <BlogNew
            key={index}
            id={article.id}
            title={article.title}
            date={new Date(article.date)}
            category={article.category}
            description={article.description}
            image={article.image}
          />
        );
      })}
    </div>
  );
}
