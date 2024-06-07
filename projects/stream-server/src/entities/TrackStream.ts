import Playlist from '@/entities/Playlist';
import { createReadStream } from 'fs';
import { PassThrough, Readable, Transform, Writable } from 'stream';

export default class TrackStream {
  private audioStream: Transform;
  private audioSource?: Readable;
  private stdin?: Writable;

  constructor(private playlist: Playlist) {
    this.audioStream = new PassThrough();
  }

  static create(playlist: Playlist) {
    return new TrackStream(playlist);
  }

  pipe(stdin: Writable) {
    this.stdin = stdin;
    this.startSource(this.playlist.actualTrack()!.trackSource);
  }

  startSource(source: string) {
    if (!this.stdin) throw new Error('no stdin');
    if (this.audioSource) this.audioSource.destroy();

    this.audioSource = createReadStream(source).on('end', () => {
      this.playlist.nextTrack();
      this.startSource(this.playlist.actualTrack()!.trackSource);
    });
    this.audioSource.pipe(this.audioStream, { end: false });

    this.audioStream.pipe(this.stdin, { end: false });
  }
}
