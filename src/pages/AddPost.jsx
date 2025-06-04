import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postsAPI } from "../services/api";

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "top stories",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    "top stories",
    "tech",
    "lifestyle",
    "sports",
    "entertainment",
    "business",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await postsAPI.create(formData);

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "top stories",
      });

      // Navigate to blog page
      navigate("/blog");
    } catch (err) {
      setError("Failed to create post. Please try again.");
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1
        style={{ textAlign: "center", marginBottom: "30px", color: "#2c3e50" }}
      >
        Add New Post
      </h1>

      {error && (
        <div
          style={{
            background: "#ff6b6b",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter title..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input form-textarea"
            placeholder="Enter description..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Post"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="btn"
            style={{ background: "#6c757d", color: "white" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
