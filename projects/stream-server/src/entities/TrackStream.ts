import { ReadStream, createReadStream } from 'fs';
import { Writable } from 'stream';

export default class TrackStream {
  private audioStream: ReadStream;

  constructor(source: string) {
    this.audioStream = createReadStream(source);
  }

  static create(source: string) {
    return new TrackStream(source);
  }

  pipe(stdin: Writable) {
    this.audioStream.pipe(stdin);
  }
}
