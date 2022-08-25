/**
 * This is not a posix API.
 */

const path = {
  join: (...paths: string[]) => {
    return paths.join('/')
  },
  relative: (from: string, to: string) => {
    const origianl = new URL(to, from)
    return origianl.pathname
  },
  dirname: (file: string) => {
    return file.split('/').reverse()[1]
  }
}

export default path
