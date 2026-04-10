# http - HTTP 服务器

类似 Node.js 的 `http` 模块，提供 HTTP 服务器功能。

## 引入方式

```javascript
const http = require('./libs/http');
```

## 创建服务器

```javascript
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.path}`);
    res.json({ message: 'Hello World' });
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
});
```

## 请求对象 (IncomingMessage)

```javascript
http.createServer((req, res) => {
    // 基本信息
    console.log(req.method);      // 'GET', 'POST', etc.
    console.log(req.url);         // 完整 URL
    console.log(req.path);        // 路径部分
    console.log(req.queryString); // 查询字符串
    console.log(req.query);       // 解析后的查询参数对象
    console.log(req.headers);     // 请求头对象
    console.log(req.host);        // Host 头
    console.log(req.protocol);    // 'HTTP/1.1'

    // 读取请求体
    req.text().then(body => {
        console.log('Request body:', body);
    });

    // 解析 JSON 请求体
    req.json().then(data => {
        console.log('JSON data:', data);
    });
});
```

## 响应对象 (ServerResponse)

```javascript
http.createServer((req, res) => {
    // 设置状态码
    res.statusCode = 200;

    // 设置响应头
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Custom-Header', 'value');

    // 获取/检查响应头
    res.getHeader('Content-Type');
    res.hasHeader('Content-Type');
    res.getHeaders();
    res.removeHeader('X-Custom-Header');

    // 写入响应头
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // 写入响应体
    res.write('<html>');
    res.write('<body>Hello</body>');
    res.write('</html>');

    // 结束响应
    res.end();

    // 或一次性发送
    res.end('Hello World');

    // 发送 JSON
    res.json({ message: 'Success', data: [] });

    // 发送文本/对象
    res.send('Plain text');
    res.send({ message: 'Auto JSON' });

    // 重定向
    res.redirect('/new-path');
    res.redirect(301, '/permanent-redirect');
});
```

## 路由示例

```javascript
const server = http.createServer((req, res) => {
    const { method, path, query } = req;

    // 路由匹配
    if (path === '/' && method === 'GET') {
        res.json({ message: 'Home' });
    }
    else if (path === '/api/users' && method === 'GET') {
        res.json({ users: ['Alice', 'Bob'] });
    }
    else if (path === '/api/users' && method === 'POST') {
        req.json().then(data => {
            res.json({ message: 'User created', data });
        });
    }
    else if (path.startsWith('/api/users/')) {
        const id = path.split('/')[3];
        res.json({ userId: id });
    }
    else {
        res.writeHead(404);
        res.json({ error: 'Not Found' });
    }
});
```

## 服务器控制

```javascript
const server = http.createServer(handler);

// 监听端口
server.listen(8080);
server.listen(8080, 'localhost');
server.listen(8080, () => console.log('Started'));

// 获取地址信息
const addr = server.address();
console.log(addr.port, addr.address);

// 关闭服务器
server.close(() => console.log('Server closed'));

// 事件
server.on('listening', () => console.log('Listening'));
server.on('close', () => console.log('Closed'));
server.on('error', err => console.error('Error:', err));
```

## HTTP 客户端

```javascript
// GET 请求
http.get('https://api.example.com/data', (res, body) => {
    console.log(res.statusCode);
    console.log(body);
});

// POST 请求
http.post('https://api.example.com/users', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alice' })
}, (res, body) => {
    console.log(body);
});

// 通用请求
http.request({
    protocol: 'https:',
    hostname: 'api.example.com',
    port: 443,
    path: '/users',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alice' })
}, (res, body) => {
    console.log(res.statusCode, body);
});
```

## 常量

```javascript
// HTTP 方法
console.log(http.METHODS);
// ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']

// 状态码
console.log(http.STATUS_CODES[200]);  // 'OK'
console.log(http.STATUS_CODES[404]);  // 'Not Found'
console.log(http.STATUS_CODES[500]);  // 'Internal Server Error'
```
