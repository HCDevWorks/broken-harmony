export default class Queue<ElementType> {
  private elements: ElementType[] = [];

  enqueue(element: ElementType) {
    this.elements.push(element);
  }

  dequeue(): ElementType | null {
    if (this.empty()) {
      return null;
    }
    return this.elements.shift() ?? null;
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

  size(): number {
    return this.elements.length;
  }
}
