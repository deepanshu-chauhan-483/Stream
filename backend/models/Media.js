const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    title: String,
    description: String,
    media_type: String,
    url: String,
    upload_date: { type: Date, default: Date.now },
    uploaded_by: String
});

module.exports = mongoose.model('Media', MediaSchema);
