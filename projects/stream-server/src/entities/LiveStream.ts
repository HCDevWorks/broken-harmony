import Observable from '@/core/observer/Observable';
import Playlist from '@/entities/Playlist';
import Track from '@/entities/Track';
import TrackStream from '@/entities/TrackStream';
import Video from '@/entities/Video';

export type LiveStreamEvents = 'audio' | 'video';

export default class LiveStream extends Observable<LiveStreamEvents> {
  readonly trackStream: TrackStream;

  constructor(
    private video: Video,
    private playlist: Playlist,
    readonly streamUrl: string,
  ) {
    super();
    this.trackStream = TrackStream.create(this.playlist);
  }

  static create(videoSource: string, trackSource: string, streamUrl: string) {
    const video = Video.create(videoSource);
    const track = Track.create(trackSource);
    const playlist = Playlist.create(track);
    return new LiveStream(video, playlist, streamUrl);
  }

  getVideoSource() {
    return this.video.videoSource;
  }

  getTrackSource() {
    return this.playlist.actualTrack()!.trackSource;
  }

  setVideo(videoSource: string) {
    const video = Video.create(videoSource);
    this.video = video;
    this.notifyAll('video');
  }

  addTrack(trackSource: string) {
    const track = Track.create(trackSource);
    this.playlist.enqueue(track);
  }
}
