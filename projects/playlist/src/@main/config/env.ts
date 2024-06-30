import 'dotenv/config';
import * as env from 'env-var';

export default {
  PORT: env.get('PORT').required().asPortNumber(),
};
