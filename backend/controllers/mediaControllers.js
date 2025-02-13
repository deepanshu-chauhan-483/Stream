const path = require('path');
const fs = require('fs');
const Media = require('../models/Media');
const { convertToHLS } = require('../services/ffmpegService');
const { streamMedia } = require('../services/streamService');

// Get all media
const getAllMedia = async (req, res) => {
    try {
        const media = await Media.find();
        res.json(media);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching media', error });
    }
};

// Upload new media and convert to HLS
const uploadMedia = async (req, res) => {
    const { title, description, media_type, file_path, uploaded_by } = req.body;
    const outputDir = path.join(__dirname, '../media_output', title);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
        await convertToHLS(file_path, outputDir);
        const newMedia = new Media({
            title,
            description,
            media_type,
            url: path.join(outputDir, 'output.m3u8'),
            uploaded_by
        });
        await newMedia.save();
        res.status(201).json({ message: 'Media uploaded and converted successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error uploading media', error });
    }
};

// Stream media by ID
const streamMediaById = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        await streamMedia(media.url, res);
    } catch (error) {
        res.status(400).json({ message: 'Error streaming media', error });
    }
};

module.exports = { getAllMedia, uploadMedia, streamMediaById };
