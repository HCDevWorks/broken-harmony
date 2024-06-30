import AddTrackController from '@/controllers/AddTrackController';
import { Router } from 'express';

const addTrackController = new AddTrackController();

export default (router: Router) => {
  router.post('/track', addTrackController.handle);
};
