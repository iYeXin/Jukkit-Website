# polyfill - Promise 与定时器

提供 Promise、setTimeout、setInterval、console 等支持。已通过 `init.js` 预挂载为全局对象。

> **实现说明**：polyfill 的实现位于 `init/polyfill.js`，在初始化脚本中挂载全局对象。

## 引入方式

```javascript
// 方式一：使用全局对象（推荐）
setTimeout(() => console.log('Hello'), 1000);
const result = await Promise.all([p1, p2]);

// 方式二：手动引入
const { setTimeout, setInterval, console } = require('./libs/polyfill');
```

## Promise

> **注意**：Promise 由 Nashorn 引擎原生提供，polyfill 不再提供 Promise 实现。

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!');
    }, 1000);
});

// 使用 Promise
promise
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log('Done'));

// 静态方法
Promise.resolve('value');
Promise.reject(new Error('failed'));
Promise.all([promise1, promise2, promise3]);
Promise.race([promise1, promise2]);
Promise.allSettled([promise1, promise2]);
```

## 定时器

```javascript
// setTimeout
const timeoutId = setTimeout(() => {
    console.log('Delayed message');
}, 1000);

clearTimeout(timeoutId);

// setInterval
const intervalId = setInterval(() => {
    console.log('Repeated message');
}, 1000);

clearInterval(intervalId);

// 传递参数
setTimeout((a, b, c) => {
    console.log(a, b, c);
}, 1000, 'arg1', 'arg2', 'arg3');
```

## console

> **注意**：`console` 对象仅用于快速调试，功能有限。生产环境建议使用 `Logger` 类或 `jukkit.log` 等方法。

```javascript
// 基础日志
console.log('Hello World');
console.info('Info message');
console.warn('Warning message');
console.error('Error message');

// 格式化输出（支持占位符）
console.log('Player %s has %d points', 'Steve', 100);
// 输出: Player Steve has 100 points

// 支持的占位符:
// %s - 字符串
// %d, %i - 整数
// %f - 浮点数
// %j - JSON
// %o, %O - 对象
// %% - 百分号

// 对象输出（自动 JSON 序列化）
console.log({ name: 'Steve', level: 10 });
// 输出: {"name":"Steve","level":10}

// 多参数输出
console.log('User:', player.getName(), 'Level:', player.getLevel());
```
