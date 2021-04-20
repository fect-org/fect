import { format, createNameSpace } from '../index'
import { mount } from '@vue/test-utils'
const { camelize } = format

test('camlize', () => {
  expect(camelize('ab')).toEqual('ab')
  expect(camelize('a-b')).toEqual('aB')
  expect(camelize('a-b-')).toEqual('aB-')
  expect(camelize('-a-b')).toEqual('AB')
  expect(camelize('-')).toEqual('-')
})

test('crateNameSpace', () => {
  const [createComponent] = createNameSpace('TestComponents')
  const wrapper = createComponent({
    setup(props) {
      return () => <div>test Componetns</div>
    },
  })
  const _wrapper = mount(wrapper)

  expect(wrapper.name).toBe('fe-TestComponents')
  expect(_wrapper.html()).toContain('<div>test Componetns</div>')
})
