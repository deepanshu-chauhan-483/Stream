const express = require('express');
const router = express.Router();
const { getAllMedia, uploadMedia, streamMediaById } = require('../controllers/mediaControllers');
const authMiddleware=require('../middleware/authMiddleware');

// Get all media
router.get('/', getAllMedia);

// Upload new media and convert to HLS
router.post('/', authMiddleware, uploadMedia);

// Stream media by ID
router.get('/stream/:id', streamMediaById);

module.exports = router;
