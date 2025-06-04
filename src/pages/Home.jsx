import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="form-container">
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
        Welcome to Our Blog
      </h1>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
          Share your thoughts and stories with the world
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/blog" className="btn btn-primary">
            View All Posts
          </Link>
          <Link to="/add-new" className="btn btn-primary">
            Create New Post
          </Link>
        </div>
      </div>
      
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.8)', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: '#4682B4', marginBottom: '10px' }}>Create Posts</h3>
            <p style={{ color: '#666' }}>Write and publish your blog posts with our easy-to-use editor.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.8)', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: '#4682B4', marginBottom: '10px' }}>Manage Content</h3>
            <p style={{ color: '#666' }}>Edit, update, and delete your posts with full CRUD functionality.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.8)', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: '#4682B4', marginBottom: '10px' }}>Organize</h3>
            <p style={{ color: '#666' }}>Categorize your posts and feature important content.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;