import { defineConfig } from 'vitepress'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import UnoCSS from 'unocss/vite'
import { getPosts } from './theme/serverUtils'

const pageSize = 10
const fileAndStyles = {}

export default defineConfig({
  vite: {
    plugins: [
      UnoCSS(),
    ],
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc']
    }
  },
  title: "一只蟹酱",
  description: "奇技淫巧",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  cleanUrls: true,
  markdown: {
    config: (md) => {
      md.use(markdownItAnchor).use(markdownItTocDoneRight, {
        containerClass: 'w-24'
      })
      md.render("# markdown-it rulezz!\n\n${toc}\n## with markdown-it-toc-done-right rulezz even more!")
    }
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh'
    },
    // en: {
    //   label: 'English',
    //   lang: 'en',
    //   link: '/en/guide'
    // }
  },
  themeConfig: {
    posts: await getPosts(pageSize),
    nav: [
      { text: '首页', link: '/' },
      { text: '标签', link: '/tags' },
      { text: '关于', link: '/about' },
    ],
    search: {
      // provider: 'local',
      provider: 'algolia',
      options: {
        appId: 'PGCRILDCKL',
        apiKey: 'fa4416e9db8d64dda0f6680721b3e47d',
        indexName: 'xieyijiang',
        locales: {
          zh: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            }
          }
        }
      }
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2023-present 一只蟹酱',
      // copyright: '浙ICP备2024064918号'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xieyijiang' }
    ]
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html) return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, style + '</head>')
    }
  }
})
