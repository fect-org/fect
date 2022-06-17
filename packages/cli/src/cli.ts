import { Command } from 'commander'
import { jest } from './commands'
import { format } from './node/lint'
import { build } from './node/build'
import { dev } from './node/dev'
import { compile } from './node/compile'

const program = new Command()

program.command('compile').description('Compile Component code').action(compile)

program.command('dev').description('Preview site on development environment').action(dev)

program
  .command('test')
  .option('-u , --updateSnapshot', 'update jest Snapshot')
  .description('run unit tests with jest')
  .action(jest)

program.command('lint').description('Lint code style').action(format)
program.command('build').description('Build site ').action(build)

program.parse()
