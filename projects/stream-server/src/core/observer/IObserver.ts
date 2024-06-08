export default interface IObserver<Event extends string> {
  update(event: Event): void;
}
