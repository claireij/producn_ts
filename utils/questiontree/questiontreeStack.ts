import questiontreeLinkedList from "./questiontreeLinkedList"

class questiontreeStack<T> {
  private stack: questiontreeLinkedList<T>
  private size: number

  constructor() {
    this.stack = new questiontreeLinkedList()
    this.size = 0
  }

  isEmpty() {
    return this.size === 0
  }

  push(value: T) {
    this.stack.addToHead(value)
    this.size++
  }

  peek() {
    if (this.isEmpty()) {
      return null
    } else {
      return this.stack?.head?.data
    }
  }

  pop() {
    if (!this.isEmpty()) {
      const value = this.stack.removeHead()
      this.size--
      return value
    } else {
      return null
    }
  }
}

export default questiontreeStack
