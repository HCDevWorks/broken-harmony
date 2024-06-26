import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

export default function setupRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);
  readdirSync(join(__dirname, '../routes')).map(async (file) => {
    if (!file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router);
    }
  });
}
