import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  title: "Jukkit 官方文档",
  description: "Jukkit 官方文档",
  locales: {
    // 🇨🇳 中文
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      themeConfig: {
        nav: [
          { text: '主页', link: '/' },
          { text: '文档', link: '/docs/quick-start' }
        ],

        sidebar: [
          {
            text: '一切的起点',
            items: [
              { text: '快速开始', link: '/docs/quick-start' },
            ]
          },
          {
            text: '基础知识',
            items: [
              {
                text: 'API 文档',
                collapsed: true,
                items: [
                  { text: '全局对象', link: '/docs/api/global-objects' },
                  { text: '模块系统', link: '/docs/api/module-system' },
                  { text: '生命周期', link: '/docs/api/lifecycle' },
                  { text: '事件监听', link: '/docs/api/event-listening' },
                  { text: '命令注册', link: '/docs/api/command-registration' },
                  { text: '任务调度', link: '/docs/api/task-scheduling' },
                  { text: '数据存储', link: '/docs/api/data-storage' },
                  { text: '资源访问', link: '/docs/api/resource-access' },
                  { text: '工具方法', link: '/docs/api/utility-methods' },
                  { text: 'TypeScript 类型支持', link: '/docs/api/typescript-support' },
                  { text: '完整示例', link: '/docs/api/complete-example' },
                ]
              },
              {
                text: '库模块文档',
                collapsed: true,
                items: [
                  { text: 'fs - 文件系统', link: '/docs/libs/fs' },
                  { text: 'http - HTTP 服务器', link: '/docs/libs/http' },
                  { text: 'fetch - HTTP 请求', link: '/docs/libs/fetch' },
                  { text: 'polyfill - Promise 与定时器', link: '/docs/libs/polyfill' },
                  { text: 'Logger - 日志工具', link: '/docs/libs/Logger' },
                  { text: 'bindEvent - 事件绑定', link: '/docs/libs/bindEvent' },
                  { text: '聚合引入', link: '/docs/libs/aggregate-imports' },
                  { text: 'jukkit.resource - 资源访问', link: '/docs/libs/jukkit-resource' },
                ]
              }
            ]
          },
          {
            text: '进阶知识',
            collapsed: true,
            items: [
              { text: '构建配置详解', link: '/docs/further/build-config' },
              { text: '多目标编译', link: '/docs/further/multi-target' },
              { text: 'Init 机制', link: '/docs/further/init-mechanism' },
              { text: '模块系统', link: '/docs/further/module-system' },
              { text: '现代语法支持', link: '/docs/further/modern-syntax' },
              { text: '资源管理', link: '/docs/further/resource-management' },
              { text: 'Dev 模式与热重载', link: '/docs/further/dev-mode' },
              { text: '远程部署', link: '/docs/further/remote-deploy' },
              { text: 'TypeScript 支持', link: '/docs/further/typescript-support' },
              { text: '内置库模块', link: '/docs/further/built-in-libs' },
              { text: 'Vert.x', link: '/docs/further/vertx' },
            ]
          }
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/iYeXin/Jukkit' }
        ],

        notFound: {
          title: "页面未找到",
          quote: "也许你应该抬头看看是不是输错链接了？",
          linkText: "返回主页"
        }
      }
    }
  },
}
)
