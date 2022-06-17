import { Command } from 'commander'
import { compile } from './node/compile'

const program = new Command()

program.command('compile').description('Compile Component code').action(compile)

program.parse()
