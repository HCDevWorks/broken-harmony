import Logger from '@/helpers/Logger';
import IStreamingService from '@/services/IStreamingService';
import env from '@main/config/env';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

export default class FFMPEGStreamingService implements IStreamingService {
  private ffmpegProcess?: ChildProcessWithoutNullStreams;

  start(
    videoSource: string,
    audioSource: string,
  ): ChildProcessWithoutNullStreams {
    if (!ffmpegPath) throw new Error('Without ffmpeg');

    // prettier-ignore
    this.ffmpegProcess = spawn(ffmpegPath, [
    '-re',
    '-stream_loop', '-1',
    '-i', videoSource,
    '-stream_loop', '-1',
    '-i', audioSource,
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-tune', 'zerolatency',
    '-profile:v', 'high',
    '-bf', '2',
    '-g', '60',
    '-keyint_min', '60',
    '-sc_threshold', '0',
    '-b:v', '4500k',
    '-minrate', '4500k',
    '-maxrate', '4500k',
    '-bufsize', '9000k',
    '-s', '1920x1080',
    '-r', '60',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'flv',
    env.STREAM_URL,
  ]);

    this.ffmpegProcess.stdout.on('data', (data) =>
      Logger.log(`stdout: ${data}`),
    );
    this.ffmpegProcess.stderr.on('data', (data) =>
      Logger.error(`stderr: ${data}`),
    );
    this.ffmpegProcess.on('close', (code) =>
      Logger.log(`ffmpeg process exited with code ${code}`),
    );

    return this.ffmpegProcess;
  }

  stop(): void {
    if (this.ffmpegProcess) {
      this.ffmpegProcess.kill();
    }
  }
}
