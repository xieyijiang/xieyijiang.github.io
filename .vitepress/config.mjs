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
  themeConfig: {
    posts: await getPosts(pageSize),
    nav: [
      { text: '首页', link: '/' },
      { text: '标签', link: '/tags' },
      { text: '关于', link: '/about' },
    ],
    search: {
      provider: 'local',
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2023-present 解宜江',
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
