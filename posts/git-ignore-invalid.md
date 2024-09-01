---
date: 1715932680000
title: 解决 .gitignore 指定的文件/路径不生效
description: 有时项目中已经被git跟踪的部分文件/路径需要添加到 .gitignore 中
aside: false
footer: false
tags:
- Git
---

# 解决 .gitignore 指定的文件/路径不生效

`.gitignore` 指定项不生效时，可能是该文件已经被跟踪，需要从跟踪列表中移除它

```Shell
git rm --cached <fileName | path/to/fileName>
```
