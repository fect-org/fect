```js
ElMessage.warning({
  message: '警告哦，这是一条警告消息',
  type: 'warning',
})
```

设计思路 =>向外暴露一个 FectToast 的 API
FectToast 具有`default`,`success`,`warning`,`error`这 4 个静态方法。

当用户使用静态方法传入 type=`default`,`success`,`warning`,`error`时 type 属性的优先级从属于
静态方法。(按照静态方法进行渲染)

```js
FectToast({ message: 'Toast', type: 'warning' })
FectToast.warning({ message: 'Toast' })
```

渲染的组件不支持用户自定义渲染标签。

Toast 组件拥有用户自行关闭的能力(关闭按钮可选/动态渲染)

Toast 标签具有 VerCel 风格 默认拥有 hoverable 属性。
但是一次性最多显示 3 条。

兼容 移动端 /pc 端
