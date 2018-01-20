export class MinPriorityQueue {
  queue = [];
  indexHashmap = [];

  add(id, value): void {
    this.queue.push({id: id, value: value});

    const index = this.queue.length - 1;
    this.indexHashmap[id] = index;

    this.sortUpwards(index);
  }

  extractMin(): string {
    const root = this.queue[0];
    this.indexHashmap[root.id] = undefined;

    const lastElement = this.queue[this.queue.length - 1];
    this.indexHashmap[lastElement.id] = 0;

    this.queue[0] = lastElement;
    this.queue.pop();

    const index = 0;
    this.sortDownwards(index);

    return root.id;
  }

  updatePriority(id, newValue): void {
    const index = this.indexHashmap[id];
    const originalValue = this.queue[index].value;

    this.queue[index].value = newValue;

    if (newValue < originalValue) {
      this.sortUpwards(index);
    } else if (newValue > originalValue) {
      this.sortDownwards(index);
    }
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  inQueue(id): boolean {
    return this.indexHashmap[id] !== undefined;
  }

  sortDownwards(index): void {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestChildIndex;

    if (!this.queue[leftChildIndex] && !this.queue[rightChildIndex]) {
      return;
    } else if (!this.queue[leftChildIndex]) {
      smallestChildIndex = rightChildIndex;
    } else if (!this.queue[rightChildIndex]) {
      smallestChildIndex = leftChildIndex;
    } else {
      smallestChildIndex = this.queue[leftChildIndex].value < this.queue[rightChildIndex].value ? leftChildIndex : rightChildIndex;
    }

    if (this.queue[smallestChildIndex].value < this.queue[index].value) {
      this.swap(index, smallestChildIndex);
      this.sortDownwards(smallestChildIndex);
    }
  }

  sortUpwards(index): void {
    if (index === 0) {
      return;
    }

    const parent = Math.floor((index - 1) / 2);

    if (this.queue[index].value < this.queue[parent].value) {
      this.swap(parent, index);
      this.sortUpwards(parent);
    }
  }

  swap(i, j): void {
    this.indexHashmap[this.queue[i].id] = j;
    this.indexHashmap[this.queue[j].id] = i;

    const temp = this.queue[i];

    this.queue[i] = this.queue[j];
    this.queue[j] = temp;
  }
}
