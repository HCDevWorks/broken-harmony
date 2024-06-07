import streamRoutes from '@/@main/routes/streamRoutes';
import streamController from '@/controllers/streamController';
import cors from 'cors';
import express, { Express } from 'express';

export default async function setupApp(): Promise<Express> {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', streamRoutes);
  streamController.startInitialStreaming();
  return app;
}
