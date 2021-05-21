/**
 * author:XeryYue
 * collect all component and build
 */

const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const chalk = require('chalk')

const packagePath = path.join(__dirname, '../packages')

const cyanColor = (text) => chalk.cyan(text)

const doneColor = (text) => chalk.bold(text)

const args = [
  'build',
  '--target',
  'lib',
  '--name',
  'fect-ui',
  './packages/index.js',
]

const queryPackages = async () => {
  const files = await fs.readdir(packagePath)
  return files.filter((name) => name !== 'utils' && name !== 'index.js')
}

const runPackages = async (name, count) => {
  await execa('vue-cli-service', [
    'build',
    '--target',
    'lib',
    '--dest',
    'lib',
    '--name',
    name,
    `./packages/${name}/index.jsx`,
  ])
  console.log(`>Lib bundle ${cyanColor(name)} done.No${count}.     `)
}

const bundleComponents = async () => {
  const packages = await queryPackages()
  const dist = path.join(__dirname, '../lib')
  await fs.remove(dist)
  await fs.mkdir(dist)
  console.log(`>Package  ready,${packages.length}.      `)
  let count = 0

  await Promise.all(
    await packages.map(async (name) => {
      count++
      await runPackages(name, count)
    }),
  )
  await console.log(`> Libs bundle done. Count ${doneColor(count)}.     `)
}

const buildMain = async () => {
  const { stdout } = execa('vue-cli-service', args)
  stdout.pipe(process.stdout)
}

const build = async () => {
  console.log('> collect packages...')
  await buildMain()
}

build().catch((err) => {
  console.log(`Build Err: ${err}`)
})
