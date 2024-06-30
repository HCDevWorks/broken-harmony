import Track from '@/entities/Track';

export interface TrackDto {
  id: string;
  source: string;
}

export default interface ITrackRepository {
  add(track: Track): Promise<boolean>;
  get(): Promise<Array<TrackDto>>;
}
