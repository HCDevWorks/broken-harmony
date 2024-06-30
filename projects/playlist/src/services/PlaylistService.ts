import env from '@/main/config/env';
import ITrackRepository, { TrackDto } from '@/repository/ITrackRepository';
import IPlaylistService from '@/services/IPlaylistService';

export default class PlaylistService implements IPlaylistService {
  constructor(private readonly trackRepository: ITrackRepository) {}

  async generatePlaylist(): Promise<TrackDto[]> {
    const recentTracks = await this.trackRepository.getRecentTracks();

    const recommendedTracks: TrackDto[] = [];

    for (const track of recentTracks) {
      if (!recommendedTracks.find((t) => t.source === track.source)) {
        recommendedTracks.push(track);
        await this.trackRepository.updateListenedAt(track.id);

        if (recommendedTracks.length >= env.TRACKS_BY_RECOMMENDATION) break;
      }
    }

    return recommendedTracks;
  }
}
