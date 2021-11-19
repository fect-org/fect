<template>
  <div>
    <!-- inline -->
    <fe-form :model="formValue" label-width="120" label-position="left">
      <fe-form-item label="Input" prop="input" for="username">
        <fe-input v-model="formValue.input" name="input"></fe-input>
      </fe-form-item>
      <fe-form-item label="CheckBox">
        <fe-checkbox-group use-row v-model="formValue.checkGroup">
          <fe-checkbox>
            <fe-code>FontEnd</fe-code>
          </fe-checkbox>
          <fe-checkbox>
            <fe-code>BackEnd</fe-code>
          </fe-checkbox>
        </fe-checkbox-group>
      </fe-form-item>
      <fe-form-item label="Select">
        <fe-select v-model="formValue.frameWork">
          <fe-option label="Vue"></fe-option>
          <fe-option label="React"></fe-option>
        </fe-select>
      </fe-form-item>
    </fe-form>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-default-form',
  setup() {
    const formValue = ref({
      input: '',
      checkGroup: [],
      frameWork: '',
    })

    return { formValue }
  },
}
</script>
