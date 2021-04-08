import React, { Component } from "react";
import BlogNew from "./BlogNew";

export default class Blog_Feed extends Component {
  render() {
    return (
      <div>
        <BlogNew
          header="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, non!"
          date="May 21, 2020"
          category="Without category"
          image="https://www.setaswall.com/wp-content/uploads/2018/07/Basketball-Wallpaper-04-1280x720-768x432.jpg"
        />
      </div>
    );
  }
}
