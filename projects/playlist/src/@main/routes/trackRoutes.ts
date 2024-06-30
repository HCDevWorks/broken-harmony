import AddTrackController from '@/controllers/AddTrackController';
import RecommendationController from '@/controllers/RecommendationController';
import TrackMemoryRepository from '@/repository/TrackMemoryRepository';
import { Router } from 'express';

const trackRepository = new TrackMemoryRepository();
const addTrackController = new AddTrackController(trackRepository);
const recommendationController = new RecommendationController(trackRepository);

export default (router: Router) => {
  router.get('/recommendation', recommendationController.handle);
  router.post('/track', addTrackController.handle);
};
