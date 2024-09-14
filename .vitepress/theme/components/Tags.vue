<!--  -->
<template>
  <n-config-provider :theme="currentTheme"
    :theme-overrides="currentTheme === undefined ? lightThemeOverrides : darkThemeOverrides">
    <div class="mt-4 px-4 flex flex-wrap gap-2 justify-center">
      <n-tag v-for="(arr, key) in tags" :key="key" v-model:checked="checked[key]" checkable>
        {{ key + ' ' + arr.length }}
      </n-tag>
    </div>
    <div class="mt-8 px-4 flex gap-2 flex-col items-center">
      <div v-for="post in checkedPosts" :key="post.regularPath" class="w-full max-w-4xl flex items-center justify-between">
        <span class="w-5/8 font-semibold cursor-pointer truncate" @click="router.go(post.regularPath)">{{ post.frontMatter.title }}</span>
        <span class="w-2/8 font-light text-sm text-right">{{ dayjs(post.frontMatter.date).format('YYYY-MM-DD') }}</span>
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