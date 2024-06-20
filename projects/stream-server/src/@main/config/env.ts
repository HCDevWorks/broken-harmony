import 'dotenv/config';
import * as env from 'env-var';

export default {
  PORT: env.get('PORT').required().asPortNumber(),
  STREAM_URL: env.get('STREAM_URL').required().asString(),
};
