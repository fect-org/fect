import _Upload from './upload'
import { withInstall } from '../utils'

export * from './interface'

export const Upload = withInstall(_Upload)

export default Upload
