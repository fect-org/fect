<p align="center" height="170">
  <img  style="height:170px;width:170px;" height="170" width="170" src="https://user-images.githubusercontent.com/52351095/118687359-7e809480-b837-11eb-8083-b0504ec79652.png"/>
</p>

<p align="center">
 <img src="https://img.shields.io/npm/dm/@fect-ui/vue?style=for-the-badge" alt="downloads" />
 <img src="https://img.shields.io/npm/v/@fect-ui/vue?color=%230761d1&logoColor=%23000000&style=for-the-badge" alt="npm Version" />
 <img src="https://img.shields.io/codecov/c/gh/fect-org/fect?style=for-the-badge" alt="Coverage Status" />
 <img src="https://img.shields.io/github/workflow/status/fect-org/fect/CI?style=for-the-badge" alt="CI Status" />
</p>

## 快速上手

1. 运行 `yarn add @fect-ui/vue` 或者 `npm install @fect-ui/vue` 安装。

2.

```js
import { createApp } from 'vue'
import App from './App.vue'
import '@fect-ui/themes'
import FectUI from '@fect-ui/vue'
import '@fect-ui/vue/dist/cjs/main.css'

createApp(App).use(FectUI).mount('#app')
```

## 浏览器支持

Fect 支持现代浏览器以及 Chrome >= 51、iOS >= 10.0（与 Vue 3 一致）。

## 文档

- [中文文档](https://www.fect-org.com/zh-cn)

## 贡献者们

感谢以下小伙伴们为 Fect 做出的贡献：

<a href="https://github.com/fect-org/fect/graphs/contributors">
  <img src="https://opencollective.com/fect/contributors.svg?width=890&button=false" alt="contributors">
</a>

## 贡献指南

- [贡献指南中文版](https://github.com/fect-org/fect/blob/master/.github/CONTRIBUTING.zh-CN.md)

## 致谢

感谢 [JetBrains](https://www.jetbrains.com/) 对本项目的支持。

<p align="right">
<img width="250px" height="250px" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_square.png" alt="JetBrains Black Box Logo logo.">
</p>

## 开源协议

本项目遵循[MIT](./LICENSE)协议 , 请自由地享受和参与开源。
