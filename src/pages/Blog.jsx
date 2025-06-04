import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postsAPI } from "../services/api";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getAll();
      setPosts(response.data);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await postsAPI.delete(id);
        setPosts(posts.filter((post) => post.id !== id));
      } catch (err) {
        setError("Failed to delete post");
        console.error("Error deleting post:", err);
      }
    }
  };

  const toggleFeatured = async (post) => {
    try {
      const updatedPost = { ...post, featured: !post.featured };
      await postsAPI.update(post.id, updatedPost);
      setPosts(posts.map((p) => (p.id === post.id ? updatedPost : p)));
    } catch (err) {
      setError("Failed to update post");
      console.error("Error updating post:", err);
    }
  };

  const getPostsByCategory = (category) => {
    return posts.filter((post) => post.category === category);
  };

  const topStories = getPostsByCategory("top stories");
  const otherPosts = posts.filter((post) => post.category !== "top stories");

  if (loading) {
    return (
      <div className="blog-container">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <div style={{ textAlign: "center", padding: "50px", color: "#ff6b6b" }}>
          <p>{error}</p>
          <button
            onClick={fetchPosts}
            className="btn btn-primary"
            style={{ marginTop: "10px" }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-grid">
        {/* Top Stories Section */}
        <div className="blog-section">
          <div className="section-header">
            <h2 className="section-title">Top Stories</h2>
            <button className="btn btn-danger">del</button>
          </div>

          {topStories.length > 0 ? (
            topStories.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-title">{post.title}</div>
                <div className="post-description">
                  {post.description.substring(0, 100)}...
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <span className="category-badge">{post.category}</span>
                    {post.featured && (
                      <span className="featured-badge">Featured</span>
                    )}
                  </div>
                  <div className="post-actions">
                    <Link to={`/edit/${post.id}`} className="btn btn-edit">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toggleFeatured(post)}
                      className="heart-icon"
                      title={
                        post.featured
                          ? "Remove from featured"
                          : "Add to featured"
                      }
                    >
                      {post.featured ? "❤️" : "🤍"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#666", fontStyle: "italic" }}>
              No top stories yet.
            </p>
          )}
        </div>

        {/* Other Posts Section */}
        <div className="blog-section">
          <div className="section-header">
            <h2 className="section-title">All Posts</h2>
            <span className="heart-icon">❤️</span>
          </div>

          {otherPosts.length > 0 ? (
            otherPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-title">{post.title}</div>
                <div className="post-description">
                  {post.description.substring(0, 150)}...
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <span className="category-badge">{post.category}</span>
                    {post.featured && (
                      <span className="featured-badge">Featured</span>
                    )}
                  </div>
                  <div className="post-actions">
                    <Link to={`/edit/${post.id}`} className="btn btn-edit">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toggleFeatured(post)}
                      className="heart-icon"
                      title={
                        post.featured
                          ? "Remove from featured"
                          : "Add to featured"
                      }
                    >
                      {post.featured ? "❤️" : "🤍"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#666", fontStyle: "italic" }}>
              No posts available.
            </p>
          )}
        </div>
      </div>

      {/* Bottom Section for Additional Categories */}
      {posts.length > 0 && (
        <div className="blog-section">
          <div className="section-header">
            <h2 className="section-title">Featured Posts</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "15px",
            }}
          >
            {posts
              .filter((post) => post.featured)
              .map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-title">{post.title}</div>
                  <div className="post-description">{post.description}</div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <span className="category-badge">{post.category}</span>
                    <div className="post-actions">
                      <Link to={`/edit/${post.id}`} className="btn btn-edit">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link to="/add-new" className="btn btn-primary">
          Add New Post
        </Link>
      </div>
    </div>
  );
};

export default Blog;
