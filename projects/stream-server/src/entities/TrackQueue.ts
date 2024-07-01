import Observable from '@/core/observer/Observable';
import Queue from '@/core/queue/Queue';
import Track from '@/entities/Track';

export type TrackQueueEvent = 'added' | 'removed' | 'lastTrack';

export default class TrackQueue extends Observable<TrackQueueEvent> {
  private readonly trackQueue = new Queue<Track>();

  constructor() {
    super();
  }

  static create() {
    return new TrackQueue();
  }

  actualTrack(): Track | null {
    return this.trackQueue.peek();
  }

  nextTrack(): Track | null {
    if (this.trackQueue.empty()) return null;
    const element = this.trackQueue.dequeue();
    if (!element) return null;
    this.notifyAll('removed');
    if (this.trackQueue.size() === 0) {
      this.notifyAll('lastTrack');
    }
    return element;
  }

  addTrack(track: Track) {
    this.trackQueue.enqueue(track);
    this.notifyAll('added');
  }
}
