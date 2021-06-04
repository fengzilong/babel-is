const test = require( 'ava' )
const is = require( '../' )
const { transformSync } = require( '@babel/core' )

function transform( code, plugin ) {
  transformSync( code, {
    filename: './',
    presets: [],
    plugins: [
      [ plugin ],
    ],
  } );
}

test( 'check self', async t => {
  let result = []

  transform( `
    let x = 0

    function foo() {
      let a = 1
    }
    
    function bar() {
      let a = 2
    }
    
    () => {
      const a = 3
    }
  `, function () {
    return {
      visitor: {
        VariableDeclaration( path ) {
          if ( is( path, `[kind=let][declarations.0.id.name=a]` ) ) {
            result.push( path.node.declarations[ 0 ].init.value )
          }
        }
      }
    }
  } )

  t.deepEqual(
    result,
    [
      1,
      2
    ]
  )
} )

test( `check parent`, t => {
  let result = []

  transform( `
    let x = 0

    function foo() {
      const other = 'other'
      let a = 1
    }
    
    function bar() {
      let a = 2
    }
    
    () => {
      const a = 3
    }
  `, function ( t ) {
    return {
      visitor: {
        VariableDeclaration( path ) {
          if ( is( path, `FunctionDeclaration[id.name=foo] VariableDeclaration[kind=let]` ) ) {
            result.push( path.node.declarations[ 0 ].init.value )
          }
        }
      }
    }
  } )

  t.deepEqual(
    result,
    [
      1
    ]
  )
} )
