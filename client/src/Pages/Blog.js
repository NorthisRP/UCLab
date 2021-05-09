import React from "react";
import BlogFeed from "./Blog/BlogFeed";

export default function Blog() {
  // const [initialData, setInitialData] = useState([{}])

  //   useEffect(()=>{
  //     fetch('/api').then(
  //       response => response.json()
  //     ).then(data => setInitialData(data))
  //   }, []);

  return (
    <div>
      <BlogFeed />
      {/* <h1>{initialData.status}</h1> */}
    </div>
  );
}
