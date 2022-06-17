import { BuildTaskConfig, TASK_NAME, runTask, commonOutput, jsx, analyze } from 'internal'
import { createBundle, build as bumpBuild } from 'no-bump'
import { declarationTask } from '@fect-ui/cli'
import { swc } from 'rollup-plugin-swc3'

const { build } = createBundle({
  plugins: {
    jsx,
    analyze,
    swc: swc({
      include: /\.(js|ts)/,
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

const commonInput = 'src/index.ts'

/**
 * First is only bundle script module.
 * Second part only parser style moudle.
 * Thrid part will generator all analyzed and generator style deps graph.
 * Fourth part will generator the entry file as umd.
 * Fifth generator declaration part.
 *
 * The first task will have two sub task. with esm task coomonjs task
 */

const generatorFullBundle = () => {
  //
}

const testBuild = async () => {
  await build({
    input: commonInput,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      ...commonOutput
    }
  })
}

;(async () => {
  await runTask(TASK_NAME.ESMODULE, () => testBuild())
  //   await runTask(TASK_NAME.DECLARATION, () => declarationTask('src'))
})()
