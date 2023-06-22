export default class Rotor {
  constructor (name: string, encoding: string, rotorPosition: number, notchPositions: number[], ringSetting: number) {
    this.name = name
    this.rotorPosition = rotorPosition
    this.notchPositions = notchPositions
    this.ringSetting = ringSetting
    this.forwardWiring = Rotor.decodeWiring(encoding)
    this.backwardWiring = Rotor.inverseWiring(this.forwardWiring)
  }
  public static decodeWiring (encoding: string): number[] {
    const chars = encoding.toUpperCase().split('')
    return chars.map((char) => char.charCodeAt(0) - 65)
  }
  public static inverseWiring (wiring: number[]): number[] {
    const entries = wiring.map((value, index) => [ value, index ])
    return Object.values(Object.fromEntries(entries))
  }
  protected static encipher (k: number, pos: number, ring: number, mapping: number[]): number {
    const shift: number = pos - ring
    return (mapping[(k + shift + 26) % 26] - shift + 26) % 26
  }
  public forward (c: number): number {
    return Rotor.encipher(c, this.rotorPosition, this.ringSetting, this.forwardWiring)
  }
  public backward (c: number): number {
    return Rotor.encipher(c, this.rotorPosition, this.ringSetting, this.backwardWiring)
  }
  public isAtNotch (): boolean {
    return (this.notchPositions.length == 1) ? (
      this.notchPositions[0] == this.rotorPosition
    ) : (
      this.notchPositions[0] == this.rotorPosition ||
      this.notchPositions[1] == this.rotorPosition
    )
  }
  public turnover (): void {
    this.rotorPosition = (this.rotorPosition + 1) % 26
  }
  protected name: string
  protected rotorPosition: number
  protected notchPositions: number[]
  protected ringSetting: number
  protected forwardWiring: number[]
  protected backwardWiring: number[]
}

export function createRotor (name: string, rotorPosition: number, ringSetting: number): Rotor {
  switch (name) {
    case 'I':
      return new Rotor(name, 'EKMFLGDQVZNTOWYHXUSPAIBRCJ', rotorPosition, [ 16 ], ringSetting)
    case 'II':
      return new Rotor(name, 'AJDKSIRUXBLHWTMCQGZNPYFVOE', rotorPosition, [ 4 ], ringSetting)
    case 'III':
      return new Rotor(name, 'BDFHJLCPRTXVZNYEIWGAKMUSQO', rotorPosition, [ 21 ], ringSetting)
    case 'IV':
      return new Rotor(name, 'ESOVPZJAYQUIRHXLNFTGKDCMWB', rotorPosition, [ 9 ], ringSetting)
    case 'V':
      return new Rotor(name, 'VZBRGITYUPSDNHLXAWMJQOFECK', rotorPosition, [ 25 ], ringSetting)
    case 'VI':
      return new Rotor(name, 'JPGVOUMFYQBENHZRDKASXLICTW', rotorPosition, [ 12, 25 ], ringSetting)
    case 'VII':
      return new Rotor(name, 'NZJHGRCXMYSWBOUFAIVLPEKQDT', rotorPosition, [ 12, 25 ], ringSetting)
    case 'VIII':
      return new Rotor(name, 'FKQHTLXOCBJSPDZRAMEWNIUYGV', rotorPosition, [ 12, 25 ], ringSetting)
    default:
      throw new Error(`Unknown rotor "${name}"`)
  }
}
