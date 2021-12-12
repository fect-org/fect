import { Command } from 'commander'
import { collect, compile, dev, jest, lint, build, volar } from './commands'

const program = new Command()

program.command('compile').description('Compile Component code').action(compile)

program.command('collect').description('Collect Component package entry').action(collect)

program.command('dev').description('Preview site on development environment').action(dev)

program
  .command('test')
  .option('-u , --updateSnapshot', 'update jest Snapshot')
  .description('run unit tests with jest')
  .action(jest)

program.command('lint').description('Lint code style').action(lint)
program.command('build').description('Build site ').action(build)

program.command('volar').description('Gen Volar types').action(volar)

program.parse()
