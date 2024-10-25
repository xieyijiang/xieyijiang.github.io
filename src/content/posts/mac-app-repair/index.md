---
title: MacOS打开应用提示 "XXX 已损坏，无法打开..."
published: 2023-08-01
description: 未经认证的应用被系统添加了隔离标记，可通过命令移除此标记
image: './cover.jpg'
tags: ['MacOS']
category: '办公效率'
draft: false
---

终端输入以下命令

```shell
sudo xattr -d com.apple.quarantine /Applications/<应用名称>
```

应用名称可在 访达 → 应用程序 → 右键显示简介 → 名称与扩展名 中查看

比如 `lx-music-desktop.app`