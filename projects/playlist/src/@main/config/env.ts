import 'dotenv/config';
import * as env from 'env-var';

export default {
  PORT: env.get('PORT').required().asPortNumber(),
  TRACKS_BY_RECOMMENDATION: env
    .get('TRACKS_BY_RECOMMENDATION')
    .required()
    .asIntPositive(),
  MUSIC_FOLDER: env.get('MUSIC_FOLDER').required().asString(),
};
