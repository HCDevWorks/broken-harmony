import NodeMediaServer from 'node-media-server';
import PathFFMPEG from 'ffmpeg-static';
import { Config } from '@/types';

const config: Config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: './media',
  },
  trans: {
    ffmpeg: PathFFMPEG ?? '',
    tasks: [
      {
        app: 'live',
        vc: 'copy',
        ac: 'copy',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
      },
    ],
  },
};

const nms = new NodeMediaServer(config);
nms.run();
