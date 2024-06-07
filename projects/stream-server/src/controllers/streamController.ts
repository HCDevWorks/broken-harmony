import ffmpegService from '@/services/ffmpegService';
import { Request, Response } from 'express';

let currentVideoSource = './samples/lofi.gif';
let currentAudioSource = './samples/stomach.mp3';

function startInitialStreaming() {
  ffmpegService.startStreaming(
    currentVideoSource,
    currentAudioSource,
    (data) => console.log(`stdout: ${data}`),
    (data) => console.error(`stderr: ${data}`),
    (code) => console.log(`ffmpeg process exited with code ${code}`),
  );
}

function changeVideoSource(req: Request, res: Response) {
  const { newVideoSource } = req.body;
  if (newVideoSource) {
    currentVideoSource = newVideoSource;
    ffmpegService.stopStreaming();
    startInitialStreaming();
    res.send('Video source changed successfully');
  } else {
    res.status(400).send('New video source is required');
  }
}

function changeAudioSource(req: Request, res: Response) {
  const { newAudioSource } = req.body;
  if (newAudioSource) {
    currentAudioSource = newAudioSource;
    ffmpegService.stopStreaming();
    startInitialStreaming();
    res.send('Audio source changed successfully');
  } else {
    res.status(400).send('New audio source is required');
  }
}

export default { startInitialStreaming, changeVideoSource, changeAudioSource };
