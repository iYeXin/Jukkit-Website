# 内置库模块

| 模块        | 引入方式                                 | 说明                       |
| ----------- | ---------------------------------------- | -------------------------- |
| `fs`        | `const fs = require('fs')`               | 文件系统（读写、监听、流） |
| `http`      | `const http = require('http')`           | HTTP 服务器                |
| `fetch`     | `const fetch = require('fetch')`         | HTTP 请求                  |
| `Logger`    | `const Logger = require('Logger')`       | 日志工具类                 |
| `bindEvent` | `const bindEvent = require('bindEvent')` | 注册卸载回调               |

> **注意**：`fetch` 和 `bindEvent` 的实现位于 `init/` 目录，在初始化脚本中挂载到 `globalThis`。`modules/` 下只是导出引用。

详细文档请参阅 [库模块文档](./LIBS.md)。
