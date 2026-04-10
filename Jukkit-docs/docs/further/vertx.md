# Vert.x

Jukkit Common 版本内置 [Vert.x](https://vertx.io/)，提供高性能的异步编程能力。

> **注意**：Vert.x 仅在 Common 版本中可用。

## 全局变量

| 变量    | 类型       | 说明                                      |
| ------- | ---------- | ----------------------------------------- |
| `vertx` | Vertx 实例 | 共享实例，多插件共用 event loop，推荐使用 |
| `Vertx` | Class      | Vertx 类，可创建独立实例                  |

## 使用共享实例（推荐）

```javascript
jukkit.onEnable(() => {
    // 使用共享的 vertx 实例
    vertx.createHttpServer()
        .requestHandler(req => {
            req.response()
                .putHeader('content-type', 'text/plain')
                .end('Hello from Jukkit!');
        })
        .listen(8080, result => {
            if (result.succeeded()) {
                jukkit.log('HTTP server started on port 8080');
            } else {
                jukkit.error('Failed to start: ' + result.cause().getMessage());
            }
        });

    return true;
});
```

## 创建独立实例

如果需要完全隔离的 Vertx 环境，可以创建独立实例：

```javascript
const myVertx = Vertx.vertx();

myVertx.createHttpServer()
    .requestHandler(req => req.response().end('Isolated instance'))
    .listen(8081);
```

## TCP 客户端示例

```javascript
const netClient = vertx.createNetClient();

netClient.connect(25565, 'mc.example.com', result => {
    if (result.succeeded()) {
        const socket = result.result();
        socket.handler(buffer => {
            jukkit.log('Received: ' + buffer.toString());
        });
        socket.write('Hello');
    } else {
        jukkit.error('Connection failed: ' + result.cause().getMessage());
    }
});
```

## 定时器示例

Vert.x 提供了高性能的定时器实现：

```javascript
// 一次性定时器
const timerId = vertx.setTimer(1000, id => {
    jukkit.log('Timer fired!');
});

// 周期性定时器
const periodicId = vertx.setPeriodic(1000, id => {
    jukkit.log('Periodic timer fired!');
});

// 取消定时器
vertx.cancelTimer(timerId);
vertx.cancelTimer(periodicId);
```

## 注意事项

1. **共享实例优势**：多个 Jukkit 插件共用同一个 event loop，减少线程开销
2. **线程安全**：Vert.x 是异步非阻塞的，回调在 event loop 线程执行，不要执行阻塞操作
3. **资源释放**：共享实例由 Jukkit-Common 管理，插件禁用时无需手动关闭
