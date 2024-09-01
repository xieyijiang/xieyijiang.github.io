---
date: 1695693660000
title: Mac下本地开发ReactNative应用
description: 
aside: false
footer: false
tags:
- Mac
- ReactNative
---

# Mac下本地开发ReactNative应用

### 相关依赖

RN: 0.72.6

Homebrew

```Shell
# ✅正常安装
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# ❌官网首页推荐的安装 路径不在 /usr/local 会引发BUG
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

cocoapods: 1.13.0

```Shell
# 安装
sudo gem install -n /usr/local/bin cocoapods

# 查看已安装的相关依赖
gem list --local | grep cocoapods

# 卸载
sudo gem uninstall cocoapods
```

activesupport: 7.0.8

```Shell
sudo gem uninstall activesupport
sudo gem install activesupport --version 7.0.8
```

安装npm依赖之后，还需为ios安装pod依赖

```Shell
npx pod-install ios
```

### 打包发布

#### 安卓生成签名密钥

```Shell
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias <自定义别名> -keyalg RSA -keysize 2048 -validity 10000
```