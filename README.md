# Blog REST API

This is a REST API for a blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The API provides comprehensive endpoints for managing blog posts and user interactions, including user authentication, email verification, and password reset functionality.

## Features

- **User Authentication**: Secure user authentication using JWT (JSON Web Tokens).
- **Email Verification**: Users receive a verification email after signing up to confirm their email address.
- **Password Reset**: Users can reset their passwords by receiving a reset link via email.
- **CRUD Operations**: Full CRUD (Create, Read, Update, Delete) functionality for blog posts and comments.
- **Category Filtering**: Blog posts can be filtered by category.
- **Error Handling**: Comprehensive error handling ensures the API responds gracefully to invalid requests and server errors.
- **Comments on Posts**: Users can add comments on blog posts.

## Technologies Used

- **Backend**: Node.js and Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Mailtrap

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/mern-blog-rest-api.git
   cd mern-blog-rest-api

2. **Install dependencies**:
   ```bash
   npm install

3. **Set up environment variables**
   ```bash
   PORT='your port number'
   MONGO_URL='your MongoDB URL'
   JWT_SECRET='your JWT secret key'
   NODE_ENV='development'
   MAILTRAP_TOKEN='your Mailtrap token'
   MAILTRAP_ENDPOINT='your Mailtrap endpoint'

4.**Start the server**
   ```bash
   npm start
 



