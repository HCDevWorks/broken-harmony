import setupApp from '@/main/config/app';
import env from '@/main/config/env';

(async () => {
  const app = await setupApp();

  app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
  });
})();