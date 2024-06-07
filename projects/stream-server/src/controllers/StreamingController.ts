import Stream from '@/entities/Stream';
import IStreamingService from '@/services/IStreamingService';
import env from '@main/config/env';
import { Request, Response } from 'express';

export default class StreamingController {
  private stream: Stream;

  constructor(readonly streamingService: IStreamingService) {
    this.stream = Stream.create(
      './samples/lofi.gif',
      './samples/stomach.mp3',
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
    if (newVideoSource) {
      this.stream.setVideo(newVideoSource);
      res.send('Video source changed successfully');
    } else {
      res.status(400).send('New video source is required');
    }
  }

  setAudio(req: Request, res: Response) {
    const { newAudioSource } = req.body;
    if (newAudioSource) {
      this.stream.setTrack(newAudioSource);
      res.send('Audio source changed successfully');
    } else {
      res.status(400).send('New audio source is required');
    }
  }
}
