const ffmpeg = require('fluent-ffmpeg');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');

export class RtspManager {
  ffmpeg: any;

  async getFrame(
    url: string,
    callbackFn: (isOk: boolean, data: string) => void,
  ) {
    const args = [
      'ffmpeg',
      '-loglevel quiet',
      '-rtsp_transport tcp -y',
      '-i',
      `'${url}'`,
      '-f image2 -r 10 -q:v 3 -frames 1',
      'pipe:1',
      //   saveTo,
    ];

    const cmd = args.join(' ');

    try {
      const { stdout, stderr } = await exec(cmd, { maxBuffer: undefined });

      if (stderr) {
        console.error(stderr);
        return callbackFn?.(false, stderr);
      }

      return callbackFn?.(true, stdout);
    } catch (err) {
      console.error(err);
    }
  }
}
