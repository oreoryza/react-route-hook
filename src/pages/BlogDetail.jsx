import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

const BlogDetail = () => {
  const [post, setPost] = useState({
    id: "what-is-react",
    title: "What is React?",
    desc: "React is a JavaScript library for building user interfaces.",
    content:
      "<h2>Introduction</h2><p>React is a popular JavaScript library for building interactive UIs and complex single-page applications.</p><h3>Features</h3><ul><li>Component-based architecture</li><li>Efficient DOM updates</li><li>Flexibility and extensive ecosystem</li></ul><p>Overall, React makes it simple to build dynamic web applications.</p>",
    img: "https://loremflickr.com/1280/720",
  });

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container my-5">
      <button
        className="btn btn-outline-secondary mb-4"
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>
      <div className="card shadow-sm p-4">
        <img src={post.image} alt="Blog image" className="card-img-top" />
        <h1 className="card-title text-center">{post.title}</h1>
        <p className="card-text text-muted text-center">{post.desc}</p>
        <hr />
        <div className="card-body">{parse(post.content)}</div>
      </div>
    </div>
  );
};

export default BlogDetail;
