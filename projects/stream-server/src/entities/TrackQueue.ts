import ObservableQueue from '@/core/queue/ObservableQueue';
import Track from '@/entities/Track';

export default class TrackQueue extends ObservableQueue<Track> {
  constructor() {
    super();
  }

  static create() {
    return new TrackQueue();
  }

  actualTrack(): Track | null {
    return this.peek();
  }

  nextTrack(): Track | null {
    return this.dequeue();
  }
}
