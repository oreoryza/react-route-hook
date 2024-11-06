import React from "react";
import parse from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../utils/UseFetch";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `http://localhost:3000/posts/${id}`;
  const { loading, error, post } = useFetch(url);

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center">
    <div className="loader"></div>;
  </div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="container my-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>
      <div className="card shadow-sm p-4">
        <img src={post.img} alt="Blog image" className="card-img-top" />
        <h1 className="card-title text-center">{post.title}</h1>
        <p className="card-text text-muted text-center">{post.desc}</p>
        <hr />
        <div className="card-body">{parse(post.content)}</div>
      </div>
    </div>
  );
};

export default BlogDetail;