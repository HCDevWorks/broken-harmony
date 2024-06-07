export default class Video {
  readonly videoSource: string;

  constructor(videoSource: string) {
    if (!videoSource) throw new Error('Invalid video source');
    this.videoSource = videoSource;
  }

  static create(videoSource: string) {
    return new Video(videoSource);
  }
}
