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
      VariableDeclaration( path ) {
        if (
          !is(
            path,
            `FunctionDeclaration[id.name=foo] VariableDeclaration[kind=let]`
          )
        ) {
          return
        }
        
        // add your logic
        // ...
      }
    }
  }
}
```

### License

MIT
