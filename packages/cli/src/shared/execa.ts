import { spawn } from 'child_process'

export const execa = (cmd, options) => spawn(cmd, options, { shell: true })
