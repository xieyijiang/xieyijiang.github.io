---
title: npm & electron 换源
published: 2023-09-26
description: '切换常用npm源和electron镜像源'
image: ''
tags: ["npm", "Electron"]
category: 编程开发
draft: false
---

## npm源

常用命令

```shell
# 设置
npm config set registry <url>

# 查看
npm config get registry

# 清除缓存
npm cache clean --force
```


常用源url

- 原始: `https://registry.npmjs.org/`

- 阿里(新): `https://registry.npmmirror.com`

- 阿里(旧): `https://registry.npm.taobao.org`

- 华为: `https://mirrors.huaweicloud.com/repository/npm/`

- 腾讯: `http://mirrors.cloud.tencent.com/npm/`

## electron镜像

```shell
npm config set electron_mirror <url>
```

常用源url

- 阿里(新): `https://npmmirror.com/mirrors/electron/`

- 阿里(旧): `https://npm.taobao.org/mirrors/electron/`

- 华为 `https://mirrors.huaweicloud.com/electron/`