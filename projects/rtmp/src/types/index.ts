export interface Config {
  logType?: number;
  rtmp?: RtmpConfig;
  http?: HttpConfig;
  https?: SslConfig;
  trans?: TransConfig;
  relay?: RelayConfig;
  fission?: FissionConfig;
  auth?: AuthConfig;
}

export interface RtmpConfig {
  port?: number;
  ssl?: SslConfig;
  chunk_size?: number;
  gop_cache?: boolean;
  ping?: number;
  ping_timeout?: number;
}

export interface SslConfig {
  key: string;
  cert: string;
  port?: number;
}

export interface HttpConfig {
  mediaroot: string;
  port?: number;
  allow_origin?: string;
}

export interface AuthConfig {
  play?: boolean;
  publish?: boolean;
  secret?: string;
}

export interface TransConfig {
  ffmpeg: string;
  tasks: TransTaskConfig[];
}

export interface RelayConfig {
  tasks: RelayTaskConfig[];
  ffmpeg: string;
}

export interface FissionConfig {
  ffmpeg: string;
  tasks: FissionTaskConfig[];
}

export interface TransTaskConfig {
  app: string;
  hls?: boolean;
  hlsFlags?: string;
  dash?: boolean;
  dashFlags?: string;
  vc?: string;
  vcParam?: string[];
  ac?: string;
  acParam?: string[];
  rtmp?: boolean;
  rtmpApp?: string;
  mp4?: boolean;
  mp4Flags?: string;
}

export interface RelayTaskConfig {
  app: string;
  name?: string;
  mode: string;
  edge: string;
  rtsp_transport?: string;
  appendName?: boolean;
}

export interface FissionTaskConfig {
  rule: string;
  model: FissionTaskModel[];
}

export interface FissionTaskModel {
  ab: string;
  vb: string;
  vs: string;
  vf: string;
}
