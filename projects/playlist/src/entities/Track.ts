export default class Track {
  readonly source: string;

  constructor(trackSource: string) {
    if (!trackSource) throw new Error('Invalid track source');
    this.source = trackSource;
  }

  static create(trackSource: string) {
    return new Track(trackSource);
  }
}
