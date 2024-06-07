import Observable from '@/core/Observable';
import Video from '@/entities/Video';

export type StreamEvents = 'audio' | 'video';

export default class Stream extends Observable<StreamEvents> {
  constructor(
    private video: Video,
    private track: string,
    readonly streamUrl: string,
  ) {
    super();
  }

  static create(videoSource: string, trackSource: string, streamUrl: string) {
    const video = Video.create(videoSource);
    return new Stream(video, trackSource, streamUrl);
  }

  getVideo() {
    return this.video.videoSource;
  }

  getTrack() {
    return this.track;
  }

  setVideo(videoSource: string) {
    const video = Video.create(videoSource);
    this.video = video;
    this.notifyAll('video');
  }

  setTrack(track: string) {
    this.track = track;
    this.notifyAll('audio');
  }
}
