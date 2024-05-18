
interface Stack<T> {
  data: T[]
  top: number
}

function initStack<T>(size: number): Stack<T> {
  return {
    data: new Array(size),
    top: -1
  }
}

function destoryStack<T>(stack: Stack<T>) {
  stack.data.length = 0
}

function isStackEmpty<T>(stack: Stack<T>): boolean {
  return stack.top === -1
}

function pushStack<T>(stack: Stack<T>, value: T) {
  stack.data[++stack.top] = value
}

function popStack<T>(stack: Stack<T>): T {
  return stack.data[stack.top--]
}

function getTop<T>(stack: Stack<T>): T {
  return stack.data[stack.top]
}

function traverseStack<T>(stack: Stack<T>, visit: (value: T) => void) {
  for (let i = 0; i <= stack.top; i++) {
    visit(stack.data[i])
  }
}

function checkParentheses(str: string) {
  const stack = initStack<string>(str.length)
  for (const c of str) {
    if ('([{'.includes(c)) {
      pushStack(stack, c)
    }
    else if (c === ')') {
      if (popStack(stack) !== '(')
        return false
    }
    else if (c === ']') {
      if (popStack(stack) !== '[')
        return false
    }
    else if (c === '}') {
      if (popStack(stack) !== '{')
        return false
    }
  }
  return isStackEmpty(stack)
}

function calcRevPolish(expr: string) {
  const stack = initStack<number>(expr.length)
  for (const c of expr) {
    if (/\d/.test(c)) {
      pushStack(stack, +c)
    }
    else {
      const rhs = popStack(stack)
      const lhs = popStack(stack)
      const res = c === '+' ? lhs + rhs
        : c === '-' ? lhs - rhs
          : c === '*' ? lhs * rhs
            : c === '/' ? lhs / rhs
              : NaN
      pushStack(stack, res)
    }
  }
  return getTop(stack)
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest
  describe('4_stack', () => {
    test('checkParentheses', () => {
      expect(checkParentheses('[(as{asd}){}[()]{}{}]')).toBeTruthy()
      expect(checkParentheses('[[aa[[[{as[][][]()aaa[]}]]]]]')).toBeTruthy()
      expect(checkParentheses('[111](()222)]')).toBeFalsy()
      expect(checkParentheses('{}{}{}([)]')).toBeFalsy()
    })

    test('calcRevPolish', () => {
      expect(calcRevPolish('347*+')).toBe(31)
      expect(calcRevPolish('538*2/+')).toBe(17)
    })
  })
}
