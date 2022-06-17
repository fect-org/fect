import { Command } from 'commander'
import { build } from './node/build'
import { dev } from './node/dev'
import { compile } from './node/compile'

const program = new Command()

program.command('compile').description('Compile Component code').action(compile)

program.command('dev').description('Preview site on development environment').action(dev)

program.command('build').description('Build site ').action(build)

program.parse()
