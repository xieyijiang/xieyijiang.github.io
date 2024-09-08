---
date: 2024-09-08
title: EMQX处理二进制数据消息
description: 直接转发二进制数据会乱码，需要在Broker转换为字符串
aside: false
footer: false
pinned: true
tags:
- EMQX
- IoT
---

# EMQX处理二进制数据消息

省流：

![EMQX自定义规则](https://dlink.host/wx1.sinaimg.cn/large/e2f5bcd8ly8htgak3n8tij21950u0mzc.jpg)

在「规则」中使用内置的 `bin2hexstr` 函数将二进制转换为字符串即可