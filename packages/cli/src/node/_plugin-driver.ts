import { logErr } from '../shared/logger'
import { Plugin } from './_compile'

export class PluginDriver {
  plugins: Plugin[]

  constructor(plugins) {
    this.plugins = plugins
  }

  hookParallel(hookName: string, args: unknown[]) {
    const promises: Promise<any>[] = []
    for (const plugin of this.plugins) {
      const hooksPromise = this.runHook(hookName, args, plugin)
      if (!hooksPromise) continue
      promises.push(hooksPromise)
    }

    return Promise.all(promises)
  }

  hookFirstSync(hookName: string, args: unknown[]) {
    this.plugins.forEach((plugin) => this.runHookSync(hookName, args, plugin))
    return null
  }

  runHook(hookName: string, args: unknown[], plugin: any) {
    const hook = plugin[hookName]
    if (!hook) return
    return Promise.resolve().then(() => {
      if (typeof hook !== 'function') {
        return logErr(`[Non]:${plugin.name} error`)
      }
      // eslint-disable-next-line @typescript-eslint/ban-types
      const hookResult = (hook as Function).apply(plugin, args)
      if (!hookResult || !hookResult.then) {
        return hookResult
      }
      const promise = Promise.resolve(hookResult)
      return promise
    })
  }
  runHookSync(hookName: string, args: any, plugin: any) {
    const hook = plugin[hookName]
    if (!hook) return
    try {
      if (typeof hook !== 'function') {
        return logErr(`[Non]:${plugin.name} error`)
      }
      // eslint-disable-next-line @typescript-eslint/ban-types
      return (hook as Function).apply(plugin, args)
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }
}
