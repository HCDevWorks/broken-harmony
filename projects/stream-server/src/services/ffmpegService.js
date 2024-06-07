const { spawn } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

let ffmpegProcess;

function startStreaming(videoSource, audioSource, onOutput, onError, onClose) {
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
    'rtmp://a.rtmp.youtube.com/live2/4wdk-7eq7-s3eg-2ga8-00u4'
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

module.exports = { startStreaming, stopStreaming };