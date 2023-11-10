const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');

export class RtspManager {
  ffmpeg: any;

  createStream(url: string) {
    const stream = fs.createWriteStream(__dirname + '/outputfile.png');
      ffmpeg(url)
          .format('image2')
          .outputOptions(['-r 1/5','-update 1'])
      .on('error', function(err) {
        console.log('An error occurred: ' + err.message);
      })
      .on('end', function() {
        console.log('Processing finished !');
      })
      .output(stream, { end: true })

  }
}
