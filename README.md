# Blog Application

A full-stack React blog application with CRUD operations, built with React Router and JSON Server.

## Features

- **Create** new blog posts
- **Read** and view all posts
- **Update** existing posts
- **Delete** posts
- Categorize posts
- Feature posts
- Responsive design
- Modern UI with gradient backgrounds

## Project Structure

```
blog-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   └── Header.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Blog.js
│   │   ├── AddPost.js
│   │   └── EditPost.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── db.json
├── package.json
└── README.md
```

## Installation & Setup

### 1. Create React App
```bash
npx create-react-app blog-app
cd blog-app
```

### 2. Install Dependencies
```bash
npm install axios react-router-dom
npm install -D json-server
```

### 3. Copy Files
Copy all the provided files into their respective directories according to the project structure above.

### 4. Start JSON Server (Backend)
```bash
npm run server
```
This will start the JSON server on http://localhost:3000

### 5. Start React App (Frontend)
```bash
npm start
```
This will start the React app on http://localhost:3000

## API Endpoints

The JSON Server provides the following endpoints:

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get a specific post
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post
- `GET /categories` - Get all categories

## Usage

### Creating a Post
1. Navigate to "Add New" in the header
2. Fill in the title and description
3. Select a category
4. Click "Add Post"

### Viewing Posts
1. Go to the "Blog" page to see all posts
2. Posts are organized by categories
3. Featured posts are marked with a heart icon

### Editing a Post
1. Click the "Edit" button on any post
2. Modify the content
3. Toggle the featured status if needed
4. Click "Update Post"

### Deleting a Post
1. Click the "Delete" button on any post
2. Confirm the deletion in the popup

## Customization

### Adding New Categories
Edit the `categories` array in both `AddPost.js` and `EditPost.js`:

```javascript
const categories = [
  'top stories',
  'tech',
  'lifestyle',
  'sports',
  'entertainment',
  'business',
  'your-new-category'
];
```

### Styling
The app uses CSS with modern gradient backgrounds and responsive design. You can customize the colors and styles in `App.css`.

### Database
The `db.json` file contains sample data. You can modify it to add more posts or categories.

## Available Scripts

- `npm start` - Runs the React app
- `npm run server` - Runs the JSON server
- `npm run build` - Builds the app for production
- `npm test` - Runs tests

## Technologies Used

- React - Frontend framework
- React Router - Client-side routing
- Axios - HTTP client
- JSON Server - Mock REST API
- CSS3 - Styling with gradients and modern design

## Browser Support

This application works in all modern browsers that support ES6+ features.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request



This project is open source 
