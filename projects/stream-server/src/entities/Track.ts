export default class Track {
  readonly trackSource: string;

  constructor(trackSource: string) {
    if (!trackSource) throw new Error('Invalid track source');
    this.trackSource = trackSource;
  }

  static create(trackSource: string) {
    return new Track(trackSource);
  }
}
