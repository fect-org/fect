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
