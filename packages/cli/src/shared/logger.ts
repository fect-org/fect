import chalk from 'chalk'

const log = console.log

export const logErr = (str: string) => log(chalk.hex('#ff1a1a')(str))

export const logWarn = (str: string) => log(chalk.hex('#f5a623')(str))

export const logSuccess = (str: string) => log(chalk.hex('#3291ff')(str))
