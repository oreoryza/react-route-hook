import React from "react";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/post/:id" element={<BlogDetail />} />
            <Route path="*" element={<h1>Page not Found</h1>} />
          </Routes>
        </div>
      </Router>
    );
  }
export default App;
