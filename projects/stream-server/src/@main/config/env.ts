import 'dotenv/config';
import * as env from 'env-var';

export default {
  STREAM_URL: env.get('STREAM_URL').required().asString(),
};
