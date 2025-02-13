const express = require('express');
const router = express.Router();
const { getAllMedia, uploadMedia, streamMediaById } = require('../controllers/mediaControllers');

// Get all media
router.get('/', getAllMedia);

// Upload new media and convert to HLS
router.post('/', uploadMedia);

// Stream media by ID
router.get('/stream/:id', streamMediaById);

module.exports = router;
