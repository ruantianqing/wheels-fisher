<p align="center">
  <a href="https://github.com/ruantianqing/wheels-fisher/">
    <img width="200" src="https://github.com/ruantianqing/wheels-fisher/ada.png">
  </a>
</p>

<h1 align="center">
  <a href="https://github.com/ruantianqing/wheels-fisher/" target="_blank">wheels-ada</a>
</h1>

<div align="center">

An easy UI components based on Vue.

[![Build Status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/travis-ci/travis-web)
[![npm package](https://img.shields.io/npm/v/wheels-ada.svg?style=flat-square)](https://www.npmjs.com/package/wheels-ada)
![](https://img.shields.io/badge/language-JavaScript-yellow.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

</div>

wheels-fisher UI 是一个实用的 UI 简易框架，目前提供了一些常用组件（不定期更新），适合 PC 端和移动端使用。

## 现已支持

- [x] Button（按钮）
- [x] Input（输入框）
- [x] Grid（栅栏）
- [x] Layout（布局）
- [x] Tabs（标签页）
- [x] Popover（弹出框）
- [x] Collapse（折叠面板）

## 介绍

wheels 就是轮子，这是我在使用 Vue 的过程中尝试实现的 UI 组件（造的轮子）集合，希望对你有用。

## 开始使用

1. 添加 CSS 样式
   使用本框架前，请在 CSS 中开启 border-box

   ```
   *，*::before,*::after{ box-sizing: border-box }
   ```

   IE 8 及以上浏览器支持此样式。

2. 安装 wheels-fisher

   ```
   npm install wheels-fisher
   ```

   或者

   ```
   yarn add wheels-fisher
   ```

3. 引入 wheels-fisher

   ```
   import { Button } from 'wheels-fisher'

   export default {
       name: 'app',
       components: {
           'w-button': Button
       }
   }
   ```