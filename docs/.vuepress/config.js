module.exports = {
  dest: 'dist',
  port: 9091,
  // 当 locales 有多个时，会在头部显示选择语言下拉框
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'WEB 前端学习笔记',
      description: 'WEB 前端学习笔记' // meta 中的描述文字，用于SEO
    }
  },
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    // 以下是插件 pwa 的设置，https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html
    // 浏览器的标签栏的网页图标，第一个'/'会遍历 public 文件夹的文件
    ['link', {
      rel: 'icon',
      href: '/logo.png'
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#1867c0'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['link', {
      rel: 'apple-touch-icon',
      href: `/icons/apple-touch-icon-152x152.png`
    }],
    ['link', {
      rel: 'mask-icon',
      href: '/icons/safari-pinned-tab.svg',
      color: '#1867c0'
    }],
    ['meta', {
      name: 'msapplication-TileImage',
      content: '/icons/msapplication-icon-144x144.png'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#000000'
    }]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/logo.svg',
    lastUpdated: 'lastUpdate', // string | boolean
    smoothScroll: true,
    locales: {
      '/': {
        lastUpdated: '上次更新',
        // 顶部导航栏
        nav: require('./nav/zh'),
        sidebar: {
          '/web-skills/': getWebSidebar(),
          '/framework/': getFrameworkSidebar(),
          '/tools/': getToolsSidebar()
        }
      }
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      popupComponent: 'MySWUpdatePopup',
      updatePopup: {
          buttonText: '刷新'
      }
    }],
    ['@vuepress/medium-zoom', true],
    [
      'container',
      {
        type: 'tip',
        defaultTitle: {
          '/': ''
        },
      }
    ],
    [
      'container',
      {
        type: 'warning',
        defaultTitle: {
          '/': '注意'
        },
      }
    ],
    [
      'container',
      {
        type: 'danger',
        defaultTitle: {
          '/': '警告'
        },
      }
    ],
    [
      'container',
      {
        type: 'details',
        defaultTitle: {
          '/': '详细信息'
        },
      }
    ],
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }],
    ['flowchart']
  ]
};

function getWebSidebar() {
  return [
    {
      title: 'Web前端知识点',
      children: [
        ['web/cache/', 'Web 前端缓存'],
        ['web/file-accept.html', '文件上传类型'],
        ['web/url-hash-query.html', 'url 中 hash 和参数解析'],
        ['web/mobile/', '移动端调试'],
        ['web/superset/', 'superset 学习'],
        ['web/future/', '前端未来'],
        ['web/reference/', '参考资料'],
      ]
    },
    {
      title: 'CSS',
      children: [
        ['css/', 'CSS'],
        ['css/animation/', 'CSS 动画'],
        ['css/animation/transform.html', '变形(transform)'],
        ['css/animation/transition.html', '转换(transition)'],
        ['css/animation/animation.html', '动画(animation)'],
        ['css/flex/', 'Flexbox 布局'],
        ['css/icon/', 'css 图标'],
      ]
    },
    {
      title: 'JavaScript',
      children: [
        ['javascript/', 'JavaScript'],
        ['javascript/crypto/', '加密原理'],
        ['javascript/crypto/crypto-js.html', 'crypto-js'],
        ['javascript/sendBeacon.html', 'sendBeancon'],
        ['javascript/esnext/', 'esnext 学习笔记'],
        ['javascript/react/', 'React'],
        ['javascript/regexp/', '正则表达式'],
        ['javascript/request/', 'Ajax 与 Fetch'],
        ['javascript/eslint/', 'Eslint 代码规范'],
        ['javascript/unit-test/', 'JavaScript 单元测试'],
        ['javascript/wx/', '微信小程序'],
      ]
    },
    {
      title: 'TypeScript',
      children: [
        ['typescript/', 'TypeScript'],
      ]
    },
    {
      title: '埋点',
      children: [
        ['event-tracking/', '埋点'],
      ]
    },
  ]
}

function getFrameworkSidebar() {
  return [{
      title: 'VUE 学习笔记',
      children: [
        ['vue/', 'VUE'],
        ['vue/vue3/', 'VUE3']
      ]
    },
    {
      title: 'vite',
      children: [
        ['vue/vite/', 'vite+vue3搭建']
      ]
    }
  ]
}

// 相关工具
function getToolsSidebar() {
  return [{
      title: '日常工作必备',
      children: [
        ['essential-skills/', '概览'],
        ['essential-skills/git.html', 'git 学习笔记'],
        ['essential-skills/mac.html', 'mac 实用技能'],
        ['essential-skills/node.html', 'node 知识点'],
        ['essential-skills/npm.html', 'npm 学习笔记'],
        ['essential-skills/vscode.html', 'vscode 操作指南'],
        ['essential-skills/webstorm.html', 'WebStorm 操作指南'],
        ['essential-skills/atom.html', 'atom 使用技巧'],
        ['essential-skills/editorconfig.html', 'editorconfig 规范化代码'],
        ['essential-skills/homebrew.html', 'homebrew 包管理工具'],
        ['essential-skills/markdown.html', 'Markdown 学习笔记'],
        ['essential-skills/mysql.html', 'mysql 使用指南'],
        ['essential-skills/nginx.html', 'nginx 学习笔记'],
        ['essential-skills/puppeteer.html', 'puppeteer 学习指南'],
        ['essential-skills/ruby.html', 'ruby 知识点'],
        ['essential-skills/terminal.html', '终端'],
        ['essential-skills/python.html', 'python 知识点'],
        ['essential-skills/tool-software.html', '常用工具软件'],
      ]
    },
    {
      title: '开发工具',
      children: [
        ['development/', '概览'],
        ['development/chrome/', 'Chrome'],
        ['development/chrome/devtools.html', 'Chrome 开发者工具'],
        ['development/chrome/extensions.html', 'Chrome 扩展程序'],
        ['development/sql/', 'sql 学习笔记'],
        ['development/docker/', 'Docker 使用指南'],
        ['development/mermaid/', 'mermaid 学习笔记'],
      ]
    }
  ]
}
