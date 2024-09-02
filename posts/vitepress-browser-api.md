---
date: 1725261169000
title: 'VitePress 构建时报错 "ReferenceError: getComputedStyle is not defined"'
description: VitePress在构建时会尝试执行js代码，但没有浏览器环境，所以代码中包含浏览器提供的API会报错
pinned: true
aside: false
footer: false
tags:
- VitePress
- Vue
---

# VitePress 构建时报错 "ReferenceError: getComputedStyle is not defined"

VitePress在构建过程中使用的是静态站点生成器，它会将源代码转换为静态文件，并不会在浏览器环境下执行。因此，在自定义的 `js` 文件中使用浏览器提供的API（如`getComputedStyle`）是不可行的，因为这些API只在浏览器环境中可用。

解决此问题的一种方法是将包含`getComputedStyle`的代码移到在浏览器环境中执行的地方，例如Vue组件中的生命周期钩子函数（如`onMounted`）。这样，代码将在运行时而不是构建过程中被执行，就可以正常使用`getComputedStyle`了。

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  console.log(fontSize)
})
</script>
```

原理是：Vue在实例化组件时，会将组件的模板编译为渲染函数，并通过渲染函数生成对应的虚拟DOM。然后，Vue将虚拟DOM渲染为真实的DOM，并插入到文档中。在`onMounted`生命周期钩子中，组件已经完成了这个过程，DOM元素已经存在于文档中，因此可以通过`getComputedStyle`获取到元素的样式。

值得注意的是，在Vue的其他生命周期钩子中，可能存在一些限制或者DOM元素还未完全创建的情况，所以在`onMounted`生命周期钩子中使用`getComputedStyle`是最为安全和可靠的方式。
