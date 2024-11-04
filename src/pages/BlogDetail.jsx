import React, { Component } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Wrapper function to pass route parameters and navigation as props to a class component
function BlogDetailWrapper() {
  const params = useParams();
  const navigate = useNavigate();

  return <BlogDetail params={params} navigate={navigate} />;
}

class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.fetchPostDetail(id);
  }

  fetchPostDetail = (id) => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((response) => {
        this.setState({ post: response.data });
      })
      .catch((error) => {
        console.error("Error fetching post detail:", error);
      });
  };

  render() {
    const { post } = this.state;

    if (!post) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.desc}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <button onClick={() => this.props.navigate(-1)}>Back</button>
      </div>
    );
  }
}

export default BlogDetailWrapper;
