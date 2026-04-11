// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'
import Layout from './Layout.vue'

//@ts-ignore
import './style.scss'
//@ts-ignore
import './tailwind-entry.css'

import Lenis from 'lenis'

new Lenis({
  autoRaf: true,
  prevent: (node) => node.classList.contains('VPSidebar')
});

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('HomePage', HomePage)
  }
} satisfies Theme
