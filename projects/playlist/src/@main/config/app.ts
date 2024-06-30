import setupRoutes from '@/main/config/routes';
import cors from 'cors';
import express, { Express } from 'express';

export default async function setupApp(): Promise<Express> {
  const app = express();
  app.use(cors());
  app.use(express.json());
  setupRoutes(app);
  return app;
}
