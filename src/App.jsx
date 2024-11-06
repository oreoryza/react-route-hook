import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/post/:id" element={<BlogDetail />} />
            </Routes>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
