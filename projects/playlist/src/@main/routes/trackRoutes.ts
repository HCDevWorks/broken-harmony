import AddTrackController from '@/controllers/AddTrackController';
import RecommendationController from '@/controllers/RecommendationController';
import ReloadTrackRepository from '@/controllers/ReloadTrackRepository';
import env from '@/main/config/env';
import TrackMemoryRepository from '@/repository/TrackMemoryRepository';
import PlaylistService from '@/services/PlaylistService';
import { Router } from 'express';

const trackRepository = new TrackMemoryRepository(env.MUSIC_FOLDER);
const playlistService = new PlaylistService(trackRepository);
const addTrackController = new AddTrackController(trackRepository);
const reloadTrackRepository = new ReloadTrackRepository(trackRepository);
const recommendationController = new RecommendationController(playlistService);

export default (router: Router) => {
  router.get('/recommendation', recommendationController.handle);
  router.post('/reload', reloadTrackRepository.handle);
  router.post('/track', addTrackController.handle);
};
