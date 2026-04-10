# Logger - 日志工具

提供格式化的日志输出，**推荐用于生产环境**。

## 引入方式

```javascript
const Logger = require('./libs/Logger');
const logger = new Logger('MyPlugin');
```

## 使用方法

```javascript
const logger = new Logger('MyPlugin');

// 日志级别
logger.info('This is an info message');
logger.warn('This is a warning');
logger.error('This is an error');
logger.debug('This is a debug message');

// 别名
logger.warning('Same as warn');
logger.severe('Same as error');
logger.fine('Same as debug');
logger.finer('Finer debug');
logger.finest('Finest debug');

// 获取/设置前缀
console.log(logger.getPrefix()); // 'MyPlugin'
logger.setPrefix('NewPrefix');
```

## 输出示例

```
[12:00:00 INFO]: [MyPlugin] This is an info message
[12:00:01 WARN]: [MyPlugin] This is a warning
[12:00:02 ERROR]: [MyPlugin] This is an error
```
