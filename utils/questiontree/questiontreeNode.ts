class QuestionTreeNode<T> {
  public data: T
  public next: QuestionTreeNode<T> | null

  constructor(data: T) {
    this.data = data
    this.next = null
  }

  setNextNode(node: QuestionTreeNode<T>) {
    if (!(node instanceof QuestionTreeNode)) {
      throw new Error(
        "Next node must be an instance of the QuestionTreeNode class",
      )
    }
    this.next = node
  }

  setNext(data: QuestionTreeNode<T> | null) {
    this.next = data
  }

  getNextNode(): QuestionTreeNode<T> | null {
    return this.next
  }

  getData(): T {
    return this.data
  }
}

export default QuestionTreeNode
