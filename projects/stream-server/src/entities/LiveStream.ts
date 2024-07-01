import IObserver from '@/core/observer/IObserver';
import Observable from '@/core/observer/Observable';
import Track from '@/entities/Track';
import TrackQueue, { TrackQueueEvent } from '@/entities/TrackQueue';
import TrackQueueStream from '@/entities/TrackQueueStream';
import Video from '@/entities/Video';
import IPlaylistService from '@/services/IPlaylistService';

export type LiveStreamEvents = 'audio' | 'video';

export default class LiveStream
  extends Observable<LiveStreamEvents>
  implements IObserver<TrackQueueEvent>
{
  readonly trackStream: TrackQueueStream;

  constructor(
    private video: Video,
    private readonly trackQueue: TrackQueue,
    readonly streamUrl: string,
    private readonly playlistService: IPlaylistService,
  ) {
    super();
    this.trackQueue.subscribe(this);
    this.trackStream = TrackQueueStream.create(this.trackQueue);
    this.init();
  }

  async init() {
    const initialTracks = await this.playlistService.getRecommendations();
    this.addPlaylist(initialTracks);
  }

  static create(
    videoSource: string,
    streamUrl: string,
    playlistService: IPlaylistService,
  ) {
    const video = Video.create(videoSource);
    const trackQueue = TrackQueue.create();
    return new LiveStream(video, trackQueue, streamUrl, playlistService);
  }

  getVideoSource() {
    return this.video.videoSource;
  }

  getTrackSource() {
    return this.trackQueue.actualTrack()!.trackSource;
  }

  setVideo(videoSource: string) {
    const video = Video.create(videoSource);
    this.video = video;
    this.notifyAll('video');
  }

  addTrack(trackSource: string) {
    const track = Track.create(trackSource);
    this.trackQueue.addTrack(track);
  }

  private addPlaylist(tracks: Array<Track>) {
    tracks.forEach((track) => this.trackQueue.addTrack(track));
  }

  update(event: TrackQueueEvent): void {
    if (event === 'lastTrack') console.log('last');
  }
}
