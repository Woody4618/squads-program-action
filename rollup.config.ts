// See: https://rollupjs.org/introduction/

import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'

const config = {
  input: 'src/index.ts',
  output: {
    esModule: true,
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        __filename: 'import.meta.url',
        __dirname: 'import.meta.url'
      }
    }),
    typescript(),
    nodeResolve({
      preferBuiltins: true,
      exportConditions: ['node']
    }),
    commonjs({
      ignoreDynamicRequires: true
    }),
    json()
  ],
  external: []
}

export default config
