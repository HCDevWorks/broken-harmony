export default class Logger {
  static log(message: string): void {
    console.log(message);
  }

  static error(message: string): void {
    console.error(message);
  }
}
