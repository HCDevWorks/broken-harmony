import StreamingController from '@/controllers/StreamingController';
import ConsoleLogger from '@/helpers/ConsoleLogger';
import FFMPEGStreamingService from '@/services/FFMPEGStreamingService';

export const StreamingControllerShared = new StreamingController(
  new FFMPEGStreamingService(new ConsoleLogger()),
);
