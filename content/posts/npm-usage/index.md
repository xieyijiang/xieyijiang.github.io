---
title: "Common usage of npm"
date: 2023-09-26
---

### Changing Registry

**Check Current Registry**

```bash
npm config get registry
```

**Set Registry**

```bash
npm config set registry <url>
```

_Example: Set to Taobao Registry_

```bash
npm config set registry https://registry.npmmirror.com
```

**Available Registries**

- Official: `https://registry.npmjs.org`
- Alibaba (New): `https://registry.npmmirror.com`
- Alibaba (Old): `https://registry.npm.taobao.org`
- Huawei: `https://mirrors.huaweicloud.com/repository/npm/`
- Tencent: `http://mirrors.cloud.tencent.com/npm/`

### Electron Mirror Configuration

```bash
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
```

**Available Mirrors**

- Alibaba: `https://npm.taobao.org/mirrors/electron/`
- Huawei: `https://mirrors.huaweicloud.com/electron/`

### Alternative: Project-Level Configuration

Create a `.npmrc` file in your project root directory with:

```ini
ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
```
