import { Router } from 'express';
import { StreamingControllerShared } from '../shared/StreamingControllerShared';

export default (router: Router) => {
  router.post('/change-video', StreamingControllerShared.setVideo);
  router.post('/change-audio', StreamingControllerShared.setAudio);
};
