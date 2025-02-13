const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const convertToHLS = (inputPath, outputDir) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .output(path.join(outputDir, 'output.m3u8'))
            .addOption('-hls_time', '10')
            .addOption('-hls_list_size', '0')
            .on('end', resolve)
            .on('error', reject)
            .run();
    });
};

module.exports = { convertToHLS };
