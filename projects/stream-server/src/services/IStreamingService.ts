import IObserver from '@/core/IObserver';
import Stream, { StreamEvents } from '@/entities/Stream';
import { ChildProcessWithoutNullStreams } from 'child_process';

export default interface IStreamingService extends IObserver<StreamEvents> {
  start(): ChildProcessWithoutNullStreams;
  stop(): void;
  bind(stream: Stream): void;
}
