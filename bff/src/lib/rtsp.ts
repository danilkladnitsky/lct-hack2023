const ffmpeg = require('fluent-ffmpeg');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs/promises');

ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');

export class RtspManager {
  ffmpeg: any;

  async getFrame(url: string) {
    const args = [
      'ffmpeg',
      '-loglevel quiet',
      '-rtsp_transport tcp -y',
      '-i',
      `'${url}'`,
      '-f image2pipe -r 10 -q:v 3 -frames 1 -c:v png -vf scale=480:320',
      'static/myFrame.jpg',
      //   saveTo,
    ];

    const cmd = args.join(' ');

    try {
      const { stderr, stdout } = await exec(cmd, { maxBuffer: undefined });

      if (stderr) {
        console.error(stderr, stdout);
        return { isOk: false, message: stderr };
      }

      const contents = await fs.readFile('static/myFrame.jpg', {
        encoding: 'base64',
      });

      return { isOk: true, message: contents };
    } catch (err) {
      console.error(err);
      return { isOk: false, message: err };
    }
  }
}
