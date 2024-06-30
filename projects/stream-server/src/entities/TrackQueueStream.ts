import IObserver from '@/core/observer/IObserver';
import TrackQueue, { TrackQueueEvent } from '@/entities/TrackQueue';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import Track from './Track';

export default class TrackQueueStream
  extends Readable
  implements IObserver<TrackQueueEvent>
{
  private currentTrackStream: Readable | null = null;
  private isReading: boolean = true;

  constructor(private trackQueue: TrackQueue) {
    super();
    this.trackQueue.subscribe(this);
  }

  static create(playlist: TrackQueue) {
    return new TrackQueueStream(playlist);
  }

  _read() {
    if (this.currentTrackStream === null) {
      const track = this.trackQueue.nextTrack();
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
        this.trackQueue.addTrack(Track.create('./samples/silence.mp3'));
      }
    } else {
      this.isReading = true;
      this.currentTrackStream.resume();
    }
  }

  update(event: TrackQueueEvent): void {
    if (event === 'added' && !this.isReading) {
      this._read();
    }
  }
}
