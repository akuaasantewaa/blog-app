import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Posts API
export const postsAPI = {
  // Get all posts
  getAll: () => api.get('/posts'),
  
  // Get post by ID
  getById: (id) => api.get(`/posts/${id}`),
  
  // Create new post
  create: (post) => api.post('/posts', {
    ...post,
    createdAt: new Date().toISOString(),
    featured: false
  }),
  
  // Update post
  update: (id, post) => api.put(`/posts/${id}`, post),
  
  // Delete post
  delete: (id) => api.delete(`/posts/${id}`),
  
  // Get posts by category
  getByCategory: (category) => api.get(`/posts?category=${category}`)
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAll: () => api.get('/categories'),
  
  // Create category
  create: (category) => api.post('/categories', category)
};

export default api;