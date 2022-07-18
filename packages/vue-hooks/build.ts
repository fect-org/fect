import { build, BumpOptions } from 'no-bump'
import { runTask, commonOutput as internalCoomonOutput, BuildTaskConfig, TASK_NAME, declarationTask } from 'internal'

const commonInput = 'src/index.ts'

const commonOutput = { ...internalCoomonOutput, preserveModulesRoot: 'src' }

const internalOptions: BumpOptions['internalOptions'] = {
  plugins: {
    swc: {
      jsc: {
        target: 'es2017'
      }
    }
  }
}

const configs: BuildTaskConfig[] = [
  {
    taskName: TASK_NAME.COMMONJS,
    input: commonInput,
    output: { ...commonOutput, format: 'cjs', dir: 'dist/cjs' },
    internalOptions
  },
  {
    taskName: TASK_NAME.ESMODULE,
    input: commonInput,
    output: { ...commonOutput, format: 'esm', dir: 'dist/esm' },
    internalOptions
  }
]

;(async () => {
  try {
    await Promise.all(
      configs.map((conf) => {
        const { taskName, ...rest } = conf
        runTask(taskName, () => build(rest))
      })
    )
    await runTask('Declaration', () => declarationTask())
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
