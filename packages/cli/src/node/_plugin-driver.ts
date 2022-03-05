import { logErr } from '../shared/logger'

export class PluginDriver {
  plugins: any[]
  private pluginContexts: ReadonlyMap<any, any>

  constructor(plugins) {
    this.plugins = plugins
    this.pluginContexts = new Map(this.plugins.map((plugin) => [plugin.name, plugin]))
  }

  hookParallel(hookName: string, args: any) {
    const promises: Promise<void>[] = []
    for (const plugin of this.plugins) {
      const hooksPromise = this.runHook(hookName, args, plugin)
      if (!hooksPromise) continue
      promises.push(hooksPromise)
    }

    return Promise.all(promises)
  }
  runHook(hookName: string, args: any, plugin: any) {
    const hook = plugin[hookName]
    if (!hook) return
    const context = this.pluginContexts.get(plugin.name)
    return Promise.resolve().then(() => {
      if (typeof hook !== 'function') {
        return logErr(`[Non]:${plugin.name} error`)
      }
      // eslint-disable-next-line @typescript-eslint/ban-types
      const hookResult = (hook as Function).apply(context, args)
      if (!hookResult || !hookResult.then) {
        return hookResult
      }
      const promise = Promise.resolve(hookResult)
      return promise
    })
  }
}
