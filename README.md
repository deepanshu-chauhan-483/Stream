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
- [Middleware Functionality](#middleware-functionality)
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
├── middleware
│   └── authMiddleware.js
├── services
│   ├── ffmpegService.js
│   ├── streamService.js
├── utils
│   ├── logger.js
│   ├── cluster.js
├── app.js
├── config.js
```

## Middleware Functionality

### Authentication Middleware (authMiddleware.js)
The authentication middleware is used to protect routes that require user authentication.

- **Functionality:**
  - Extracts the JWT token from the request headers.
  - Verifies the token using the secret key.
  - Attaches the decoded user information to the request object.
  - If the token is missing or invalid, the request is denied with an appropriate response.

- **Usage:**
  - Applied to protected routes, such as media upload and streaming, to ensure only authenticated users can access them.

```javascript
const jwt = require('jsonwebtoken');
const config = require('../config');

const mediaMiddleware = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, config.secretOrKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = { mediaMiddleware };
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

## Ownership

This project is created by Deepanshu Chauhan
deepanshuchauhan483@gmail.com

