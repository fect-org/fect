import { build, BumpOptions } from 'no-bump'
import { declarationTask } from '@fect-ui/cli'

import { runTask, commonOutput as internalCoomonOutput, BuildTaskConfig, TASK_NAME } from 'internal'

const commonInput = 'src/index.ts'

const commonOutput = { ...internalCoomonOutput, preserveModulesRoot: 'src' }

const internalConfig: BumpOptions['internalPlugins'] = {
  swc: {
    jsc: {
      target: 'es2017'
    }
  }
}

const configs: BuildTaskConfig[] = [
  {
    taskName: TASK_NAME.COMMONJS,
    input: commonInput,
    output: { ...commonOutput, format: 'cjs', dir: 'dist/cjs' },
    internalPlugins: internalConfig
  },
  {
    taskName: TASK_NAME.COMMONJS,
    input: commonInput,
    output: { ...commonOutput, format: 'esm', dir: 'dist/esm' },
    internalPlugins: internalConfig
  }
]

;(async () => {
  try {
    await Promise.all(
      configs.map(async (conf) => {
        const { taskName, ...rest } = conf
        await runTask(taskName, () => build(rest))
      })
    )
    await runTask('Declaration', () => declarationTask('src'))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
