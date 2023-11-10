const ffmpeg = require('fluent-ffmpeg');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('node:fs');

ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');

export class RtspManager {
  ffmpeg: any;

  async getFrame(url: string, callbackFn: (isOk: boolean, data: any) => void) {
    const args = [
      'ffmpeg',
      // '-loglevel quiet',
      '-rtsp_transport tcp -y',
      '-i',
      `'${url}'`,
      '-f image2pipe -r 10 -q:v 3 -frames 1 -c:v png -vf scale=480:320',
      'static/myFrame.jpg',
      //   saveTo,
    ];

    const cmd = args.join(' ');

    console.log(cmd);

    try {
      const { stderr } = await exec(cmd, { maxBuffer: undefined });

      if (stderr) {
        console.error(stderr);
        return callbackFn?.(false, stderr);
      }

      const contents = await fs.readFile('static/myFrame.jpg', {
        encoding: 'base64',
      });
      return callbackFn?.(true, contents);
    } catch (err) {
      console.error(err);
    }
  }
}
