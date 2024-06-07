import { createReadStream } from 'fs';
import { PassThrough, Readable, Transform, Writable } from 'stream';

export default class TrackStream {
  private audioStream: Transform;
  private audioSource?: Readable;
  private stdin?: Writable;

  constructor(private source: string) {
    this.audioStream = new PassThrough();
  }

  static create(source: string) {
    return new TrackStream(source);
  }

  pipe(stdin: Writable) {
    this.stdin = stdin;
    this.startSource(this.source);
  }

  startSource(source: string) {
    if (!this.stdin) throw new Error('no stdin');
    if (this.audioSource) this.audioSource.destroy();

    this.audioSource = createReadStream(source).on('end', () => {
      this.startSource('./samples/music.mp3');
    });
    this.audioSource.pipe(this.audioStream, { end: false });

    this.audioStream.pipe(this.stdin, { end: false });
  }
}
