import { BuildTaskConfig, TASK_NAME, runTask, commonOutput } from 'internal'
import { createBundle } from 'no-bump'

const { build } = createBundle({})

const commonInput = 'src/index.ts'

/**
 * I decide split the build task into four.
 * First is only bundle script module.
 * Second part only parser style moudle.
 * Thrid part will generator all analyzed and generator style deps graph.
 * Fourth part will generator the entry file as umd.
 *
 * The first task will have two sub task. with esm task coomonjs task
 */
