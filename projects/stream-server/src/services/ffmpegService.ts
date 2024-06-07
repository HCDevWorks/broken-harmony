import env from '@main/config/env';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

let ffmpegProcess: ChildProcessWithoutNullStreams;

function startStreaming(
  videoSource: string,
  audioSource: string,
  onOutput: (log: string) => void,
  onError: (log: string) => void,
  onClose: (log: string) => void,
) {
  if (!ffmpegPath) throw new Error('Without ffmpeg');

  // prettier-ignore
  ffmpegProcess = spawn(ffmpegPath, [
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

  ffmpegProcess.stdout.on('data', onOutput);
  ffmpegProcess.stderr.on('data', onError);
  ffmpegProcess.on('close', onClose);

  return ffmpegProcess;
}

function stopStreaming() {
  if (ffmpegProcess) {
    ffmpegProcess.kill();
  }
}

export default { startStreaming, stopStreaming };
