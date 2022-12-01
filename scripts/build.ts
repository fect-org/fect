import path from 'path'
import { build } from 'no-bump'
import { fs, shared, spinner, internalPlugins, declarationTask } from 'internal'

import type { BumpOutputOptions, BumpOptions } from 'no-bump'

const defaultWd = process.cwd()

interface InternalBumpOptions {
  formats: Required<Exclude<BumpOutputOptions['format'], string | undefined>>
  plugins: BumpOptions['plugins']
  name?: string
  external: string[]
}

const ensurePakcage = (sub: string) => {
  if (sub === 'vue')
    return [
      internalPlugins.css(),
      internalPlugins.analyze({
        base: path.join(defaultWd, 'packages', 'vue', 'src')
      })
    ]
  return []
}

const resolveBuildConfig = async (
  argvs: string[]
): Promise<
  Array<
    InternalBumpOptions & {
      entryPath: string
    }
  >
> => {
  if (!shared.len(argvs)) throw new Error('please manually the entry')
  return Promise.all(
    argvs.map(async (subDir) => {
      const subDirecotry = path.join(defaultWd, 'packages', subDir)
      const {
        bumpOptions = {},
        dependencies = {},
        peerDependencies = {}
      } = await fs.readJson<{
        bumpOptions?: Partial<InternalBumpOptions>
        peerDependencies?: Record<string, any>
        dependencies?: Record<string, any>
      }>(path.join(subDirecotry, 'package.json'))
      const { formats = ['cjs', 'esm'], name } = bumpOptions
      const plugins = ensurePakcage(subDir)
      return {
        name,
        formats,
        entryPath: subDirecotry,
        plugins,
        external: Object.keys({ ...dependencies, ...peerDependencies })
      }
    })
  )
}

async function main() {
  const argvs = process.argv.slice(2)
  const options = await resolveBuildConfig(argvs)
  const configs = options.flatMap((option) => {
    const input = path.join(option.entryPath, 'src', 'index.ts')
    const { formats, ...rest } = option
    return formats.reduce<
      Array<{
        dir: string
        format: Required<Extract<BumpOutputOptions['format'], string>>
        input: string
        options: Omit<typeof option, 'formats'>
      }>
    >((acc, cur) => {
      const dir = path.join(option.entryPath, 'dist', cur)
      acc.push({
        dir,
        format: cur,
        input,
        options: rest
      })
      return acc
    }, [])
  })
  await Promise.all(
    configs.map(async (conf) => {
      const { input, format, options, dir } = conf
      const { s } = spinner.useSpinner(format)
      try {
        await build({
          input,
          clean: true,
          plugins: options.plugins,
          external: options.external,
          output: {
            format,
            dir,
            name: options.name,
            preserveModules: true,
            preserveModulesRoot: path.dirname(input),
            exports: format === 'cjs' ? 'named' : 'auto'
          },
          internalOptions: {
            plugins: {
              swc: {
                jsc: {
                  target: 'es2017'
                }
              }
            }
          }
        })
        s.success()
      } catch (error) {
        s.error({ text: error.message })
      }
    })
  )
  await Promise.all(
    options.map(async (conf) => {
      const input = conf.entryPath
      const { s } = spinner.useSpinner('declaration')
      try {
        await declarationTask(input)
        s.success()
      } catch (error) {
        s.error({ text: error.message })
      }
    })
  )
}

main()
