import Track from '@/entities/Track';

export default interface ITrackRepository {
  add(track: Track): Promise<boolean>;
}
