import Track from '@/entities/Track';

export default interface IPlaylistService {
  generatePlaylist(): Promise<Track[]>;
}
