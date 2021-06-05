# babel-is

### Installation

For npm users

```bash
npm i babel-is
```

For yarn users

```bash
yarn add babel-is
```

### Usage

In your babel plugin

```js
const is = require( 'babel-is' )

module.exports = function () {
  return {
    visitor: {
      // matches all `let` variable declarations in `foo` function
      VariableDeclaration( path ) {
        const selector = `FunctionDeclaration[id.name=foo] [kind=let]`

        if ( is( path, selector ) ) {
          // add your logic
          // ...
        }
      }
    }
  }
}
```



### License

MIT
