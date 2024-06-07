import FFMPEGStreamingService from '@/services/FFMPEGStreamingService';
import { Request, Response } from 'express';

let currentVideoSource = './samples/lofi.gif';
let currentAudioSource = './samples/stomach.mp3';

const ffmpegService = new FFMPEGStreamingService();

function startInitialStreaming() {
  ffmpegService.start(currentVideoSource, currentAudioSource);
}

function changeVideoSource(req: Request, res: Response) {
  const { newVideoSource } = req.body;
  if (newVideoSource) {
    currentVideoSource = newVideoSource;
    ffmpegService.stop();
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
    ffmpegService.stop();
    startInitialStreaming();
    res.send('Audio source changed successfully');
  } else {
    res.status(400).send('New audio source is required');
  }
}

export default { startInitialStreaming, changeVideoSource, changeAudioSource };
