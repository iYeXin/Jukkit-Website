# 聚合引入

可以通过 `libs.js` 一次性引入所有模块：

```javascript
const { Logger, fs, http, fetch, polyfill, bindEvent } = require('./libs');

// 使用
const logger = new Logger('MyPlugin');
const content = fs.readFileSync('file.txt');
const server = http.createServer(handler);
const response = await fetch('https://api.example.com');
```

> **提示**：项目默认通过 `init.js` 预挂载了 `Promise`、`setTimeout`、`setInterval`、`console`、`fetch` 等全局对象，无需手动引入即可直接使用。
