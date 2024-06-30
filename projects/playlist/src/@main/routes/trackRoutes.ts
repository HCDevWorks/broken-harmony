import AddTrackController from '@/controllers/AddTrackController';
import TrackMemoryRepository from '@/repository/TrackMemoryRepository';
import { Router } from 'express';

const trackRepository = new TrackMemoryRepository();
const addTrackController = new AddTrackController(trackRepository);

export default (router: Router) => {
  router.post('/track', addTrackController.handle);
};
