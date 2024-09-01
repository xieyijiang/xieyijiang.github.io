<template>
  <Layout>
    <template #doc-before>
      <div v-if="!$frontmatter.page">
        <span class="text-sm font-light">{{ dayjs($frontmatter.date).format('YYYY-MM-DD') }}</span>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import dayjs from 'dayjs'

const { Layout } = DefaultTheme

</script>