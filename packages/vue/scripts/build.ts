import {
  BuildTaskConfig,
  TASK_NAME,
  runTask,
  commonOutput,
  css,
  analyze,
  declarationTask,
  camelize,
  remove
} from 'internal'
import fs from 'fs'
import { build } from 'no-bump'
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

const entry = 'src/index.ts'

interface ConfigParams {
  taskName: string
  format: 'cjs' | 'esm'
}

const generatorConfigs = (config: ConfigParams): BuildTaskConfig => {
  const { format, taskName } = config
  const dir = `dist/${format}`
  return {
    taskName,
    input: entry,
    output: {
      ...commonOutput,
      format,
      dir,
      exports: format === 'cjs' ? 'named' : 'auto'
    },
    plugins: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignored
      jsx() as any,
      analyze({
        entryDir: path.join(__dirname, '..', 'src'),
        mapper: components
      }),
      css()
    ],
    internalOptions: {
      plugins: {
        commonjs: false,
        swc: {
          jsc: {
            target: 'es2017',
            parser: {
              syntax: 'typescript'
            }
          }
        }
      }
    }
  }
}

const configs: BuildTaskConfig[] = [
  generatorConfigs({
    taskName: TASK_NAME.COMMONJS,
    format: 'cjs'
  }),
  generatorConfigs({
    taskName: TASK_NAME.ESMODULE,
    format: 'esm'
  })
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
  await Promise.all(list.map((i) => remove(i)))
}

const parallelRunTask = async (tasks: BuildTaskConfig[]) => {
  await Promise.all(
    tasks.map(async (conf) => {
      const { taskName, ...rest } = conf
      await runTask(taskName, () => {
        build(rest)
      })
    })
  )
}

// Already gen esm cjs umd and declaration. Next we should generator css dependencies graph

;(async () => {
  try {
    await runTask('Clean', clean)
    await parallelRunTask(configs)
    await runTask('UMD', parlletlGeneratorFullBundle)
    await runTask(TASK_NAME.DECLARATION, declarationTask)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
