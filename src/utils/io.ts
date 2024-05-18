let inputIndex = 0
let inputBuffer = ''

function readWord(delimiters = ' \n\t') {
  let result = ''
  while (inputIndex < inputBuffer.length && !delimiters.includes(inputBuffer[inputIndex])) {
    result += inputBuffer[inputIndex]
    inputIndex++
  }
  while (inputIndex < inputBuffer.length && delimiters.includes(inputBuffer[inputIndex])) {
    inputIndex++
  }
  return result
}

export function readLine() {
  return readWord('\n')
}

export function readStr() {
  return readWord()
}

export function readInt() {
  return parseInt(readWord())
}

export function readFloat() {
  return parseFloat(readWord())
}

export function readChar() {
  return inputBuffer[inputIndex++] ?? ''
}

export function setInput(newInput: string) {
  inputIndex = 0
  inputBuffer = newInput
}

let outputBuffer = ''

export function writeStr(...args: any[]) {
  outputBuffer += args.join(' ')
}

export function writeLine(...args: any[]) {
  outputBuffer += outputBuffer.length === 0 ? args.join(' ') : '\n' + args.join(' ')
}

export function getOutput() {
  const result = outputBuffer
  outputBuffer = ''
  return result
}
