import Track from '@/entities/Track';
import ITrackRepository from '@/repository/ITrackRepository';
import { randomUUID } from 'crypto';

interface TrackPersist {
  id: string;
  source: string;
}

export default class TrackMemoryRepository implements ITrackRepository {
  private trackList: TrackPersist[] = [];

  async add(track: Track): Promise<boolean> {
    this.trackList.push({ id: randomUUID().toString(), source: track.source });
    return true;
  }
}
