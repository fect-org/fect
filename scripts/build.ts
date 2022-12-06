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
  if (sub === 'core')
    return [
      internalPlugins.css(),
      internalPlugins.analyze({
        base: path.join(defaultWd, 'packages', 'core', 'src')
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
      subDir: string
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
        subDir,
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
        mini: boolean
        options: Omit<typeof option, 'formats'>
        file?: string
      }>
    >((acc, cur) => {
      const tar = cur.includes('umd') ? 'cjs' : cur
      const dir = path.join(option.entryPath, 'dist', tar)
      const format = (cur.includes('min') ? cur.split('-').at(0) : cur) as any
      const mini = cur.includes('min')
      const base = {
        dir,
        format,
        input,
        mini,
        options: rest
      }
      if (cur.includes('umd') && rest.subDir === 'core') Object.assign(base, { file: mini ? 'fect.min.js' : 'fect.js' })
      acc.push(base)
      return acc
    }, [])
  })
  for (const conf of configs) {
    const { input, format, options, dir, mini, file } = conf
    const message = mini ? `${format}-min` : format
    const { s } = spinner.useSpinner(message)
    const output: BumpOutputOptions = {
      format,
      dir,
      name: options.name,
      preserveModules: true,
      preserveModulesRoot: path.dirname(input),
      exports: format === 'cjs' ? 'named' : 'auto',
      minify: mini
    }
    const buildOption: BumpOptions = {
      input,
      plugins: options.plugins,
      external: options.external,
      output,
      internalOptions: {
        plugins: {
          swc: {
            jsc: {
              target: 'es2017'
            }
          }
        }
      }
    }
    if (options.subDir === 'core' && format === 'umd') {
      delete output.preserveModules
      delete output.preserveModulesRoot
      output.file = file
      output.exports = 'named'
      buildOption.global = {
        vue: 'Vue'
      }
      buildOption.external = ['vue']
      buildOption.plugins?.shift()
      buildOption.plugins?.unshift(internalPlugins.css({ extract: 'main.css' }))
    }
    try {
      await build(buildOption)
      s.success()
    } catch (error) {
      s.error({ text: error.message })
    }
  }
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
