import { build, BumpOptions, BumpOutputOptions } from 'no-bump'
import { runTask, declarationTask } from '@fect-ui/cli'

interface Config extends BumpOptions {
  taskName: string
}

const commonInput = 'src/index.ts'

const commonOutput: BumpOutputOptions = {
  sourceMap: false,
  preserveModules: true,
  preserveModulesRoot: 'src',
  extractHelpers: false
}

const internalConfig: BumpOptions['internalPlugins'] = {
  swc: {
    jsc: {
      target: 'es2017'
    }
  }
}

const configs: Config[] = [
  {
    taskName: 'CommonJs',
    input: commonInput,
    output: { ...commonOutput, format: 'cjs', dir: 'dist/cjs' },
    internalPlugins: internalConfig
  },
  {
    taskName: 'EsModule',
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
