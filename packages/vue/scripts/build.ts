import { BuildTaskConfig, TASK_NAME, runTask, commonOutput, css, analyze, declarationTask, camelize } from 'internal'
import { createBundle } from 'no-bump'
import fs from 'fs-extra'
import { swc } from 'rollup-plugin-swc3'
import jsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { parlletlGeneratorFullBundle } from './full-module'

const components = fs
  .readdirSync(path.join(__dirname, '..', 'src'))
  .filter((v) => !['utils', 'index.ts'].includes(v))
  .map((v) => {
    const str = camelize(v)
    return str.charAt(0).toUpperCase() + str.slice(1)
  })

const { build } = createBundle({
  plugins: {
    jsx,
    analyze: analyze({
      entryDir: path.join(__dirname, '..', 'src'),
      mapper: components
    }),
    css,
    swc: swc({
      jsc: {
        externalHelpers: false,
        target: 'es2017',
        parser: {
          syntax: 'typescript'
        }
      }
    })
  }
})

const entry = 'src/index.ts'

const configs: BuildTaskConfig[] = [
  {
    taskName: TASK_NAME.COMMONJS,
    input: entry,
    output: {
      ...commonOutput,
      format: 'cjs',
      dir: 'dist/cjs',
      exports: 'named'
    }
  },
  {
    taskName: TASK_NAME.ESMODULE,
    input: entry,
    output: {
      ...commonOutput,
      format: 'esm',
      dir: 'dist/esm'
    }
  }
]

/**
 * First is only bundle script module.
 * Second part only parser style moudle.
 * Thrid part will generator all analyzed and generator style deps graph.
 * Fourth part will generator the entry file as umd.
 * Fifth generator declaration part.
 *
 * The first task will have two sub task. with esm task coomonjs task
 */

const clean = async () => {
  const list = ['dist', 'types']
  await Promise.all(list.map((i) => fs.remove(i)))
}

const parallelRunTask = async () => {
  await Promise.all(
    configs.map(async (conf) => {
      const { taskName, ...rest } = conf
      await runTask(taskName, () => build(rest))
    })
  )
}

// Already gen esm cjs umd and declaration. Next we should generator css dependencies graph

;(async () => {
  try {
    await runTask('Clean', clean)
    await parallelRunTask()
    await runTask('UMD', parlletlGeneratorFullBundle)
    await runTask(TASK_NAME.DECLARATION, declarationTask)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
