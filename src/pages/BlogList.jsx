import { Link, useNavigate, useLocation } from "react-router-dom";

const BlogList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current page from the query parameter or default to 1
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;

  // Get the posts from the JSON server
  const [posts, setPosts] = useState([
    {
      id: "what-is-react",
      title: "What is React?",
      desc: "React is a JavaScript library for building user interfaces.",
      content:
        "<h2>Introduction</h2><p>React is a popular JavaScript library for building interactive UIs and complex single-page applications.</p><h3>Features</h3><ul><li>Component-based architecture</li><li>Efficient DOM updates</li><li>Flexibility and extensive ecosystem</li></ul><p>Overall, React makes it simple to build dynamic web applications.</p>",
      img: "https://loremflickr.com/1280/720",
    },
  ]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Blog Posts</h1>
      <section className="row">
        {posts.map((post) => (
          <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
            <Link to={`/post/${post.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm">
                <img
                  src={post.image}
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
        >
          <i className="bi bi-arrow-left"></i> Previous
        </button>
        <button
          className="btn btn-outline-primary"
        >
          Next <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default BlogList;
