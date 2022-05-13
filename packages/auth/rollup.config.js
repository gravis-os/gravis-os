import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import svgr from '@svgr/rollup'
import url from '@rollup/plugin-url'
import analyze from 'rollup-plugin-analyzer'
import execute from 'rollup-plugin-execute'
import renameNodeModules from 'rollup-plugin-rename-node-modules'

const isWatchMode = process.env.ROLLUP_WATCH === 'true'

// ==============================
// Output
// ==============================
const getOutput = key => {
  return [
    {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ]
}

// ==============================
// Plugins
// ==============================
const plugins = [
  peerDepsExternal(),
  postcss({
    minimize: true,
    modules: false,
    extract: true,
    config: {
      path: './postcss.config.js',
      ctx: null,
    },
  }),
  url(),
  svgr(),
  resolve(),
  commonjs(),
  typescript({ useTsconfigDeclarationDir: true }),
  renameNodeModules('ext'),
  analyze(),
  isWatchMode && execute('npm run yalc'),
]

// Bundle
const getBundleByKey = (key, options = {}) => {
  return {
    input: `src/${key}/index.ts`,
    output: getOutput(key),
    plugins,
    watch: { include: `src/${key}/**` },
    ...options,
  }
}

// Read this: https://levelup.gitconnected.com/code-splitting-for-libraries-bundling-for-npm-with-rollup-1-0-2522c7437697
export default [
  getBundleByKey('ui'),
  getBundleByKey('utils'),
  getBundleByKey('auth'),
  getBundleByKey('storage'),
  getBundleByKey('form'),
]
