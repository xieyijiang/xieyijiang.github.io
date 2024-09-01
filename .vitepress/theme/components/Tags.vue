<!--  -->
<template>
  <n-config-provider :theme="currentTheme"
    :theme-overrides="currentTheme === undefined ? lightThemeOverrides : darkThemeOverrides">
    <div class="mx-auto my-0 pt4 max-w-100 flex gap-2">
      <n-tag v-for="(arr, key) in tags" :key="key" v-model:checked="checked[key]" checkable>
        {{ key + ' ' + arr.length }}
      </n-tag>
    </div>
    <div class="mt-8 flex gap-2 flex-col items-center justify-center">
      <div v-for="post in checkedPosts" :key="post.regularPath" class="w-2/3 min-w-128 flex items-center justify-between">
        <span class="font-semibold cursor-pointer" @click="router.go(post.regularPath.replace(/^\/src\/|\.html$/g, ''))">{{ post.frontMatter.title }}</span>
        <span class="font-light text-sm">{{ dayjs(post.frontMatter.date).format('YYYY-MM-DD') }}</span>
      </div>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { darkTheme, NConfigProvider, NTag } from 'naive-ui'
import dayjs from 'dayjs'
import { lightThemeOverrides, darkThemeOverrides } from '../settings'
import { getTags } from '../utils'
import { useData, useRouter } from 'vitepress'

const { theme, isDark } = useData()
const router = useRouter()
const posts = theme.value.posts || []
const tags = getTags(posts)
const keys = Object.keys(tags)
let checkedKeys = {}
keys.forEach(key => {
  checkedKeys[key] = false
})

const checkedPosts = ref([])
const checked = reactive(checkedKeys)
const currentTheme = computed(() => {
  return isDark.value ? darkTheme : undefined
})

watch(checked, () => {
  showCheckedPosts()
})

function showCheckedPosts() {
  let list = []
  const checkedKeys = Object.keys(checked).filter(key => checked[key] === true)
  checkedKeys.forEach(key => {
    const matchedPosts = posts.filter(post => post.frontMatter.tags.includes(key))
    matchedPosts.forEach(post => {
      const index = list.findIndex(item => item.regularPath === post.regularPath)
      if (index === -1) {
        list.push(post)
      }
    })
  })
  checkedPosts.value = list
}
</script>