import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/cjs/index.min.js',
      format: 'cjs',
      plugins: [terser()]
    },
    {
      file: 'dist/iife/index.min.js',
      format: 'iife',
      name: 'FormatterData',
      plugins: [terser()]
    },
    {
      file: 'dist/amd/index.min.js',
      format: 'amd',
      plugins: [terser()]
    },
    {
      file: 'dist/esm/index.min.js',
      format: 'esm',
      plugins: [terser()]
    },
    {
      file: 'dist/umd/index.min.js',
      format: 'umd',
      name: 'FormatterData',
      plugins: [terser()]
    },
  ],
  plugins: [resolve(), babel()]
};