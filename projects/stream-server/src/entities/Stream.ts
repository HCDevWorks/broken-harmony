import Observable from '@/core/Observable';
import Track from '@/entities/Track';
import Video from '@/entities/Video';

export type StreamEvents = 'audio' | 'video';

export default class Stream extends Observable<StreamEvents> {
  constructor(
    private video: Video,
    private track: Track,
    readonly streamUrl: string,
  ) {
    super();
  }

  static create(videoSource: string, trackSource: string, streamUrl: string) {
    const video = Video.create(videoSource);
    const track = Track.create(trackSource);
    return new Stream(video, track, streamUrl);
  }

  getVideoSource() {
    return this.video.videoSource;
  }

  getTrackSource() {
    return this.track.trackSource;
  }

  setVideo(videoSource: string) {
    const video = Video.create(videoSource);
    this.video = video;
    this.notifyAll('video');
  }

  setTrack(trackSource: string) {
    const track = Track.create(trackSource);
    this.track = track;
    this.notifyAll('audio');
  }
}
