import LiveStream from '@/entities/LiveStream';
import IStreamingService from '@/services/IStreamingService';
import env from '@main/config/env';
import { Request, Response } from 'express';

export default class StreamingController {
  private stream: LiveStream;

  constructor(readonly streamingService: IStreamingService) {
    this.stream = LiveStream.create(
      './samples/lofi.gif',
      './samples/risada.mp3',
      env.STREAM_URL,
    );
    this.stream.subscribe(this.streamingService);
    this.streamingService.bind(this.stream);
    this.setVideo = this.setVideo.bind(this);
    this.setAudio = this.setAudio.bind(this);
  }

  start() {
    this.streamingService.start();
  }

  setVideo(req: Request, res: Response) {
    const { newVideoSource } = req.body;

    try {
      this.stream.setVideo(newVideoSource);
      res.send('Video source changed successfully');
    } catch {
      res.status(400).send('New video source is required');
    }
  }

  setAudio(req: Request, res: Response) {
    const { newAudioSource } = req.body;
    try {
      this.stream.setTrack(newAudioSource);
      res.send('Audio source changed successfully');
    } catch {
      res.status(400).send('New audio source is required');
    }
  }
}
