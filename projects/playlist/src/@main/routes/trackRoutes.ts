import AddTrackController from '@/controllers/AddTrackController';
import RecommendationController from '@/controllers/RecommendationController';
import TrackMemoryRepository from '@/repository/TrackMemoryRepository';
import PlaylistService from '@/services/PlaylistService';
import { Router } from 'express';

const trackRepository = new TrackMemoryRepository();
const playlistService = new PlaylistService(trackRepository);
const addTrackController = new AddTrackController(trackRepository);
const recommendationController = new RecommendationController(playlistService);

export default (router: Router) => {
  router.get('/recommendation', recommendationController.handle);
  router.post('/track', addTrackController.handle);
};
