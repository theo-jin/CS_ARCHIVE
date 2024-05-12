# 트리와 그래프

```ts
class Node {
  constructor(value) {
    this.left = null;
    this.value = value;
    this.right = null;
  }
}

class Tree {
  contructor() {
    this.root = null;
  }

  setRoot(node) {
    this.root = node;
  }
  getRoot() {
    return this.root;
  }
  makeNode(left, value, right) {
    const node = new Node();
    node.left = left;
    node.value = value;
    node.right = right;
    return node;
  }

  inorder(node) {
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.value);
      this.inorder(node.right);
    }
  }

  preorder(node) {
    if (node != null) {
      console.log(node.value);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  postorder(node) {
    if (node != null) {
      this.preorder(node.left);
      this.preorder(node.right);
      console.log(node.value);
    }
  }
}
```
