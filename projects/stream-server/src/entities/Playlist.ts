import ObservableQueue from '@/core/queue/ObservableQueue';
import Track from '@/entities/Track';

export default class Playlist extends ObservableQueue<Track> {
  constructor() {
    super();
  }

  static create() {
    return new Playlist();
  }

  actualTrack(): Track | null {
    return this.peek();
  }

  nextTrack(): Track | null {
    return this.dequeue();
  }
}
