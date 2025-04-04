---
title: "npm 常见用法"
date: 2023-09-26
---

## 一、基础配置管理
测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测
### 1.1 镜像源管理
#### 查看当前配置
```bash
npm config get registry
```

#### 全局切换镜像源
```bash
# 设置淘宝新镜像（推荐）
npm config set registry https://registry.npmmirror.com

# 恢复官方源
npm config set registry https://registry.npmjs.org
```

#### 常用镜像源清单
| 服务商 | 镜像地址                                      | 状态   |
|--------|---------------------------------------------|--------|
| 阿里云 | `https://registry.npmmirror.com`            | 推荐   |
| 腾讯云 | `http://mirrors.cloud.tencent.com/npm/`     | 可用   |
| 华为云 | `https://mirrors.huaweicloud.com/repository/npm/` | 可用   |

### 1.2 配置优先级说明
{{< mermaid >}}
graph TD
    A[命令行参数] --> B[项目.npmrc]
    B --> C[用户.npmrc]
    C --> D[全局npm配置]
    D --> E[默认配置]
{{< /mermaid >}}

---

## 二、专项加速方案
### 2.1 Electron 二进制镜像
#### 全局配置方案
```bash
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
```

#### 项目级配置方案
在项目根目录创建 `.npmrc` 文件：
```ini
# .npmrc
ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
```

#### 可用镜像源
- **阿里云镜像**（推荐）：  
  `https://npm.taobao.org/mirrors/electron/`
- **华为云镜像**：  
  `https://mirrors.huaweicloud.com/electron/`

---

## 三、最佳实践指南
### 3.1 多环境配置策略
```bash
# 开发环境使用淘宝镜像
npm config set registry https://registry.npmmirror.com --location=dev

# 生产环境保留官方源
npm config set registry https://registry.npmjs.org --location=prod
```

### 3.2 配置验证命令
```bash
# 查看生效配置
npm config list

# 验证下载速度
time npm install --no-package-lock lodash
```

### 3.3 安全注意事项
1. 避免使用非 HTTPS 协议的镜像源
2. 定期执行 `npm audit` 检查依赖安全
3. 重要项目建议锁定版本号 + 启用 package-lock

---

## 四、疑难解答速查表
| 现象                 | 解决方案                      | 验证命令                    |
|----------------------|-----------------------------|---------------------------|
| 安装时卡在 `reify:lodash` | 清除缓存后重试               | `npm cache clean --force` |
| 出现证书校验错误       | 关闭严格SSL模式              | `npm config set strict-ssl false` |
| 镜像源响应超时         | 切换备用镜像                 | `curl -I <镜像URL>`       |
