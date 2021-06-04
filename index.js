const { parse, matches } = require( 'esquery' )
const { VISITOR_KEYS } = require( '@babel/types' )
const QuickLRU = require( 'quick-lru' )

const cache = new QuickLRU( {
  maxSize: 500
} )

const SKIP_ANCESTRY_TYPES = [
  'identifier',
  'compound',
  'not',
  'has',
  'wildcard',
]

function skipAncestry( type ) {
  return SKIP_ANCESTRY_TYPES.includes( type )
}

module.exports = function is( path, selector ) {
  if ( !cache.has( selector ) ) {
    try {
      cache.set( selector, parse( selector ) )
    } catch ( e ) {
      throw new Error( 'Parse selector failed: ' + selector )
    }
  }

  const selectorAST = cache.get( selector )

  let ancestry = []
  
  if ( !skipAncestry( selectorAST.type ) ) {
    ancestry = path.getAncestry().map( path => path.node )
  }

  return matches( path.node, selectorAST, ancestry, {
    visitorKeys: VISITOR_KEYS
  } )
}
