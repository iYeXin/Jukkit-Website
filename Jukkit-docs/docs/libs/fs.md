# fs - 文件系统

类似 Node.js 的 `fs` 模块，提供文件和目录操作功能。

> **提示**：`fs` 相对路径的解析基于工作目录（即服务器根目录），插件目录是 `plugins/plugin-name`。

## 引入方式

```javascript
const fs = require('./libs/fs');
```

## 同步方法

### 文件读写

```javascript
// 读取文件（文本）
const content = fs.readFileSync('/path/to/file.txt');
const content = fs.readFileSync('/path/to/file.txt', 'utf8');

// 读取文件（二进制）
const bytes = fs.readFileSync('/path/to/image.png', 'binary');

// 写入文件
fs.writeFileSync('/path/to/file.txt', 'Hello World');
fs.writeFileSync('/path/to/file.txt', 'Hello World', { encoding: 'utf8', flag: 'w' });

// 追加文件
fs.appendFileSync('/path/to/file.txt', '\nNew line');
```

### 目录操作

```javascript
// 创建目录
fs.mkdirSync('/path/to/dir');
fs.mkdirSync('/path/to/dir', { recursive: true }); // 递归创建

// 读取目录
const files = fs.readdirSync('/path/to/dir');

// 读取目录（带文件类型）
const entries = fs.readdirSync('/path/to/dir', { withFileTypes: true });
entries.forEach(entry => {
    console.log(entry.name, entry.isFile(), entry.isDirectory());
});

// 删除目录
fs.rmdirSync('/path/to/dir');
fs.rmdirSync('/path/to/dir', { recursive: true }); // 递归删除
```

### 文件信息

```javascript
// 检查文件是否存在
const exists = fs.existsSync('/path/to/file');

// 获取文件状态
const stat = fs.statSync('/path/to/file');
console.log(stat.size);        // 文件大小
console.log(stat.isFile());    // 是否为文件
console.log(stat.isDirectory()); // 是否为目录
console.log(stat.mtime);       // 修改时间 (Date 对象)
console.log(stat.atime);       // 访问时间
console.log(stat.ctime);       // 创建时间
```

### 文件操作

```javascript
// 复制文件
fs.copyFileSync('/src/file.txt', '/dest/file.txt');
fs.copyFileSync('/src/file.txt', '/dest/file.txt', 1); // 覆盖已存在的文件

// 重命名/移动
fs.renameSync('/old/path.txt', '/new/path.txt');

// 删除文件
fs.unlinkSync('/path/to/file');

// 截断文件
fs.truncateSync('/path/to/file', 1024); // 截断到 1024 字节

// 获取真实路径
const realPath = fs.realpathSync('/path/to/link');

// 符号链接
fs.symlinkSync('/target/path', '/link/path');
const target = fs.readlinkSync('/link/path');

// 修改文件时间
fs.utimesSync('/path/to/file', new Date(), new Date());
```

## 异步方法

所有同步方法都有对应的异步版本，返回 Promise：

```javascript
// 异步读取
const content = await fs.readFile('/path/to/file.txt');

// 异步写入
await fs.writeFile('/path/to/file.txt', 'Hello World');

// 异步创建目录
await fs.mkdir('/path/to/dir', { recursive: true });

// 异步获取状态
const stat = await fs.stat('/path/to/file');

// 异步读取目录
const files = await fs.readdir('/path/to/dir');

// 异步复制
await fs.copyFile('/src/file.txt', '/dest/file.txt');

// 异步重命名
await fs.rename('/old/path.txt', '/new/path.txt');

// 异步删除
await fs.unlink('/path/to/file');
await fs.rmdir('/path/to/dir', { recursive: true });
```

## Promise API

```javascript
const { promises } = fs;

await promises.readFile('/path/to/file.txt');
await promises.writeFile('/path/to/file.txt', 'content');
await promises.mkdir('/path/to/dir');
await promises.stat('/path/to/file');
await promises.readdir('/path/to/dir');
```

## 文件监听

```javascript
const watcher = fs.watch('/path/to/file', (eventType, filename) => {
    console.log(`Event: ${eventType}, File: ${filename}`);
});

// 自定义轮询间隔（默认 1000ms）
const watcher = fs.watch('/path/to/file', { interval: 500 }, (eventType, filename) => {
    console.log(eventType, filename);
});

// 关闭监听
watcher.close();
```

## 文件流

### 可读流

```javascript
const rs = fs.createReadStream('/path/to/file', {
    encoding: 'utf8',
    highWaterMark: 65536  // 缓冲区大小
});

rs.on('open', () => console.log('File opened'));
rs.on('data', chunk => console.log('Received chunk:', chunk));
rs.on('end', () => console.log('Read complete'));
rs.on('error', err => console.error('Error:', err));
rs.on('close', () => console.log('Stream closed'));

// 暂停/恢复
rs.pause();
rs.resume();

// 设置编码
rs.setEncoding('utf8');
```

### 可写流

```javascript
const ws = fs.createWriteStream('/path/to/file', {
    encoding: 'utf8',
    flags: 'w'  // 'w' 写入, 'a' 追加
});

ws.on('open', () => console.log('File opened'));
ws.on('drain', () => console.log('Buffer drained'));
ws.on('finish', () => console.log('Write complete'));
ws.on('error', err => console.error('Error:', err));
ws.on('close', () => console.log('Stream closed'));

// 写入数据
ws.write('Hello ');
ws.write('World!\n');

// 结束写入
ws.end('Final data');
ws.end();  // 或直接结束
```
