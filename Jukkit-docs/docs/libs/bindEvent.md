# bindEvent - 事件绑定

用于注册插件卸载时的清理回调。

> **实现说明**：`bindEvent` 的实现位于 `init/bindEvent.js`，在初始化脚本中挂载到 `globalThis._bindEvent`。`src/libs/bindEvent.js` 只是导出该引用。

## 引入方式

```javascript
const bindEvent = require('./libs/bindEvent');
```

## 使用方法

```javascript
// 注册卸载回调
bindEvent('unload', () => {
    console.log('Plugin is unloading...');
    // 清理资源
});
```

## 使用场景

```javascript
const bindEvent = require('./libs/bindEvent');

// 清理定时器
const timerId = setInterval(() => {}, 1000);
bindEvent('unload', () => clearInterval(timerId));

// 关闭服务器
const server = createServer();
bindEvent('unload', () => server.close());

// 保存数据
bindEvent('unload', () => {
    fs.writeFileSync('data.json', JSON.stringify(cache));
});
```
