import Track from '@/entities/Track';

export default interface IPlaylistService {
  getRecommendations(): Promise<Array<Track>>;
}
