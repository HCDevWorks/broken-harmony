import IStreamingService from '@/services/IStreamingService';
import { Request, Response } from 'express';

export default class StreamingController {
  private currentVideoSource: string = './samples/lofi.gif';
  private currentAudioSource: string = './samples/stomach.mp3';

  constructor(readonly streamingService: IStreamingService) {
    this.setVideo = this.setVideo.bind(this);
    this.setAudio = this.setAudio.bind(this);
  }

  start() {
    this.streamingService.start(
      this.currentVideoSource,
      this.currentAudioSource,
    );
  }

  setVideo(req: Request, res: Response) {
    console.log(this);
    const { newVideoSource } = req.body;
    if (newVideoSource) {
      this.currentVideoSource = newVideoSource;
      this.streamingService.stop();
      this.start();
      res.send('Video source changed successfully');
    } else {
      res.status(400).send('New video source is required');
    }
  }

  setAudio(req: Request, res: Response) {
    const { newAudioSource } = req.body;
    if (newAudioSource) {
      this.currentAudioSource = newAudioSource;
      this.streamingService.stop();
      this.start();
      res.send('Audio source changed successfully');
    } else {
      res.status(400).send('New audio source is required');
    }
  }
}
