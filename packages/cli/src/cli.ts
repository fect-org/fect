import { Command } from 'commander'
import { collect, jest, volar, compile as _compile } from './commands'
import { format } from './node/lint'
import { build } from './node/build'
import { dev } from './node/dev'
import { compile } from './node/compile'

const program = new Command()

program.command('compile').description('Compile Component code').action(_compile)
program.command('zz').description('Compile Component code').action(compile)

program.command('collect').description('Collect Component package entry').action(collect)

program.command('dev').description('Preview site on development environment').action(dev)

program
  .command('test')
  .option('-u , --updateSnapshot', 'update jest Snapshot')
  .description('run unit tests with jest')
  .action(jest)

program.command('lint').description('Lint code style').action(format)
program.command('build').description('Build site ').action(build)

program.command('volar').description('Gen Volar types').action(volar)

program.parse()
