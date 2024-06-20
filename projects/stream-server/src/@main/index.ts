import setupApp from '@/@main/config/app';
import { StreamingControllerShared } from '@/@main/shared/StreamingControllerShared';
import env from '@main/config/env';

import http from 'node:http';

(async () => {
  const app = await setupApp();
  const server = http.createServer(app);
  server.listen(env.PORT, () => {
    console.log(`Server is running at http://localhost:${env.PORT}`);
    StreamingControllerShared.start();
  });
})();
