export default class Reflector {
  constructor (name: string, encoding: string) {
    this.name = name
    this.forwardWiring = Reflector.decodeWiring(encoding)
  }
  public static decodeWiring (encoding: string): number[] {
    const chars = encoding.toUpperCase().split('')
    return chars.map((char) => char.charCodeAt(0) - 65)
  }
  public forward (c: number): number {
    return this.forwardWiring[c]
  }
  protected name: string
  protected forwardWiring: number[]
}

export function createReflector (name: string): Reflector {
  switch (name) {
    case 'A':
      return new Reflector(name, 'ZYXWVUTSRQPONMLKJIHGFEDCBA')
    case 'B':
      return new Reflector(name, 'YRUHQSLDPXNGOKMIEBFZCWVJAT')
    case 'C':
      return new Reflector(name, 'FVPJIAOYEDRZXWGCTKUQSBNMHL')
    default:
      throw new Error(`Unknown reflector "${name}"`)
  }
}
