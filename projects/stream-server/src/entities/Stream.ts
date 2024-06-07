import Observable from '@/core/Observable';

export type StreamEvents = 'audio' | 'video';

export default class Stream extends Observable<StreamEvents> {
  constructor(
    private video: string,
    private track: string,
    readonly streamUrl: string,
  ) {
    super();
  }

  static create(video: string, track: string, streamUrl: string) {
    return new Stream(video, track, streamUrl);
  }

  getVideo() {
    return this.video;
  }

  getTrack() {
    return this.track;
  }

  setVideo(video: string) {
    this.video = video;
    this.notifyAll('video');
  }

  setTrack(track: string) {
    this.track = track;
    this.notifyAll('audio');
  }
}
