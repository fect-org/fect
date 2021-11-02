/**
 * markdown loader use in vite .
 * Author : Kanno
 * rollup plugin details see : https://rollupjs.org/guide/en/#load
 * vite plugin details see : https://cn.vitejs.dev/guide/api-plugin.html#universal-hooks
 */

const MarkdownIt = require('markdown-it')

class PluginParser {
  constructor(options) {
    this.options = this.resolveMarkdownOptions(options)
    this.name = 'vite-md-plugin'
    this.enforce = 'pre'
  }
  static create(options) {
    if (!PluginParser.Parser) {
      PluginParser.Parser = new PluginParser(options)
    }
    return PluginParser.Parser.parser()
  }
  /**
   *
   * @param {string} file
   * @returns {boolean}
   */
  static hasMarkdown(file) {
    const reg = /.mdx?$/g
    return reg.test(file)
  }

  resolveMarkdownOptions(options) {
    return Object.assign(
      {
        markdownClasses: 'fect-md__wrapper',
        markdownWrapper: 'section',
        markdownOptions: {},
      },
      options
    )
  }
  /**
   *
   * @param {string} raw
   * @param {MarkdownIt} createMarkdown
   */
  markdownParser(raw, createMarkdown) {
    const exmapleReg = /```html((.|\r|\n)*?)```/g
    const tableReg = /:::attribute((.|\r|\n)*?):::/g
    const playgroundReg = /:::playground((.|\r|\n)*?):::/g

    const parseTable = (codeStr) => {
      const group = codeStr
        .replace(/<table/g, ':::<table')
        .replace(/<h3/g, ':::<h3')
        .split(':::')
      return group
        .map((fargment) => {
          if (fargment.indexOf('<table') !== -1) {
            return `<attributes>${fargment}</attributes>`
          }
          return fargment
        })
        .join('')
    }

    const template = parseTable(createMarkdown.render(raw))
    return template.replace(/<h3/g, '<attributes-title').replace(/<\/h3/g, '</attributes-title')
  }

  /**
   *
   * @param {string} raw
   * @param {MarkdownIt} createMarkdown
   */
  parserToVue(raw, createMarkdown) {
    const templateStr = this.markdownParser(raw, createMarkdown)
    const { markdownClasses: classes, markdownWrapper: wrapper } = this.options

    return `<template>
        <${wrapper} class="${classes}">
          ${templateStr}
        </${wrapper}>
     </template>`
  }
  parser() {
    const md = new MarkdownIt({ html: true, linkify: true, typographer: true, ...this.options.markdownOptions })
    const { hasMarkdown, Parser } = PluginParser
    return {
      name: this.name,
      enforce: this.enforce,
      //   transform .md file to vue component
      transform(code, id) {
        if (!hasMarkdown(id)) return
        try {
          return Parser.parserToVue(code, md)
        } catch (e) {
          this.error(e)
        }
      },
      //   make it work in hmr
      handleUpdate: async (ctx) => {
        if (!hasMarkdown(ctx.file)) return
        const reader = ctx.read
        ctx.read = async () => Parser.parserToVue(ctx.file, await reader())
      },
    }
  }
}

const markdownPlugin = (options) => PluginParser.create(options)

module.exports = { markdownPlugin }
