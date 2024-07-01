import StreamingController from '@/controllers/StreamingController';
import ConsoleLogger from '@/helpers/ConsoleLogger';
import FFMPEGStreamingService from '@/services/FFMPEGStreamingService';
import PlaylistService from '@/services/PlaylistService';
import env from '@main/config/env';

export const StreamingControllerShared = new StreamingController(
  new FFMPEGStreamingService(new ConsoleLogger()),
  new PlaylistService(env.PLAYLIST_URL),
);
