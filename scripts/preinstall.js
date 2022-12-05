// preinstall hook. Check user node version and package manager
// https://yarnpkg.com/advanced/lifecycle-scripts/#environment-variables

const [major, minor] = process.versions.node.split('.')

if (+major < 18 || (+major === 18 && +minor < 12)) {
  console.error('Please ensure your node version is greater than 18.12.x')
  process.exit(1)
}

if (!/yarn/.test(process.env.npm_execpath || '')) {
  console.error('THis project is using yarn as package manager.')
  process.exit(1)
}
