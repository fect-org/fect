/**
 * event pubsub
 */

import { logErr, logWarn } from '../shared/logger'

type Listener = (...args) => void

type ListenerItem = {
  callback: (...args: any[]) => void
}

export class EventEmitter {
  private listeners: Record<string, ListenerItem[]>
  constructor() {
    this.listeners = {}
  }
  private registerListener(evt: string, cb: Listener) {
    const evtType = evt.constructor.name
    if (evtType !== 'String') throw logErr(`Event name only use String ! Not ${evtType}`)
    ;[evt].forEach((e) => {
      this.listeners[e] = this.listeners[e] || []
      this.listeners[e].push({ callback: cb })
    })
  }

  on(event: string, fn: Listener) {
    this.registerListener(event, fn)
  }

  emit(event: string, ...args) {
    const listeners = []
    const eventNames = Object.keys(this.listeners)
    eventNames.forEach((evtName, idx) => {
      if (evtName === event) {
        Array.prototype.push.apply(listeners, this.listeners[evtName])
      }
    })
    listeners.forEach((context: ListenerItem) => context.callback.apply(null, args))
  }
  detach(event: string, fn: Listener) {
    const eventNames = Object.keys(this.listeners)
    if (!eventNames.includes(event))
      return logWarn(`Please afferent Right event name to detach .Can't found event ${event}`)
    this.listeners[event].forEach((context, idx) => {
      if (context.callback === fn) {
        this.listeners[event].splice(idx, 1)
        return this.detach(event, fn)
      }
    })
    return true
  }
  detachAll() {
    this.listeners = {}
  }
}
