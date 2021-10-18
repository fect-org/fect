#!/usr/bin/env node

import { Command } from 'commander'
import { collect, compile, dev, jest, lint } from './commands'

const program = new Command()

program.command('compile').description('Compile Component code').action(compile)

program.command('collect').description('Collect Component package entry').action(collect)

program.command('dev').description('Preview site on development environment').action(dev)

program.command('test').option('-u', 'update jest Snapshot').description('run unit tests with jest').action(jest)

program.command('lint').description('Lint code style').action(lint)

program.parse()
