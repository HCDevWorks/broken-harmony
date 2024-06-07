import Queue from '@/core/queue/Queue';
import Track from '@/entities/Track';

export default class Playlist extends Queue<Track> {
  private _actualTrack: Track | null = null;

  constructor(actualTrack: Track) {
    super();
    this._actualTrack = actualTrack;
  }

  static create(track: Track) {
    const playlist = new Playlist(track);
    return playlist;
  }

  actualTrack(): Track | null {
    return this._actualTrack;
  }

  nextTrack(): Track | null {
    if (this.empty()) return null;
    this._actualTrack = this.dequeue();
    return this._actualTrack;
  }
}
