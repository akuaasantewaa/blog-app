import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/add-new" element={<AddPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
