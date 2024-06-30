import IObserver from '@/core/observer/IObserver';
import { QueueEvents } from '@/core/queue/ObservableQueue';
import Playlist from '@/entities/TrackQueue';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import Track from './Track';

export default class TrackQueueStream
  extends Readable
  implements IObserver<QueueEvents>
{
  private currentTrackStream: Readable | null = null;
  private isReading: boolean = true;

  constructor(private playlist: Playlist) {
    super();
    this.playlist.subscribe(this);
  }

  static create(playlist: Playlist) {
    return new TrackQueueStream(playlist);
  }

  _read() {
    if (this.currentTrackStream === null) {
      const track = this.playlist.nextTrack();
      if (track !== null) {
        this.currentTrackStream = createReadStream(track.trackSource);
        this.currentTrackStream.on('data', (chunk) => {
          if (!this.push(chunk)) {
            this.currentTrackStream!.pause();
          }
        });
        this.currentTrackStream.on('end', () => {
          this.currentTrackStream = null;
          this._read();
        });
      } else {
        this.isReading = false;
        this.playlist.enqueue(Track.create('./samples/silence.mp3'));
      }
    } else {
      this.isReading = true;
      this.currentTrackStream.resume();
    }
  }

  update(event: QueueEvents): void {
    if (event === 'add' && !this.isReading) {
      this._read();
    }
  }
}
