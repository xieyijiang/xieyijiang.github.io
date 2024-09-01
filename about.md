---
page: true
title: About
description: About me
aside: false
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://dlink.host/wx1.sinaimg.cn/large/e2f5bcd8ly8hqbxd1ll5kj20u00u0tce.jpg',
    name: 'Xie Yijiang',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/xieyijiang' },
      // { icon: 'twitter', link: 'https://x.com/arroganceInNov' }
    ]
  },
]
</script>

# About me

<VPTeamMembers size="small" :members="members" />