import _From from './form'
import { withInstall } from '../utils'

export const Form = withInstall(_From)

export default Form

export type { FormInstance, ValidateErrorParams, ValidateCallback, PromisfyValidate, FormRules } from './interface'
