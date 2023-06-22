export default class Plugboard {
  constructor (connections?: string) {
    this.wiring = Plugboard.decodePlugboard(connections)
  }
  public static decodePlugboard (plugboard?: string): number[] {
    const mapping = Plugboard.identityPlugboard()
    if (!plugboard) {
      return mapping
    }
    const pairings = plugboard.toUpperCase().split(' ')
    for (const pair of pairings) {
      const c1 = pair.charCodeAt(0) - 65
      const c2 = pair.charCodeAt(1) - 65
      mapping[c1] = c2
      mapping[c2] = c1
    }
    return mapping
  }
  public static identityPlugboard (): number[] {
    return Array.from(Array(26).keys())
  }
  public forward (c: number): number {
    return this.wiring[c]
  }
  protected wiring: number[]
}

export function createPlugboard (connections?: string): Plugboard {
  return new Plugboard(connections)
}
