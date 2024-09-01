---
date: 1695693660000
title: Mac下使用Expo开发ReactNative应用
description: 
aside: false
footer: false
tags:
- Mac
- ReactNative
- Expo
---

# Mac下使用Expo开发ReactNative应用

### 常用命令

```Shell
#安装依赖
npx expo install <包名>

#查看已连接设备
#安装libimobiledevice
brew install libimobiledevice
#查看设备的udid
idevice_id -l

#本地运行
npx expo run:android
npx expo run:ios [--device] [udid]
```

### 构建APK

项目根目录编辑 `eas.json`

```JSON
{
  "cli": {
    "version": ">= 5.9.1"
  },
  "build": {
    // ...
    
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "distribution": "internal"
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "production": {}
  },
  // ...
}
```

构建应用

```Shell
#本地构建.apk
eas build --platform android --local --profile preview

#云端构建.aab
eas build --platform android

#云端构建.apk
eas build --platform android --profile preview
```


