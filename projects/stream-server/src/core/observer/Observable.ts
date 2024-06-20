import Observer from '@/core/observer/IObserver';

export default class Observable<Event extends string> {
  private observers: Observer<Event>[] = [];

  subscribe(observer: Observer<Event>): void {
    this.observers.push(observer);
  }
  unsubscribe(observer: Observer<Event>): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  unsubscribeAll(): void {
    this.observers = [];
  }
  notify(observer: Observer<Event>, event: Event): void {
    observer.update(event);
  }
  notifyAll(event: Event): void {
    this.observers.forEach((obs) => this.notify(obs, event));
  }
}
