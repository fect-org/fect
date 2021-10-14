#!/usr/bin/env node

import { Command } from 'commander'
import { collect, compile } from './commands'

const program = new Command()

program.command('compile').action(compile).parse()

program.command('collect').action(collect).parse()
