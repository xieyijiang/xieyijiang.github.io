---
date: 2024-09-13
title: CentOS7安装调试MongoDB
description: 不依赖宝塔面板，直接用yum
pinned: true
aside: false
footer: false
tags:
- Linux
- MongoDB
---

# CentOS7安装调试MongoDB

[官方文档](https://www.mongodb.com/zh-cn/docs/manual/tutorial/install-mongodb-on-red-hat/#run-mongodb-community-edition)

首先配置存储库

```shell
# 创建配置文件
touch /etc/yum.repos.d/mongodb-org-7.0.repo

# 写入以下内容
[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://pgp.mongodb.com/server-7.0.asc
```

安装 MongoDB Community Server

```shell
sudo yum install -y mongodb-org
```

运行、调试

```shell
# 启动
sudo systemctl start mongod

# 验证 MongoDB 是否已成功启动
sudo systemctl status mongod

# 停止
sudo systemctl stop mongod

# 重启
sudo systemctl restart mongod

# 调试
mongosh
```

默认情况下绑定了本地ip `127.0.0.1` ，这意味着只能在本机调试，无法远程访问。需要修改配置文件中的 `bindIp` 值或者通过命令行参数 `--bind_ip` 修改

```shell
# 打开默认配置文件
vim /etc/mongod.conf

# 修改 bindIp 为 0.0.0.0
net:
  port: 27017
  bindIp: 0.0.0.0
```

重启服务后，就可以远程访问调试了