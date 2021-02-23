/*
 * @LastEditors  : BillySong
 */
// rollup.config.js
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: 'test/test.ts',
    output: {
      file: 'dist/test.js',
      format: 'umd',
      exports: 'none' // 显式指定 output.exports 
    },
    plugins: [
      typescript(),
        json(),
        resolve(),
        commonjs(),
        babel({
          exclude: 'node_modules/**' // 只编译我们的源代码
        })
      ]
  };