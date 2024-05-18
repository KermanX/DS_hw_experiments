import { getOutput, readChar, setInput, writeStr } from "./utils/io"
import { freemem } from "./utils/memory"

interface Node {
  id: string
  left?: Node
  right?: Node
}

function initBiTree(id?: string): Node {
  id ??= readChar()
  const leftId = readChar()
  const left = leftId === '#' || !leftId ? undefined : initBiTree(leftId)
  const rightId = readChar()
  const right = rightId === '#' || !rightId ? undefined : initBiTree(rightId)
  return {
    id,
    left,
    right
  }
}

function preOrderTraverse(tree: Node | undefined, visit: (node: Node) => void) {
  if (tree) {
    visit(tree)
    preOrderTraverse(tree.left, visit)
    preOrderTraverse(tree.right, visit)
  }
}

function inOrderTraverse(tree: Node | undefined, visit: (node: Node) => void) {
  if (tree) {
    inOrderTraverse(tree.left, visit)
    visit(tree)
    inOrderTraverse(tree.right, visit)
  }
}


function postOrderTraverse(tree: Node | undefined, visit: (node: Node) => void) {
  if (tree) {
    postOrderTraverse(tree.left, visit)
    postOrderTraverse(tree.right, visit)
    visit(tree)
  }
}

function getNodeNum(tree: Node | undefined): number {
  return tree ? 1 + getNodeNum(tree.left) + getNodeNum(tree.right) : 0
}

function getLeafNum(tree: Node | undefined): number {
  return tree ? (tree.left || tree.right ? getLeafNum(tree.left) + getLeafNum(tree.right) : 1) : 0
}

function getHeight(tree: Node | undefined): number {
  return tree ? 1 + Math.max(getHeight(tree.left), getHeight(tree.right)) : 0
}

function destoryBiTree(tree: Node | undefined) {
  if (tree) {
    destoryBiTree(tree.left)
    destoryBiTree(tree.right)
    freemem(tree)
  }
}

function printNode(node: Node) {
  writeStr(node.id)
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest
  describe('2_bitree', () => {
    setInput('ABDF##G##E#H##C')
    const tree = initBiTree()

    test('pre-order', () => {
      preOrderTraverse(tree, printNode)
      expect(getOutput()).toBe('ABDFGEHC')
    })

    test('in-order', () => {
      inOrderTraverse(tree, printNode)
      expect(getOutput()).toBe('FDGBEHAC')
    })
    
    test('post-order', () => {
      postOrderTraverse(tree, printNode)
      expect(getOutput()).toBe('FGDHEBCA')
    })

    test('getNodeNum', () => {
      expect(getNodeNum(tree)).toBe(8)
    })

    test('getLeafNum', () => {
      expect(getLeafNum(tree)).toBe(4)
    })

    test('getHeight', () => {
      expect(getHeight(tree)).toBe(4)
    })

    test('destory', () => {
      destoryBiTree(tree)
    })
  })
}
