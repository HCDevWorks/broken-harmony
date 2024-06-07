import { StreamingControllerShared } from '@/@main/shared/StreamingControllerShared';
import { Router } from 'express';

export default (router: Router) => {
  router.post('/change-video', StreamingControllerShared.setVideo);
  router.post('/change-audio', StreamingControllerShared.setAudio);
};
