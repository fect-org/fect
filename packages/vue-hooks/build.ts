import { build, BumpOutputOptions, BumpOptions } from 'no-bump'
import { runTask, declarationTask } from '@fect-ui/cli'

interface Config {
  taskName: string
  input: BumpOptions['input']
  output: BumpOutputOptions
}

;(async () => {
  const commonInput = 'src/index.ts'

  const commonOutput: BumpOutputOptions = {
    sourceMap: false,
    preserveModules: true,
    preserveModulesRoot: 'src',
    extractHelpers: false
  }

  const configs: Config[] = [
    {
      taskName: 'CommonJs',
      input: commonInput,
      output: { ...commonOutput, format: 'cjs', dir: 'dist/cjs' }
    },
    {
      taskName: 'EsModule',
      input: commonInput,
      output: { ...commonOutput, format: 'esm', dir: 'dist/esm' }
    }
  ]

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
