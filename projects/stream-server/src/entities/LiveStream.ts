import Observable from '@/core/observer/Observable';
import Track from '@/entities/Track';
import TrackStream from '@/entities/TrackStream';
import Video from '@/entities/Video';

export type LiveStreamEvents = 'audio' | 'video';

export default class LiveStream extends Observable<LiveStreamEvents> {
  readonly trackStream: TrackStream;

  constructor(
    private video: Video,
    private actualTrack: Track,
    readonly streamUrl: string,
  ) {
    super();
    this.trackStream = TrackStream.create(this.actualTrack.trackSource);
  }

  static create(videoSource: string, trackSource: string, streamUrl: string) {
    const video = Video.create(videoSource);
    const track = Track.create(trackSource);
    return new LiveStream(video, track, streamUrl);
  }

  getVideoSource() {
    return this.video.videoSource;
  }

  getTrackSource() {
    return this.actualTrack.trackSource;
  }

  setVideo(videoSource: string) {
    const video = Video.create(videoSource);
    this.video = video;
    this.notifyAll('video');
  }

  setTrack(trackSource: string) {
    const track = Track.create(trackSource);
    this.actualTrack = track;
    this.trackStream.startSource(this.actualTrack.trackSource);
  }
}
