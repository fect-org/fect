/**
 * markdown loader use in vite .
 * Author : Kanno
 * rollup plugin details see : https://rollupjs.org/guide/en/#load
 * vite plugin details see : https://cn.vitejs.dev/guide/api-plugin.html#universal-hooks
 */

const MarkdownIt = require('markdown-it')

class PluginParser {
  constructor(options) {
    this.options = options
    this.name = 'vite-md-plugin'
    this.enforce = 'pre'
  }
  /**
   *
   * @param {string} file
   * @returns {boolean}
   */
  hasMarkdonw(file) {
    const reg = /.mdx?$/g
    return reg.test(file)
  }

  resolveMarkdownOptions() {
    return Object.assign(
      {
        markdownClasses: 'fect-md__wrapper',
        mardownWrapper: 'section',
      },
      this.options
    )
  }
  /**
   *
   * @param {string} raw
   * @param {MarkdownIt} createMarkdown
   */
  markdwonParser(raw, createMarkdown) {
    return createMarkdown.render(raw)
  }

  /**
   *
   * @param {string} raw
   * @param {MarkdownIt} createMarkdown
   */
  parserToVue(raw, createMarkdown) {
    const templateStr = this.markdwonParser(raw, createMarkdown)
    const options = this.resolveMarkdownOptions()
    const { markdownClasses: classes, mardownWrapper: wrapper } = options

    return `<template>
       <${wrapper} class="${classes}">
         ${templateStr}
       </${wrapper}>
    </template>`
  }
  parser() {
    //   , ...this.options.markdownOptions
    const md = new MarkdownIt({ html: true, linkify: true, typographer: true })
    const that = this

    return {
      name: this.name,
      enforce: this.enforce,
      //   transform .md file to vue component
      transform(code, id) {
        if (!that.hasMarkdonw(id)) return
        try {
          return that.parserToVue(code, md)
        } catch (e) {
          this.error(e)
        }
      },
      //   make it work in hmr
      handleUpdate: async (ctx) => {
        if (!this.hasMarkdonw(ctx.file)) return
        const reader = ctx.read
        ctx.read = async () => this.parserToVue(ctx.file, await reader())
      },
    }
  }
}

const markdownPlugin = (options) => new PluginParser(options).parser()

module.exports = { markdownPlugin }
