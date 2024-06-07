import streamController from '@/controllers/streamController';
import { Router } from 'express';

export default (router: Router) => {
  router.post('/change-video', streamController.changeVideoSource);
  router.post('/change-audio', streamController.changeAudioSource);
};
