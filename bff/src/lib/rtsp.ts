const ffmpeg = require('fluent-ffmpeg');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');

export class RtspManager {
  ffmpeg: any;

  async getFrame(url: string, cameraName: string) {
    const filePath = path.join(__dirname + `../../../static/${cameraName}.jpg`);

    console.log(filePath);

    const args = [
      'ffmpeg',
      '-rtsp_transport tcp -y',
      '-i',
      `'${url}'`,
      '-f image2pipe -r 10 -q:v 3 -frames 1 -c:v png -vf scale=480:320',
      filePath,
      //   saveTo,
    ];

    const cmd = args.join(' ');

    try {
      await exec(cmd, { maxBuffer: undefined });

      const hasFile = await fs.existsSync(filePath);

      if (hasFile) {
        const contents = await fs.promises.readFile(filePath, {
          encoding: 'base64',
        });

        return { isOk: true, message: contents };
      } else {
        return { isOk: false, message: 'no file' };
      }
    } catch (err) {
      console.error(err);
      return { isOk: false, message: err };
    }
  }
}
