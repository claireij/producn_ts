import QuestionTreeNode from "./questiontreeNode"

class QuestionTreeLinkedList<T> {
  public head: QuestionTreeNode<T> | null

  constructor() {
    this.head = null
  }

  addToHead(data: T): void {
    const newHead = new QuestionTreeNode(data)
    const currentHead = this.head
    this.head = newHead
    if (currentHead) {
      this.head.setNextNode(currentHead)
    }
  }

  addToTail(data: T): void {
    const newTail = new QuestionTreeNode(data)
    if (!this.head) {
      this.head = newTail
    } else {
      let tail = this.head
      while (tail.getNextNode() !== null) {
        tail = tail.getNextNode()
      }
      tail.setNextNode(newTail)
    }
  }

  removeHead(): T | null {
    const removedHead = this.head
    if (!removedHead) {
      return null
    }
    this.head = removedHead.getNextNode()
    return removedHead.getData()
  }

  findNodeIteratively(data: T): QuestionTreeNode<T> | null {
    let currentNode = this.head
    while (currentNode !== null) {
      if (currentNode.getData() === data) {
        return currentNode
      }
      currentNode = currentNode.getNextNode()
    }
    return null
  }

  findNodeRecursively(
    data: T,
    currentNode: QuestionTreeNode<T> | null = this.head,
  ): QuestionTreeNode<T> | null {
    if (currentNode === null) {
      return null
    } else if (currentNode.getData() === data) {
      return currentNode
    } else {
      return this.findNodeRecursively(data, currentNode.getNextNode())
    }
  }
}

export default QuestionTreeLinkedList
