<template>
  <n-config-provider :theme="currentTheme" :locale="zhCN" :date-locale="dateZhCN"
    :theme-overrides="currentTheme === undefined ? lightThemeOverrides : darkThemeOverrides">
    <div class="flex flex-col items-center ">
      <div v-for="post in displayPosts" :key="post.regularPath" class="w-full max-w-2xl mt-8 px-4 flex flex-col gap-1">
        <span class="cursor-pointer text-lg font-medium" @click="router.go(post.regularPath)">
          <n-icon-wrapper v-if="post.frontMatter.pinned === true" :size="iconWrapperSize" :border-radius="2">
            <n-icon size="0.8rem">
              <Pinned />
            </n-icon>
          </n-icon-wrapper>
          {{ post.frontMatter.title }}
        </span>
        <div class="text-base font-normal opacity-70 truncate">{{ post.frontMatter.description }}</div>
        <div class="flex gap-2 items-center">
          <div class="text-sm font-light">{{ dayjs(post.frontMatter.date).format('YYYY-MM-DD') }}</div>
          <n-tag v-for="tag in post.frontMatter.tags" :key="tag" :bordered="false" size="small">
            {{ tag }}
          </n-tag>
        </div>
      </div>
    </div>
    <div class="my-8 flex justify-center">
      <n-pagination v-model:page="page" v-model:page-size="pageSize" :item-count="posts.length" show-size-picker
        :page-sizes="[4, 8]" :on-update:page-size="onPageSizeUpdate">
        <template #prefix="{ itemCount }">
          共 {{ itemCount }} 篇
        </template>
      </n-pagination>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData, useRouter } from 'vitepress'
import { darkTheme, NConfigProvider, NIcon, NIconWrapper, NPagination, NTag } from 'naive-ui'
import { Pinned } from '@vicons/tabler'
import { lightThemeOverrides, darkThemeOverrides } from '../settings'
import { zhCN, dateZhCN } from 'naive-ui'
import dayjs from 'dayjs'

const { theme, isDark } = useData()
const router = useRouter()
const posts = theme.value.posts || []
const page = ref(1)
const pageSize = ref(4)
const iconWrapperSize = ref(1)
const currentTheme = computed(() => {
  return isDark.value ? darkTheme : undefined
})
const displayPosts = computed(() => {
  const startIndex = (page.value - 1) * pageSize.value
  return posts.slice(startIndex, startIndex + pageSize.value)
})

function onPageSizeUpdate(newPageSize) {
  pageSize.value = newPageSize
  const lastPage = Math.ceil(posts.length / newPageSize)
  if (lastPage < page.value) {
    page.value = lastPage
  }
}

function jump2post(post) {
  // const newPath = post.regularPath.replace(/^\/src\/|\.html$/g, '')
  router.go(post.regularPath)
}

onMounted(() => {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  iconWrapperSize.value = 1 * fontSize
})

</script>
