'use strict';

module.exports = {
  banner: true,
  format: [ 'es', 'cjs' ],
  plugins: [ 'typescript2' ],

  // TypeScript 2 settings
  'typescript2': {
    clean: true,
    cacheRoot: '.cache/',
    useTsconfigDeclarationDir: true
  }
}
