---
date: 2024-01-04
title: CentOS7重置并修复yum
description: 折腾久了，yum的源丢失，完全无法使用，需要彻底重置
aside: false
footer: false
tags:
- Linux
---

# CentOS7重置并修复yum

```Shell
#删除官方源
rm -rf /etc/yum.repos.d*

#添加阿里云的镜像源和EPEL源
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo && yum -y install epel-release

#重新生成缓存
yum makecache & yum makecache fast

#更新软件包
yum update -y
```
