# rollup-plugin-stub

Stub module exports at runtime when bundling with [Rollup](https://github.com/rollup/rollup).

## Install

```
$ npm install --save-dev rollup-plugin-stub
```

## Usage

This plugin is intended to be used only when building for tests where stubs are required. Consider using dependency
injection instead, which is a natural fit both for production code and for tests.

```js
import { rollup } from 'rollup';
import stub from 'rollup-plugin-stub';

rollup({
  entry: 'test/main_test.js',
  plugins: [
    stub()
  ]
}).then(...)
```

Once the `stub` plugin is set up, you will have some extra exports in all the modules built by rollup. For example,
given this module:

```js
// path.js
export function join(...parts) {
  return parts.join(SEP);
}

export const SEP = '/';
```

You'll be able to stub any exports from that module, like so:

```js
// main.js
import { join, stub_SEP } from './path';

console.log(join('a', 'b', 'c')); // 'a/b/c'
stub_SEP('!');
console.log(join('a', 'b', 'c')); // 'a!b!c'
```

In tests you might want to stub a value for one test and reset it afterward. You can do that too:

```js
// test.js
import { join, SEP, stub_SEP, reset_SEP } from './path';
import { strictEqual as eq } from 'assert';

describe('join', () => {
  afterEach(reset_SEP);
  
  it('joins using SEP', () => {
    stub_SEP('&');
    eq(join('a', 'b'), 'a&b');
  });
});
```

## License

MIT
