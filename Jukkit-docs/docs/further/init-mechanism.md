# Init 机制

## 概述

`init` 目录是一个特殊的目录，用于在入口文件执行前完成全局配置。主要特点：

1. **独立于 srcDir** - 不经过 Rspack 编译，直接打包
2. **先于入口执行** - 在 JS context 创建后、entry 执行前执行
3. **用于挂载全局对象** - 如 `setTimeout`、`fetch`、`console` 等

## 为什么需要 init 目录？

Jukkit 运行在 Nashorn JavaScript 引擎上，该引擎不提供现代 JavaScript 运行时的全局对象（如 `setTimeout`、`fetch`）。

init 目录用于：在 Babel 引入的 polyfill 加载前提供必要的全局对象，如 `setTimeout`。

> **注意**：Init 机制被设计用来**环境补全**，我们**完全不建议**使用 Init 机制处理任何业务逻辑，除非你遇到了短期内必须解决的**环境兼容性问题**，并且能够承担 Init 机制**长期支持的不稳定性**。

### 错误示例

```javascript
// 错误示例：尝试在 Init 机制中处理业务逻辑（哪怕是全局配置定义）
// init/init.js
globalThis.CONFIG = {
    API_BASE: 'https://api.example.com'
}
```

### 推荐实践

```javascript
// 推荐实践：使用 CommonJS 模块系统，享受现代 ES 语法
// src/config.js
module.exports = {
    API_BASE: 'https://api.example.com'
}

// src/index.js
const { API_BASE } = require('./config');
```

## 默认 init 目录结构

```
init/
├── init.js        # 入口，挂载全局对象
├── polyfill.js    # setTimeout、setInterval、console 等
├── bindEvent.js   # 事件绑定，挂载到 globalThis._bindEvent
└── fetch.js       # HTTP 请求，挂载到 globalThis._fetch
```

## init/init.js 示例

```javascript
const polyfill = require('./polyfill');
const bindEvent = require('./bindEvent');
const fetch = require('./fetch');

globalThis.setTimeout = polyfill.setTimeout;
globalThis.clearTimeout = polyfill.clearTimeout;
globalThis.setInterval = polyfill.setInterval;
globalThis.clearInterval = polyfill.clearInterval;
globalThis.console = polyfill.console;
globalThis._bindEvent = bindEvent;
globalThis._fetch = fetch;
globalThis.fetch = fetch;
```

## 重要说明

1. **语法兼容性**：init 目录下的文件不经过 Rspack 编译，需要使用 ES5.1 兼容语法（`var`、`function` 等），或自行确保语法兼容
2. **模块引用**：init 目录下的文件可以相互引用，但不能引用 `src/` 目录下的文件，这是由于 `src/` 目录下的文件会被 Rspack 编译打包，这会改变模块结构。
