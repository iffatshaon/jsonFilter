class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
}

class Tree {
  constructor(rootName) {
    this.root = new Node(rootName);
  }

  addChild(parentName, childName) {
    let parent = this.findNode(parentName);
    if (parent) {
      let nodeVar = new Node(childName)
      parent.children.push(nodeVar);
      return nodeVar
    } else {
      console.log(`Parent node not found: ${parentName}`);
    }
  }

  findNode(name, node = this.root) {
    if (node.name === name) {
      return node;
    }
    for (let child of node.children) {
      let foundNode = this.findNode(name, child);
      if (foundNode) {
        return foundNode;
      }
    }
    return null;
  }

  detachNode(name) {
    if (this.root.name === name) {
      return null;
    }

    let parent = this.findParent(name);
    if (parent) {
      let index = parent.children.findIndex(node => node.name === name);
      return parent.children.splice(index, 1)[0];
    } else {
      console.log(`Node not found: ${name}`);
      return null;
    }
  }

  findParent(name, node = this.root) {
    if (node.children.some(child => child.name === name)) {
      return node;
    }
    for (let child of node.children) {
      let parent = this.findParent(name, child);
      if (parent) {
        return parent;
      }
    }
    return null;
  }

  logTree(node = this.root, level = 0) {
    console.log(" ".repeat(level) + node.name);
    node.children.forEach(child => this.logTree(child, level + 1));
  }

  logLevel(level, node = this.root, currentLevel = 0) {
    if (currentLevel === level) {
      console.log(node.name);
    } else {
      node.children.forEach(child => this.logLevel(level, child, currentLevel + 1));
    }
  }
}



const tree = new Tree("A");
tree.addChild("A", "B");
tree.addChild("A", "C");
tree.addChild("B", "D");
tree.addChild("B", "E");
tree.addChild("C", "F");
tree.addChild("C", "G");

tree.logTree();
// let detachedNode = tree.detachNode("C");
// console.log(detachedNode)
// tree.logTree();
tree.logLevel(2)