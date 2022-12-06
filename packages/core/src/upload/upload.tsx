import { defineComponent, ref } from 'vue'
import { createBem, createName, pick, assign } from '../utils'
import { props } from './props'

import './index.less'

const name = createName('Upload')
const bem = createBem('fect-upload')

export default defineComponent({
  name,
  props,
  emits: ['exceed'],
  setup(props, { slots, emit }) {
    const inputRef = ref<HTMLInputElement>()

    const clickHandler = () => {
      if (props.disabled) return
      if (inputRef.value) {
        inputRef.value.value = ''
        inputRef.value.click()
      }
    }

    const onAfterRead = (files: File | File[]) => props.afterRead && props.afterRead(files)

    const uploadFiles = (files: FileList) => {
      const { limit, beforeRead, assets } = props
      if (limit && assets.length + files.length > limit) {
        emit('exceed', files)
        return
      }

      const postFile = files.length === 1 ? files[0] : [...files]
      if (!postFile) return
      if (beforeRead) {
        /**
         * Promise A+
         * docs: https://promisesaplus.com/#point-53
         */
        Promise.resolve(beforeRead(postFile))
          .then((res) => {
            if (!res) return
            return typeof res === 'boolean' ? onAfterRead(postFile) : onAfterRead(res)
          })
          .catch((e) => {
            console.log(e)
          })
        return
      }
      onAfterRead(postFile)
    }

    const changeHandler = (evt: Event) => {
      const { files } = evt.target as HTMLInputElement
      if (!files) return
      uploadFiles(files)
    }

    const renderUpload = () => {
      const inputProps = assign(pick(props, ['disabled', 'readonly', 'multiple', 'accept']), {
        ref: inputRef,
        onchange: changeHandler
      })
      return <input class={bem('upload')} type="file" {...inputProps} />
    }

    return () => (
      <div class={bem(null)} onClick={clickHandler}>
        {slots.default?.()}
        {renderUpload()}
      </div>
    )
  }
})
