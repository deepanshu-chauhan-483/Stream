# Stream Backend Service (Submission for Clinikk)

## Table of Contents

- [Introduction](#introduction)
- [File Structure](#file-structure)
- [Flow of Media API](#flow-of-media-api)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Media Endpoints](#media-endpoints)
- [Libraries Used](#libraries-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Diagrams](#diagrams)

## Introduction

Clinikk TV is a new feature on our customer-facing platform (Android app and PWA) that provides subscribers with access to rich, health-related media content, including both video and audio. This backend service is designed to manage user authentication, media content management, and streaming.

## File Structure

```
clinikk-tv-backend
├── controllers
│   ├── mediaController.js
│   └── userController.js
├── models
│   ├── Media.js
│   └── User.js
├── routes
│   ├── media.js
│   └── user.js
├── services
│   ├── ffmpegService.js
│   ├── streamService.js
├── utils
│   ├── logger.js
│   ├── cluster.js
├── app.js
├── config.js
```

## Flow of Media API

The media API flow includes the following steps:

### User Registration and Login:

- Users register with their name, email, and password.
- Users log in with their email and password to receive a JWT token for authentication.

### Media Upload:

- Users upload media files, providing details such as title, description, media type, and file path.
- The media file is converted to HLS format using FFmpeg.
- The media details are saved in the database.

### Fetching Media:

- Users can fetch all media or specific media by ID.
- The media details are retrieved from the database and returned in the response.

### Media Streaming:

- Users can stream media files by ID.
- The media file is read and streamed in chunks to the client.

## Flow Diagrams

Below are the flow diagrams representing different aspects of the Media API:

### User Registration and Login
This diagram illustrates the process of user authentication, including registration and login, where users receive a JWT token upon successful authentication.

![User Registration and Login](backend/content/authentication.png)

### Media Upload
This diagram details the steps involved in uploading media files, processing them with FFmpeg, and storing their metadata in the database.

![Media Upload](backend/content/media_upload.png)

### Fetching Media
This diagram represents how media details are retrieved from the database and returned to the client upon request.

![Fetching Media](backend/content/getMedia.png)

### Media Streaming
This diagram shows how media files are served in chunks to users, optimizing performance and ensuring smooth playback.

![Media Streaming](backend/content/requestStreaming.png)

## Cluster-based Performance Optimization

- **cluster.js** is used to utilize multiple CPU cores for efficient request handling.
- The master process forks worker processes equal to the number of CPU cores.
- If a worker crashes, the master automatically restarts it to maintain uptime.

## Logging System

- **logger.js** uses Winston for logging important events such as:
  - Server startup
  - Worker process creation and failure
  - API requests and errors
- Logs are written to both the console and a `combined.log` file for debugging and auditing purposes.

## Streaming Service

- **streamService.js** handles media streaming by serving video content in chunks to optimize performance.
- It processes `Range` headers to allow seeking and partial content delivery.
- Uses `fs.createReadStream` for efficient media file handling.

## API Documentation

### User Endpoints

#### Register a New User

**Endpoint:** `POST /api/users/register`

**Request Body:**

```json
{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456"
}
```

**Headers:**

```json
{
    "Content-Type": "application/json"
}
```

#### Login a User

**Endpoint:** `POST /api/users/login`

**Request Body:**

```json
{
    "email": "test@example.com",
    "password": "123456"
}
```

**Headers:**

```json
{
    "Content-Type": "application/json"
}
```

**Expected Response:**

```json
{
    "token": "your_jwt_token_here"
}
```

### Media Endpoints

#### Get All Media

**Endpoint:** `GET /api/media`

**Headers:**

```json
{
    "Content-Type": "application/json",
    "Authorization": "Bearer your_jwt_token_here"
}
```

#### Upload New Media

**Endpoint:** `POST /api/media`

**Request Body:**

```json
{
    "title": "Test Media",
    "description": "Description of Test Media",
    "media_type": "video",
    "file_path": "/path/to/file",
    "uploaded_by": "Test User"
}
```

**Headers:**

```json
{
    "Content-Type": "application/json",
    "Authorization": "Bearer your_jwt_token_here"
}
```

#### Stream Media by ID

**Endpoint:** `GET /api/media/stream/:id`

**Headers:**

```json
{
    "Authorization": "Bearer your_jwt_token_here"
}
```

## Libraries Used

- **Express.js** - Web framework for Node.js
- **Body-Parser** - Middleware to parse incoming request bodies
- **Mongoose** - ODM for MongoDB
- **Bcrypt.js** - Library for password hashing
- **JSON Web Token (JWT)** - Authentication using token-based security
- **Fluent-FFmpeg** & **@ffmpeg-installer/ffmpeg** - FFmpeg utilities for media processing
- **Stream** - Node.js stream utilities
- **Util** - Utility functions for handling asynchronous operations
- **Cluster** - Enables multi-core processing for better performance
- **Nodemon** - Development tool for automatic server restarts
- **Winston** - Logging system for monitoring and debugging

## Setup and Installation

1. Create the project directory and initialize the project:
   ```sh
   mkdir clinikk-tv-backend
   cd clinikk-tv-backend
   npm init -y
   ```
2. Install dependencies:
   ```sh
   npm install express body-parser mongoose bcryptjs jsonwebtoken fluent-ffmpeg @ffmpeg-installer/ffmpeg stream util cluster nodemon winston
   ```
3. Set up the `.env` file with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## Running the Project

To start the server, run:

```sh
npm start
```

Or with nodemon for live reload:

```sh
npm run dev
```



## Automation Testing Procedure

The project includes automated tests for User and Media APIs. These tests ensure that endpoints function correctly and validate the expected behavior.

### Running Tests

To execute the test suite, run the following command:
```sh
npm test
```
This command runs all test files under the `tests/` directory.

### User API Tests
- Tests user registration and login functionality.
- Ensures successful token generation after login.
- Verifies authentication mechanisms.

### Media API Tests
- Tests media upload, retrieval, and streaming.
- Ensures media is correctly stored and processed.
- Validates token authentication for media access.

The test files are located in the `tests/` directory:
- `user.test.js` for user-related tests.
- `media.test.js` for media-related tests.



## Ownership

This project is created by Deepanshu Chauhan
deepanshuchauhan483@gmail.com




