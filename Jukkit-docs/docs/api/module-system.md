# 模块系统

Jukkit 支持标准的 CommonJS 模块语法。

## modules 目录

`modules/` 目录下的文件可以直接通过模块名引入，不经过 Rspack 编译：

```javascript
// modules/Logger.js
function Logger(prefix) {
    this.prefix = prefix;
    this.javaLogger = java.util.logging.Logger.getLogger(prefix);
}

Logger.prototype.info = function(msg) {
    this.javaLogger.info(msg);
};

module.exports = Logger;
```

```javascript
// src/index.js
const Logger = require('Logger');  // 直接通过模块名引入
const logger = new Logger('MyPlugin');
```

## 相对路径引入

```javascript
// src/utils.js
module.exports = {
    log: (msg) => jukkit.log(msg)
};

// src/index.js
const utils = require('./utils');  // 相对路径引入
```

## 模块解析规则

| 引入方式               | 解析位置            | 是否编译 |
| ---------------------- | ------------------- | -------- |
| `require('Logger')`    | `modules/Logger.js` | ❌ 不编译 |
| `require('./utils')`   | `src/utils.js`      | ✅ 编译   |
| `require('../config')` | 上级目录            | ✅ 编译   |

## 模块缓存

模块在首次加载后会被缓存，后续 `require()` 返回相同的导出对象。
