import Observable from '@/core/observer/Observable';

export type QueueEvents = 'add' | 'remove';

export default class ObservableQueue<
  ElementType,
> extends Observable<QueueEvents> {
  private elements: ElementType[] = [];

  constructor() {
    super();
  }

  enqueue(element: ElementType) {
    this.elements.push(element);
    this.notifyAll('add');
  }

  dequeue(): ElementType | null {
    if (this.empty()) return null;
    const element = this.elements.shift();
    if (!element) return null;
    this.notifyAll('remove');
    return element;
  }

  peek(): ElementType | null {
    if (this.empty()) {
      return null;
    }
    return this.elements[0];
  }

  empty(): boolean {
    return this.elements.length === 0;
  }
}
