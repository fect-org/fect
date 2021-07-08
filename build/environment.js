const setBabelEnv = (env) => (process.env.BABEL_ENV = env)

const setNodeEnv = (env) => (process.env.NODE_ENV = env)

module.exports = {
  setBabelEnv,
  setNodeEnv,
}
