import { useState, useExpose } from '@fect-ui/vue-hooks'
import FeToast from './toast'
import { createNode, withInstall, NormalTypes, createPortal, assign, isNumber, getId, len } from '../utils'
import { createToastContext } from './toast-contenxt'
import type { App } from 'vue'
import type { ToastOptions, StaticToastOptions, Toasts, TostInstance, ToastInsanceMethods } from './interface'

/**
 * After ver 1.6.0. We reDesign the toast component. In past each toast has be netsed in a container.
 * But when we need add prop placement. If the placement it's the layout attribue. It means we should break all
 * the logic. My ideal toast is  independent.
 * Before 1.6.0 => we joined closeAble. But it's not a good choices.
 * The new called is
 * ```js
 *
 *  const cancel = (e,cancelEvent) => {
 *   return <div>Cancel Action</div>
 * }
 *
 *  Toast({
 *   type: 'success',
 *   message:"Hello world~",
 *   actions:[cancel]
 * })
 * ```
 *
 * ### Architecture
 * Refactor the toast container. It's should be a container who don't include default position style.
 */

let instance: TostInstance | null = null

const destroyStack: string[] = []

const Toast = (options: ToastOptions) => {
  const id = `toast-${getId()}`

  if (!instance) {
    // root node
    const container = createNode('fect-ui--toast')

    ;({ instance } = createPortal<ToastInsanceMethods>(
      {
        setup() {
          const [toasts, setToasts] = useState<Toasts>([])
          const [isHovering, setIsHovering] = useState<boolean>(false)

          const updateToasts = (toastOption: Toasts[number], duration: number) => {
            setToasts((pre) => {
              const next = pre.concat(
                assign(toastOption, {
                  cancel: () => cancel(toastOption.id)
                  // __timeout: window.setTimeout(() => {
                  //   cancel(toastOption.id)
                  //   window.clearTimeout(pre[0].__timeout)
                  // }, duration)
                })
              )
              return next
            })
          }

          const cancel = (id: string) => {
            destroyStack.push(id)
            // setToasts((pre) => pre.map((item) => (item.id !== id ? item : assign(item, { willBeDestroy: true }))))
          }

          const { provider } = createToastContext()

          provider({ toasts, updateHovering: setIsHovering, isHovering })

          useExpose({ updateToasts })

          return () => <FeToast />
        }
      },
      container
    ))
  }

  const { duration: userDuration, ...rest } = options
  const duration = isNumber(userDuration) ? Number(userDuration) : Toast.defaultOptions.duration
  instance.updateToasts(assign({ id, visible: true, placement: Toast.defaultOptions.placement }, rest), duration)
}

Toast.defaultOptions = {
  duration: 4500,
  type: 'default',
  placement: 'bottomRight'
} as Required<ToastOptions> & {
  duration: number
}

/**
 * At previous version. user  call Toast or Toast static methods. the assign logic is unreasonable.
 * Because we only call createMethods for static methods. But we don't provide a preset config for normal call.
 */

const createMethods = (type: NormalTypes) => (options: StaticToastOptions) =>
  Toast(assign(Toast.defaultOptions, options, { type }))

/**
 * static methods
 */
Toast.success = createMethods('success')

Toast.warning = createMethods('warning')

Toast.error = createMethods('error')

Toast.Component = withInstall(FeToast)

Toast.install = (app: App) => {
  app.use(Toast.Component)
  app.config.globalProperties.$toast = Toast
}

export { Toast }
