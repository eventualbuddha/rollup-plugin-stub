import babel from 'rollup-plugin-babel';

let pkg = require('./package.json');

export default {
  entry: 'index.js',
  external: Object.keys(pkg.dependencies),
  plugins: [babel()],
  targets: [
    { dest: pkg.module, format: 'es' },
    { dest: pkg.main, format: 'cjs' }
  ]
};
