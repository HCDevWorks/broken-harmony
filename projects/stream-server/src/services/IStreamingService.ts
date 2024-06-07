import IObserver from '@/core/IObserver';
import LiveStream, { LiveStreamEvents } from '@/entities/LiveStream';
import { ChildProcessWithoutNullStreams } from 'child_process';

export default interface IStreamingService extends IObserver<LiveStreamEvents> {
  start(): ChildProcessWithoutNullStreams;
  stop(): void;
  bind(stream: LiveStream): void;
}
