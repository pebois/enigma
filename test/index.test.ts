import Enigma from '@/class/Enigma'
import { assert } from 'chai'

describe('Enigma', function () {
  describe('Encrypt', function () {
    it('Basic settings', function () {
      const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const output = 'BJELRQZVJWARXSNBXORSTNCFMEYHCXTGYJFLINHNXSHIUNTHEORXOPLOVFEKAGADSPNPCMHRVZCYECDAZIHVYGPITMSRZKGGHLSRBLHL'
      const machine = new Enigma(
        [ 'I', 'II', 'III' ],
        'B',
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
      )
      assert.ok(output === machine.encrypt(input))
    })
    it('Varied rotors', function () {
      const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const output = 'FOTYBPKLBZQSGZBOPUFYPFUSETWKNQQHVNHLKJZZZKHUBEJLGVUNIOYSDTEZJQHHAOYYZSENTGXNJCHEDFHQUCGCGJBURNSEDZSEPLQP'
      const machine = new Enigma(
        [ 'VII', 'V', 'IV' ],
        'B',
        [ 10, 5, 12 ],
        [ 1, 2, 3 ],
      )
      assert.ok(output === machine.encrypt(input))
    })
    it('Long input', function () {
      const input = new Array(500).fill('A').join('')
      const output = (
        'YJKJMFQKPCUOCKTEZQVXYZJWJFROVJMWJVXRCQYFCUVBRELVHRWGPYGCHVLBVJEVTTYVMWKJFOZHLJEXYXRDBEVEHVXKQSBPYZN' +
        'IQDCBGTDDWZQWLHIBQNTYPIEBMNINNGMUPPGLSZCBRJULOLNJSOEDLOBXXGEVTKCOTTLDZPHBUFKLWSFSRKOMXKZELBDJNRUDUCO' +
        'TNCGLIKVKMHHCYDEKFNOECFBWRIEFQQUFXKKGNTSTVHVITVHDFKIJIHOGMDSQUFMZCGGFZMJUKGDNDSNSJKWKENIRQKSUUHJYMIG' +
        'WWNMIESFRCVIBFSOUCLBYEEHMESHSGFDESQZJLTORNFBIFUWIFJTOPVMFQCFCFPYZOJFQRFQZTTTOECTDOOYTGVKEWPSZGHCTQRP' +
        'GZQOVTTOIEGGHEFDOVSUQLLGNOOWGLCLOWSISUGSVIHWCMSIUUSBWQIGWEWRKQFQQRZHMQJNKQTJFDIJYHDFCWTHXUOOCVRCVYOHL'
      )
      const machine = new Enigma(
        [ 'III', 'VI', 'VIII' ],
        'B',
        [ 3, 5, 9 ],
        [ 11, 13, 19 ],
      )
      assert.ok(output === machine.encrypt(input))
    })
  })
  describe('Plug board', function () {
    it('4 plugs', function () {
      const input = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      const output = 'QREBNMCYZELKQOJCGJVIVGLYEMUPCURPVPUMDIWXPPWROOQEGI'
      const machine = new Enigma(
        [ 'I', 'II', 'III' ],
        'B',
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        'AC FG JY LW',
      )
      assert.ok(output === machine.encrypt(input))
    })
    it('6 plugs', function () {
      const input = 'WRBHFRROSFHBCHVBENQFAGNYCGCRSTQYAJNROJAKVKXAHGUZHZVKWUTDGMBMSCYQSKABUGRVMIUOWAPKCMHYCRTSDEYTNJLVWNQY'
      const output = 'FYTIDQIBHDONUPAUVPNKILDHDJGCWFVMJUFNJSFYZTSPITBURMCJEEAMZAZIJMZAVFCTYTKYORHYDDSXHBLQWPJBMSSWIPSWLENZ'
      const machine = new Enigma(
        [ 'IV', 'VI', 'III' ],
        'B',
        [ 0, 10, 6 ],
        [ 0, 0, 0 ],
        'BM DH RS KN GZ FQ',
      )
      assert.ok(output === machine.encrypt(input))
    })
    it('10 plugs', function () {
      const input = 'RNXYAZUYTFNQFMBOLNYNYBUYPMWJUQSBYRHPOIRKQSIKBKEKEAJUNNVGUQDODVFQZHASHMQIHSQXICTSJNAUVZYIHVBBARPJADRH'
      const output = 'CFBJTPYXROYGGVTGBUTEBURBXNUZGGRALBNXIQHVBFWPLZQSCEZWTAWCKKPRSWOGNYXLCOTQAWDRRKBCADTKZGPWSTNYIJGLVIUQ'
      const machine = new Enigma(
        [ 'I', 'II', 'III' ],
        'B',
        [ 0, 1, 20 ],
        [ 5, 5, 4 ],
        'AG HR YT KI FL WE NM SD OP QJ',
      )
      assert.ok(output === machine.encrypt(input))
    })
  })
  describe('Decrypt', function () {
    it('Message', function () {
      const secret = 'THEONLYWINNINGMOVEISNOTTOPLAY'
      const first = new Enigma(
        [ 'I', 'II', 'III' ],
        'B',
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
      )
      const second = new Enigma(
        [ 'I', 'II', 'III' ],
        'B',
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
      )
      assert.ok(second.encrypt(first.encrypt(secret)) === secret)
    })
  })
})
