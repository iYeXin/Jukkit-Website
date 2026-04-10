# fetch - HTTP 请求

类似 `fetch` API，用于发起 HTTP 请求。已通过 `init.js` 预挂载为全局对象。

> **实现说明**：`fetch` 的实现位于 `init/fetch.js`，在初始化脚本中挂载到 `globalThis._fetch`。`src/libs/fetch.js` 只是导出该引用。

## 引入方式

```javascript
// 方式一：使用全局对象（推荐）
const response = await fetch('https://api.example.com/data');

// 方式二：手动引入
const fetch = require('./libs/fetch');
```

## 基本用法

```javascript
// GET 请求
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// POST 请求
const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'Alice' })
});
```

## 请求选项

```javascript
const response = await fetch('https://api.example.com/data', {
    method: 'POST',           // 请求方法
    headers: {                // 请求头
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token'
    },
    body: JSON.stringify({}), // 请求体
    timeout: 10000            // 超时时间（毫秒）
});
```

## 响应对象

```javascript
const response = await fetch('https://api.example.com/data');

// 基本信息
console.log(response.status);      // 状态码
console.log(response.ok);          // 是否成功 (200-299)
console.log(response.headers);     // 响应头对象

// 获取响应头
response.getHeader('Content-Type');

// 解析响应体
const text = await response.text();     // 文本
const json = await response.json();     // JSON 对象
const base64 = await response.base64(); // Base64 编码
const bytes = await response.arrayBuffer(); // 原始字节数组
const blob = await response.blob();     // Blob 对象
```

## 处理错误

```javascript
try {
    const response = await fetch('https://api.example.com/data');

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
} catch (error) {
    console.error('Request failed:', error);
}
```

## 下载二进制文件

```javascript
// 下载图片
const response = await fetch('https://example.com/image.png');
const base64 = await response.base64();

// 保存到文件
const fs = require('./libs/fs');
const bytes = await response.arrayBuffer();
fs.writeFileSync('/path/to/image.png', bytes, 'binary');
```

## 示例：API 调用

```javascript
// REST API 封装
const api = {
    async get(path) {
        const res = await fetch(`https://api.example.com${path}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    },

    async post(path, data) {
        const res = await fetch(`https://api.example.com${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }
};

// 使用
const users = await api.get('/users');
const newUser = await api.post('/users', { name: 'Alice' });
```
