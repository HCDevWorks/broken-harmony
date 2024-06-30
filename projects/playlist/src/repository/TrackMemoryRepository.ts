import Track from '@/entities/Track';
import ITrackRepository, { TrackDto } from '@/repository/ITrackRepository';
import { randomUUID } from 'crypto';

export default class TrackMemoryRepository implements ITrackRepository {
  private trackList: TrackDto[] = [
    {
      id: 'a',
      source: 'teste',
      listenedAt: new Date(0),
    },
    {
      id: 'b',
      source: 'teste1',
      listenedAt: new Date(0),
    },
    {
      id: 'c',
      source: 'teste2',
      listenedAt: new Date(0),
    },
    {
      id: 'd',
      source: 'teste3',
      listenedAt: new Date(0),
    },
    {
      id: 'e',
      source: 'teste4',
      listenedAt: new Date(0),
    },
    {
      id: 'f',
      source: 'teste5',
      listenedAt: new Date(0),
    },
    {
      id: 'g',
      source: 'teste6',
      listenedAt: new Date(0),
    },
    {
      id: 'h',
      source: 'teste7',
      listenedAt: new Date(0),
    },
    {
      id: 'i',
      source: 'teste8',
      listenedAt: new Date(0),
    },
    {
      id: 'j',
      source: 'teste9',
      listenedAt: new Date(0),
    },
    {
      id: 'k',
      source: 'teste10',
      listenedAt: new Date(0),
    },
  ];

  async add(track: Track): Promise<boolean> {
    this.trackList.push({
      id: randomUUID().toString(),
      source: track.source,
      listenedAt: new Date(0),
    });
    return true;
  }

  async get(): Promise<Array<TrackDto>> {
    return [...this.trackList];
  }

  async getRecentTracks(): Promise<TrackDto[]> {
    return [...this.trackList].sort(
      (a, b) => a.listenedAt.getTime() - b.listenedAt.getTime(),
    );
  }

  async updateListenedAt(trackId: string): Promise<boolean> {
    const track = this.trackList.find((track) => track.id === trackId);
    if (track) {
      track.listenedAt = new Date();
    }
    return true;
  }
}
