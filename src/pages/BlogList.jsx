import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useFetch from "../utils/UseFetch";

const BlogList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pagination, setPagination] = useState({})

  const url = `http://localhost:3000/posts?_page=${initialPage}&_per_page=5`;
  const { loading, error, post } = useFetch(url);

  useEffect(() => {
    if (post) {
      setPosts(post.data);
      setPagination({
        prev: post.prev,
        next: post.next,
      })
    }
  }, [post]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    navigate(`?page=${currentPage - 1}`);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    navigate(`?page=${currentPage + 1}`);
  };

  if (loading) 
    return 
    <div className="d-flex justify-content-center align-items-center">
      <div className="loader"></div>;
    </div>

  if (error) 
    return <div>{error}</div>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Blog Posts</h1>
      <section className="row">
        {posts.map((post) => (
          <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
            <Link to={`/post/${post.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm">
                <img
                  src={post.img}
                  alt={post.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted">{post.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={handlePrevPage}
          disabled={!pagination.prev}
        >
          <i className="bi bi-arrow-left"></i> Previous
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={handleNextPage}
          disabled={!pagination.next}
        >
          Next <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default BlogList;