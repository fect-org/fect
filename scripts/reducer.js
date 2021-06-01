const compose = (f, g) => (x) => f(g(x))

const concat = (acc, cur) => acc.concat(cur)

const filter = (pre) => (reducer) => (acc, cur) =>
  pre(cur) ? reducer(acc, cur) : acc

const map = (transform) => (reducer) => (acc, cur) =>
  reducer(acc, transform(cur))

module.exports = {
  compose,
  concat,
  filter,
  map,
}
