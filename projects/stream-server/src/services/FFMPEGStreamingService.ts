import LiveStream from '@/entities/LiveStream';
import ILogger from '@/helpers/ILogger';
import IStreamingService from '@/services/IStreamingService';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

export default class FFMPEGStreamingService implements IStreamingService {
  private ffmpegProcess?: ChildProcessWithoutNullStreams;
  private stream?: LiveStream;

  constructor(readonly logger: ILogger) {}

  start(): ChildProcessWithoutNullStreams {
    if (!this.stream) throw new Error('No stream');
    if (!ffmpegPath) throw new Error('Without ffmpeg');

    // prettier-ignore
    this.ffmpegProcess = spawn(ffmpegPath, [
    '-re',
    '-stream_loop', '-1',
    '-i', this.stream.getVideoSource(),
    '-f', 'mp3',
    '-i', 'pipe:0',
    '-map', '0:v',
    '-map', '1:a',
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
    '-f', 'tee',
    `[f=flv]${this.stream.streamUrl}|[f=flv]rtmp://localhost:1935/live/`
  ], { stdio: ['pipe', 'pipe', 'pipe'] });

    this.stream.trackStream.pipe(this.ffmpegProcess.stdin, { end: false });

    this.ffmpegProcess.stderr.on('data', (data) =>
      this.logger.error(`stderr: ${data}`),
    );
    this.ffmpegProcess.on('close', (code) =>
      this.logger.log(`ffmpeg process exited with code ${code}`),
    );

    return this.ffmpegProcess;
  }

  stop(): void {
    if (this.ffmpegProcess) {
      this.ffmpegProcess.kill();
    }
  }

  update(): void {
    this.stop();
    this.start();
  }

  bind(stream: LiveStream) {
    this.stream = stream;
  }
}
