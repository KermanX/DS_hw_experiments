import { getOutput, readInt, setInput, writeStr } from './utils/io'
import { freemem } from './utils/memory'

interface Polynomial {
  p: number
  e: number
  next?: Polynomial
}

function emptyNode(): Polynomial {
return {
    p: NaN,
    e: NaN,
  }
}

/**
 * @param p 头节点
 * @param m 项数
 */
function createPolynomial(p: Polynomial, m: number) {
  for (let i = 0; i < m; i++) {
    p = p.next = {
      p: readInt(),
      e: readInt()
    }
  }
}

function printPolynomial(p: Polynomial) {
  let first = true
  while (p.next) {
    p = p.next
    writeStr(`${p.p >= 0 && !first ? '+' : ''}${p.p === 1 ? '' : p.p}${p.e ? `x^${p.e}` : ''}`)
    first = false
  }
}

function binaryOpPolynomial(p1: Polynomial, p2: Polynomial, op: (a: number, b: number) => number) {
  const head = emptyNode()
  let p = head
  while (p1.next && p2.next) {
    const np1 = p1.next
    const np2 = p2.next
    if (np1.e === np2.e) {
      const res = op(np1.p, np2.p)
      if (res)
        p = p.next = { p: res, e: np1.e }
      p1 = np1
      p2 = np2
    } else if (np1.e > np2.e) {
      p = p.next = { p: op(np1.p, 0), e: np1.e }
      p1 = np1
    } else {
      p = p.next = { p: op(0, np2.p), e: np2.e }
      p2 = np2
    }
  }
  while (p1.next) {
    p1 = p1.next
    p = p.next = { p: op(p1.p, 0), e: p1.e }
  }
  while (p2.next) {
    p2 = p2.next
    p = p.next = { p: op(0, p2.p), e: p2.e }
  }
  return head
}

function addPolynomial(p1: Polynomial, p2: Polynomial) {
  return binaryOpPolynomial(p1, p2, (a, b) => a + b)
}

function subtractPolynomial(p1: Polynomial, p2: Polynomial) {
  return binaryOpPolynomial(p1, p2, (a, b) => a - b)
}

function destroyPolynomial(p: Polynomial) {
  while(p.next)
    freemem(p = p.next)
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest
  describe('1_poyn', () => {
    const p1 = emptyNode()
    const p2 = emptyNode()

    test('create', () => {
      setInput('3 20 12 15 -9 12 6 4 8 0')
      createPolynomial(p1, 5)
      setInput('5 18 -8 15 9 12 -10 8 -9 4 7 2 -4 0')
      createPolynomial(p2, 7)
    })

    test('print', () => {
      printPolynomial(p1)
      expect(getOutput()).toBe("3x^20+12x^15-9x^12+6x^4+8")
      printPolynomial(p2)
      expect(getOutput()).toBe("5x^18-8x^15+9x^12-10x^8-9x^4+7x^2-4")
    })

    test('add', () => {
      const p = addPolynomial(p1, p2)
      printPolynomial(p)
      expect(getOutput()).toBe("3x^20+5x^18+4x^15-10x^8-3x^4+7x^2+4")
    })

    test('subtract', () => {
      const p = subtractPolynomial(p1, p2)
      printPolynomial(p)
      expect(getOutput()).toBe("3x^20-5x^18+20x^15-18x^12+10x^8+15x^4-7x^2+12")
    })

    test('destroy', () => {
      destroyPolynomial(p1)
      destroyPolynomial(p2)
    })
  })
}
