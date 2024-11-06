import React from "react";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <BlogList />
        <BlogDetail />
      </>
    );
  }
}

export default App;
