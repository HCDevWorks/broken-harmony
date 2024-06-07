import StreamingController from '@/controllers/StreamingController';
import FFMPEGStreamingService from '@/services/FFMPEGStreamingService';

export const StreamingControllerShared = new StreamingController(
  new FFMPEGStreamingService(),
);
