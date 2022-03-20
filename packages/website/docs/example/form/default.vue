<template>
  <div>
    <fe-form
      :model="formValue"
      show-message
      :rules="rules"
      ref="formRef"
      label-width="110"
      label-position="left"
      size="mini"
    >
      <fe-form-item label="Input" prop="input">
        <fe-input v-model="formValue.input" placeholder="input your nick name"></fe-input>
      </fe-form-item>
      <fe-form-item label="CheckGroup" prop="checkGroup">
        <fe-checkbox-group v-model="formValue.checkGroup" use-row>
          <fe-checkbox label="FontEnd">
            <fe-code>FontEnd</fe-code>
          </fe-checkbox>
          <fe-spacer />
          <fe-checkbox label="BackEnd">
            <fe-code>BackEnd</fe-code>
          </fe-checkbox>
        </fe-checkbox-group>
      </fe-form-item>
      <fe-form-item label="FrameWork" prop="frameWork">
        <fe-select v-model="formValue.frameWork">
          <fe-option label="Vue" value="vue"></fe-option>
          <fe-option label="Koa" value="koa"></fe-option>
        </fe-select>
      </fe-form-item>
      <fe-form-item label="Radio" prop="radio">
        <fe-radio-group v-model="formValue.radio" use-row>
          <fe-radio value="xeryYue">test1</fe-radio>
          <fe-radio value="kanno">test2</fe-radio>
        </fe-radio-group>
      </fe-form-item>
      <fe-form-item label="Switch" prop="switch">
        <fe-switch v-model="formValue.switch" />
      </fe-form-item>
      <fe-form-item label-position="top">
        <fe-button size="mini" auto @click="sumbitHandler">Sumbit</fe-button>
        <fe-spacer :x="2" inline />
        <fe-button size="mini" auto @click="resetHandler">Rest</fe-button>
      </fe-form-item>
    </fe-form>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExDefaultForm',
  setup() {
    const formRef = ref(null)
    const formValue = ref({
      input: '',
      checkGroup: [],
      frameWork: '',
      radio: '',
      switch: ''
    })
    const rules = {
      input: [
        {
          required: true,
          message: 'Please input your nick name',
          trigger: 'blur'
        }
      ],
      checkGroup: {
        required: true,
        type: 'array',
        message: 'Please choose the direction you are interested in',
        trigger: 'change'
      },
      frameWork: {
        type: 'string',
        required: true,
        validate: (val) => {
          return val === 'koa'
        },
        message: 'Please choose a class',
        trigger: 'change'
      }
    }
    const sumbitHandler = async () => {
      try {
        const state = await formRef.value.validate()
        console.log(state)
      } catch (error) {
        console.log(error)
      }
    }
    const resetHandler = () => {
      //
    }
    return {
      formValue,
      rules,
      sumbitHandler,
      resetHandler,
      formRef
    }
  }
}
</script>
