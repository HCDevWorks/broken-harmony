import Track from '@/entities/Track';

export interface TrackDto {
  id: string;
  source: string;
  listenedAt: Date;
}

export default interface ITrackRepository {
  add(track: Track): Promise<boolean>;
  get(): Promise<Array<TrackDto>>;
  getRecentTracks(): Promise<Array<TrackDto>>;
  updateListenedAt(id: string): Promise<boolean>;
  reload(): Promise<boolean>;
}
