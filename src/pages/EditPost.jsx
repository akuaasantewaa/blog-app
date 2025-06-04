import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postsAPI } from '../services/api';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'top stories',
    featured: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    'top stories',
    'tech',
    'lifestyle',
    'sports',
    'entertainment',
    'business'
  ];

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getById(id);
      setFormData(response.data);
    } catch (err) {
      setError('Failed to fetch post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      await postsAPI.update(id, formData);
      
      // Navigate to blog page
      navigate('/blog');
    } catch (err) {
      setError('Failed to update post. Please try again.');
      console.error('Error updating post:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="form-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
        Edit Post
      </h1>
      
      {error && (
        <div style={{ 
          background: '#ff6b6b', 
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
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
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              style={{ width: 'auto' }}
            />
            Featured Post
          </label>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Updating...' : 'Update Post'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/blog')}
            className="btn"
            style={{ background: '#6c757d', color: 'white' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;