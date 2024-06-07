import { ChildProcessWithoutNullStreams } from 'child_process';

export default interface IStreamingService {
  start(
    videoSource: string,
    audioSource: string,
  ): ChildProcessWithoutNullStreams;
  stop(): void;
}
