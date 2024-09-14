---
date: 1690857960000
title: MacOS打开应用提示 "XXX 已损坏，无法打开..."
description: 原因是未经认证的应用被系统添加了隔离标记，可通过命令移除此标记
aside: false
footer: false
tags:
- Mac
---

# MacOS打开应用提示 "XXX 已损坏，无法打开..."

终端输入以下命令

```Shell
sudo xattr -d com.apple.quarantine /Applications/<应用名称>
```

应用名称可在 访达 → 应用程序 → 右键显示简介 → 名称与扩展名 中查看

比如 `lx-music-desktop.app`
