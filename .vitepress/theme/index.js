import 'virtual:uno.css'
import { defineComponent, h, inject } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { setup } from '@css-render/vue3-ssr'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './components/Layout.vue'
import NewHome from './components/NewHome.vue'
import Tags from './components/Tags.vue'

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject('css-render-collect')
    return {
      style: collect()
    }
  },
  render() {
    return h('css-render-style', {
      innerHTML: this.style
    })
  }
})

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute()
    return () => {
      return h('vitepress-path', null, [route.path])
    }
  }
})

const NaiveUIProvider = defineComponent({
  render() {
    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true },
      {
        default: () => [
          h(Layout, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null
        ],
      }
    )
  }
})

export default {
  ...DefaultTheme,
  Layout: NaiveUIProvider,
  enhanceApp({ app }) {
    app.component('newHome', NewHome)
    app.component('tags', Tags)
    if (import.meta.env.SSR) {
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }
  }
}