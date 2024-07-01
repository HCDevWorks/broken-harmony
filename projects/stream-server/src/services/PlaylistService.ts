import Track from '@/entities/Track';
import axios from 'axios';
import IPlaylistService from './IPlaylistService';

export default class PlaylistService implements IPlaylistService {
  private readonly apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getRecommendations(): Promise<Array<Track>> {
    const response = await axios.get(`${this.apiUrl}/recommendation`);
    const tracks = response.data;

    if (!Array.isArray(tracks)) {
      throw new Error('Invalid response format');
    }

    return tracks.map((trackData: { source: string }) =>
      Track.create(trackData.source),
    );
  }
}
