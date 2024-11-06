import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BlogList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current page from the query parameter or default to 1
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = () => {
    axios
      .get(`http://localhost:3000/posts?_per_page=5&_page=${page}`)
      .then((response) => {
        setPosts(response.data.data);
        setPagination({
          first: response.data.first,
          prev: response.data.prev,
          next: response.data.next,
          last: response.data.last,
        });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Blog Posts</h1>
      <section className="row">
        {posts.map((post) => (
          <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
            <Link to={`/post/${post.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm">
                <img
                  src="https://via.placeholder.com/150"
                  className="card-img-top img-cstm"
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
          disabled={!pagination.prev}
          onClick={() => handlePageChange(page - 1)}
        >
          <i className="bi bi-arrow-left"></i> Previous
        </button>
        <button
          className="btn btn-outline-primary"
          disabled={!pagination.next}
          onClick={() => handlePageChange(page + 1)}
        >
          Next <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default BlogList;
