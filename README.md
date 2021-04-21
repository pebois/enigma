<a name="enigma"></a>
# Enigma Machine
<a name="enigma-encrypt"></a>
## Encrypt
Basic settings.

```js
var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBABCDEFGHIJKLMNOPQRSTUVWXYZ';
var output = 'BJELRQZVJWARXSNBXORSTNCFMEYHCXTGYJFLINHNXSHIUNTHEORXOPLOVFEKAGADSPNPCMHRVZCYECDAZIHVYGPITMSRZKGGHLSRBLHL';
var machine = new Enigma(['I', 'II', 'III'], 'B', [0, 0, 0], [0, 0, 0]);
assert.ok(output === machine.encrypt(input));
```

Varied rotors.

```js
var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBABCDEFGHIJKLMNOPQRSTUVWXYZ';
var output = 'FOTYBPKLBZQSGZBOPUFYPFUSETWKNQQHVNHLKJZZZKHUBEJLGVUNIOYSDTEZJQHHAOYYZSENTGXNJCHEDFHQUCGCGJBURNSEDZSEPLQP';
var machine = new Enigma(['VII', 'V', 'IV'], 'B', [10, 5, 12], [1, 2, 3]);
assert.ok(output === machine.encrypt(input));
```

Long input.

```js
var input = new Array(500).fill('A').join('');
var output = ('YJKJMFQKPCUOCKTEZQVXYZJWJFROVJMWJVXRCQYFCUVBRELVHRWGPYGCHVLBVJEVTTYVMWKJFOZHLJEXYXRDBEVEHVXKQSBPYZN' +
    'IQDCBGTDDWZQWLHIBQNTYPIEBMNINNGMUPPGLSZCBRJULOLNJSOEDLOBXXGEVTKCOTTLDZPHBUFKLWSFSRKOMXKZELBDJNRUDUCO' +
    'TNCGLIKVKMHHCYDEKFNOECFBWRIEFQQUFXKKGNTSTVHVITVHDFKIJIHOGMDSQUFMZCGGFZMJUKGDNDSNSJKWKENIRQKSUUHJYMIG' +
    'WWNMIESFRCVIBFSOUCLBYEEHMESHSGFDESQZJLTORNFBIFUWIFJTOPVMFQCFCFPYZOJFQRFQZTTTOECTDOOYTGVKEWPSZGHCTQRP' +
    'GZQOVTTOIEGGHEFDOVSUQLLGNOOWGLCLOWSISUGSVIHWCMSIUUSBWQIGWEWRKQFQQRZHMQJNKQTJFDIJYHDFCWTHXUOOCVRCVYOHL');
var machine = new Enigma(['III', 'VI', 'VIII'], 'B', [3, 5, 9], [11, 13, 19]);
assert.ok(output === machine.encrypt(input));
```

<a name="enigma-plug-board"></a>
## Plug board
4 plugs.

```js
var input = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
var output = 'QREBNMCYZELKQOJCGJVIVGLYEMUPCURPVPUMDIWXPPWROOQEGI';
var machine = new Enigma(['I', 'II', 'III'], 'B', [0, 0, 0], [0, 0, 0], 'AC FG JY LW');
assert.ok(output === machine.encrypt(input));
```

6 plugs.

```js
var input = 'WRBHFRROSFHBCHVBENQFAGNYCGCRSTQYAJNROJAKVKXAHGUZHZVKWUTDGMBMSCYQSKABUGRVMIUOWAPKCMHYCRTSDEYTNJLVWNQY';
var output = 'FYTIDQIBHDONUPAUVPNKILDHDJGCWFVMJUFNJSFYZTSPITBURMCJEEAMZAZIJMZAVFCTYTKYORHYDDSXHBLQWPJBMSSWIPSWLENZ';
var machine = new Enigma(['IV', 'VI', 'III'], 'B', [0, 10, 6], [0, 0, 0], 'BM DH RS KN GZ FQ');
assert.ok(output === machine.encrypt(input));
```

10 plugs.

```js
var input = 'RNXYAZUYTFNQFMBOLNYNYBUYPMWJUQSBYRHPOIRKQSIKBKEKEAJUNNVGUQDODVFQZHASHMQIHSQXICTSJNAUVZYIHVBBARPJADRH';
var output = 'CFBJTPYXROYGGVTGBUTEBURBXNUZGGRALBNXIQHVBFWPLZQSCEZWTAWCKKPRSWOGNYXLCOTQAWDRRKBCADTKZGPWSTNYIJGLVIUQ';
var machine = new Enigma(['I', 'II', 'III'], 'B', [0, 1, 20], [5, 5, 4], 'AG HR YT KI FL WE NM SD OP QJ');
assert.ok(output === machine.encrypt(input));
```

<a name="enigma-decrypt"></a>
## Decrypt
Message.

```js
var secret = 'THEONLYWINNINGMOVEISNOTTOPLAY';
var first = new Enigma(['I', 'II', 'III'], 'B', [0, 0, 0], [0, 0, 0]);
var second = new Enigma(['I', 'II', 'III'], 'B', [0, 0, 0], [0, 0, 0]);
assert.ok(second.encrypt(first.encrypt(secret)) === secret);
```

## Notes
* Typescript port of Mike Pound's Enigma Machine

## Resources
1. [Wikipedia](https://en.wikipedia.org/wiki/Enigma_machine)
2. [Project page](https://github.com/mikepound/enigma)
3. [Youtube video](https://www.youtube.com/watch?v=RzWB5jL5RX0)
