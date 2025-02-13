const { pipeline } = require('stream');
const fs = require('fs');
const util = require('util');
const streamPipeline = util.promisify(pipeline);

const streamMedia = async (filePath, res) => {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = res.req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });

        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'application/vnd.apple.mpegurl',
        };

        res.writeHead(206, head);
        await streamPipeline(file, res).catch(() => file.destroy());
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'application/vnd.apple.mpegurl',
        };

        res.writeHead(200, head);
        await streamPipeline(fs.createReadStream(filePath), res);
    }
};

module.exports = { streamMedia };
