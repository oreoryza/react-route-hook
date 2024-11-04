import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pagination: {},
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchPosts();
    }
  }

  fetchPosts = () => {
    axios
      .get(`http://localhost:3000/posts?_per_page=5&_page=${this.state.page}`)
      .then((response) => {
        this.setState({
          posts: response.data.data,
          pagination: {
            first: response.data.first,
            prev: response.data.prev,
            next: response.data.next,
            last: response.data.last,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  handlePageChange = (page) => {
    this.setState({ page });
  };

  render() {
    const { posts, pagination } = this.state;

    return (
      <div>
        <h1>Blog Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.desc}</p>
              <Link to={`/post/${post.id}`}>Read More</Link>
            </li>
          ))}
        </ul>
        <div>
          <button
            disabled={pagination.prev === null}
            onClick={() => this.handlePageChange(pagination.prev)}
          >
            Previous
          </button>
          <button
            disabled={pagination.next === null}
            onClick={() => this.handlePageChange(pagination.next)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default BlogList;
