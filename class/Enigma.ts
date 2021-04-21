import Plugboard, { createPlugboard } from '@enigma/class/Plugboard'
import Reflector, { createReflector } from '@enigma/class/Reflector'
import Rotor, { createRotor } from '@enigma/class/Rotor'

export default class Enigma {
  constructor (rotors: string[], reflector: string, rotorPositions: number[], ringSettings: number[], plugboardConnections?: string) {
    this.rotors = {
      left: createRotor(rotors[0], rotorPositions[0], ringSettings[0]),
      middle: createRotor(rotors[1], rotorPositions[1], ringSettings[1]),
      right: createRotor(rotors[2], rotorPositions[2], ringSettings[2]),
    }
    this.reflector = createReflector(reflector)
    this.plugboard = createPlugboard(plugboardConnections)
  }
  public rotate (): void {
    if (this.rotors.middle.isAtNotch()) {
      this.rotors.middle.turnover()
      this.rotors.left.turnover()
    }
    else if (this.rotors.right.isAtNotch()) {
      this.rotors.middle.turnover()
    }
    this.rotors.right.turnover()
  }
  public encryptChar (char: number): number {
    this.rotate()
    const c = this.plugboard.forward(char)
    const c1 = this.rotors.right.forward(c)
    const c2 = this.rotors.middle.forward(c1)
    const c3 = this.rotors.left.forward(c2)
    const c4 = this.reflector.forward(c3)
    const c5 = this.rotors.left.backward(c4)
    const c6 = this.rotors.middle.backward(c5)
    const c7 = this.rotors.right.backward(c6)
    const c8 = this.plugboard.forward(c7)
    return c8
  }
  public encrypt (str: string): string {
    const chars = str.toUpperCase().split('')
    const buff = chars.map((char) => String.fromCharCode(this.encryptChar(char.charCodeAt(0) - 65) + 65))
    return buff.join('')
  }
  public rotors: {
    left: Rotor
    middle: Rotor
    right: Rotor
  }
  public reflector: Reflector
  public plugboard: Plugboard
}

export function createMachine (): Enigma {
  return new Enigma(
    [ 'II', 'V', 'III' ],
    'B',
    [ 7, 4, 19 ],
    [ 12, 2, 20 ],
    'AF TV KO BL RW',
  )
}
