import prettier from 'prettier'
import parserBabel from 'prettier/parser-babel'
import parserTypescript from 'prettier/parser-typescript'

export const formatCode = (code: string) =>
  prettier.format(code, {
    parser: 'babel-ts',
    plugins: [parserBabel, parserTypescript],
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    tabWidth: 2
  })

const CAMELIZERE = /-(\w)/g
const KEBACASE = /[A-Z]+(?![a-z])|[A-Z]/g

export const camelize = (str: string): string => str.replace(CAMELIZERE, (_, key) => key.toUpperCase())

export const kebabCase = (str: string): string => str.replace(KEBACASE, (_, ofs) => (ofs ? '-' : '') + _.toLowerCase())
