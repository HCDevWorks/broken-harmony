import Track from '@/entities/Track';
import env from '@/main/config/env';
import ITrackRepository, { TrackDto } from '@/repository/ITrackRepository';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

export default class TrackMemoryRepository implements ITrackRepository {
  constructor() {
    this.loadTracksFromFolder(env.MUSIC_FOLDER);
  }

  private trackList: TrackDto[] = [];

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

  async reload(): Promise<boolean> {
    await this.loadTracksFromFolder(env.MUSIC_FOLDER);
    return true;
  }

  private async loadTracksFromFolder(folderPath: string): Promise<void> {
    if (!fs.existsSync(folderPath)) {
      console.error(`Pasta não encontrada: ${folderPath}`);
      return;
    }

    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
      const trackSource = path.join(folderPath, file);
      const track = Track.create(trackSource);
      this.add(track);
    });

    console.log(`Carregadas ${files.length} tracks da pasta: ${folderPath}`);
  }
}
