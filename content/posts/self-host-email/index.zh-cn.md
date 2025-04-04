---
title: "自建邮箱服务和网页客户端"
draft: true
date: 2025-03-07
---

## 最终效果

[bilibili-card bvid="BV1KJ411C7SB"]

## 前言

相较于大厂的免费邮箱或企业邮箱，自建邮箱有利也有弊:

✅ 优势

- 自定义后缀域名
- 账号、收发件无限制
- 数据私有化，空间配额自定义

❗ 弊端

- 搭建过程繁琐，有一定门槛
- 需要云服务商支持，否则无法正常使用
- 功能拉满后占用内存较高，硬件成本较高

本文是我个人实践记录，并非唯一解或最优解，建议结合自身实际情况，充分评估后再决定用哪种方案

### 前置条件

1. 已注册并备案的域名
2. 可配置的 DNS 服务
3. 可搭建邮箱的云服务器 (VPS)

{{< alert >}}
部分云服务商对邮件服务部署存在地域限制，例如雨云仅支持湖北地区的机器。建议在采购前先与供应商确认相关服务条款。
{{< /alert >}}

### 环境 & 软件版本

- OS: `Debian 12`
- 1Panel: `v1.10.26`
- Docker: `v25.0.5`
- Docker Compose: `v2.26.1`
- Docker Mailserver: `v14.0.0`
- Roundcube: `v1.6.10`

### 文中术语指代

- `mailserver` -> `Docker Mailserver`
- `roundcube` -> `Roundcube`
- `example.com` -> ${实际域名}

## 配置域名 & 证书

需要两个（子）域名，分别给 `mailserver` 和 `roundcube`；除了 DNS 解析之外，`roundcube` 还需要配置反向代理，`mailserver` 则不需要

### 申请 ssl 证书

1. 配置 Acme 账户: 1Panel ->【网站】->【证书】->【Acme 账户】->【创建】，填写“邮箱”，“账号类型”默认 (Let's Encrypt)，“密钥算法”默认 (EC 256)
2. 配置 DNS 账户: 1Panel ->【网站】->【证书】->【DNS 账户】->【创建】，选择域名实际所用的 DNS 服务商，填写相关参数
   [alert type="yellow"]不同服务商要求的参数不同，比如华为云可在【账号中心】->【我的凭证】->【访问密钥】中获取 Access key 和 Secret key[/alert]
3. 申请证书: “主域名”填写 `example.com`，“其他域名”填写泛域名 `*.example.com`，选择配置好的 Acme 账户和 DNS 账户，勾选“自动续签”和“推送证书到本地”，“目录”填写 `/etc/ssl/example.com`，点击【确认】等待自动申请完成

### 域名解析

## 部署 Docker Mailserver

{{< alert >}}
实际使用 1Panel 的应用商店一键安装，但修改了 compose 文件的部分内容: <br>1. 镜像仓库使用了自建的私有库，保证能顺利拉取<br>2. 110 和 995 端口需手动添加映射<br>3. mail-data 和 mail-state 的路径指向主机挂载的机械硬盘，节省系统盘空间<br>4. ssl 证书指向主机上实际存放证书的路径
{{< /alert >}}

`docker-compose.yml`:

```yaml
networks:
  1panel-network:
    external: true
services:
  mailserver:
    container_name: ${CONTAINER_NAME}
    deploy:
      resources:
        limits:
          cpus: ${CPUS}
          memory: ${MEMORY_LIMIT}
    env_file: ./conf/mailserver.env
    healthcheck:
      retries: 0
      test: ss --listening --tcp | grep -P 'LISTEN.+:smtp' || exit 1
      timeout: 3s
    hostname: ${MS_HOSTNAME}
    # image: ghcr.io/docker-mailserver/docker-mailserver:14.0.0
    image: registry.cn-hangzhou.aliyuncs.com/xieyijiang/docker-mailserver:14.0.0
    labels:
      createdBy: Apps
    networks:
      - 1panel-network
    ports:
      - ${HOST_IP}:${PANEL_APP_PORT_SMTP}:25
      - ${HOST_IP}:${PANEL_APP_PORT_IMAP4_143}:143
      - ${HOST_IP}:${PANEL_APP_PORT_ESMTP_465}:465
      - ${HOST_IP}:${PANEL_APP_PORT_ESMTP_587}:587
      - ${HOST_IP}:${PANEL_APP_PORT_IMAP4_993}:993
      - ${HOST_IP}:110:110
      - ${HOST_IP}:995:995
    restart: always
    stop_grace_period: 1m
    volumes:
      - /mnt/disk1/opt/dms/mail-data/:/var/mail/
      - /mnt/disk1/opt/dms/mail-state/:/var/mail-state/
      - ./data/dms/mail-logs/:/var/log/mail/
      - ./data/dms/config/:/tmp/docker-mailserver/
      - /etc/localtime:/etc/localtime:ro
      - /etc/ssl/example.com:/ssl/mail.example.com/:ro
```

### 启用 POP3

默认没有开启，需要手动修改环境变量，[官方文档](https://docker-mailserver.github.io/docker-mailserver/edge/config/pop3/) 直接修改 `compose` 文件， 实际可修改其指定的环境变量文件: `/opt/1panel/apps/mailserver/mailserver/conf/mailserver.env`

```ini
# 1 => Enables POP3 service
# empty => disables POP3
ENABLE_POP3=1
```

### 配置证书

同样修改环境变量，使用 1Panel 的本地证书

```ini
SSL_TYPE=manual
SSL_CERT_PATH=/ssl/mail.example.com/fullchain.pem
SSL_KEY_PATH=/ssl/mail.example.com/privkey.pem
```

### 创建管理员
