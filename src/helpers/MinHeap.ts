export interface NumValue {
  getValue(): number;
  setValue(value: number): void;
}

export default class MinHeap<T extends NumValue> {
  data: T[] = [];
  insert(val: T) {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  bubbleUp(index: number) {
    while (index > 0) {
      // get the parent
      var parent = Math.floor((index + 1) / 2) - 1;

      // if parent is greater than child
      if (this.data[parent].getValue() > this.data[index].getValue()) {
        // swap
        var temp = this.data[parent];
        this.data[parent] = this.data[index];
        this.data[index] = temp;
      }

      index = parent;
    }
  }

  extractMin() {
    var min = this.data[0];

    // set first element to last element
    this.data[0] = this.data.pop();

    // call bubble down
    this.bubbleDown(0);

    return min;
  }

  peak() {
    return this.data[0];
  }

  bubbleDown(index: number) {
    while (true) {
      var child = (index + 1) * 2;
      var sibling = child - 1;
      var toSwap = null;

      // if current is greater than child
      if (
        this.data[child] &&
        this.data[index].getValue() > this.data[child].getValue()
      ) {
        toSwap = child;
      }

      // if sibling is smaller than child, but also smaller than current
      if (
        this.data[sibling] &&
        this.data[index].getValue() > this.data[sibling].getValue() &&
        (!this.data[child] ||
          (this.data[child] &&
            this.data[sibling].getValue() < this.data[child].getValue()))
      ) {
        toSwap = sibling;
      }

      // if we don't need to swap, then break.
      if (toSwap == null) {
        break;
      }

      var temp = this.data[toSwap];
      this.data[toSwap] = this.data[index];
      this.data[index] = temp;

      index = toSwap;
    }
  }

  setValue(item: T, value: number) {
    const index = this.data.findIndex((v) => v === item);
    if (index != -1) {
      this.bubbleUp(index);
      this.extractMin();
      item.setValue(value);
      this.insert(item);
    }
  }
}
