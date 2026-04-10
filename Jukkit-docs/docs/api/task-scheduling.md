# 任务调度

所有任务方法都返回任务 ID，可通过 `jukkit.cancelTask(id)` 取消。

## Tick 级任务（主线程）

基于 Minecraft Tick，1 tick = 50ms。回调在主线程执行。

```javascript
// 立即执行
var taskId = jukkit.runTask(function() { });

// 延迟执行（ticks）
var delayId = jukkit.runTaskLater(20, function() { });  // 1秒后

// 定时执行（ticks）
var timerId = jukkit.runTaskTimer(20, function() { });  // 每秒

// 取消任务
jukkit.cancelTask(timerId);
```

## 毫秒级任务（异步线程）

独立于 Minecraft Tick。回调在异步线程执行。

```javascript
// 异步执行
var asyncId = jukkit.runAsync(function() { });

// 延迟执行（毫秒）
var delayId = jukkit.runAsyncLater(100, function() { });  // 100ms后

// 定时执行（毫秒）
var timerId = jukkit.runAsyncTimer(50, function() { });  // 每50ms

// 取消任务
jukkit.cancelTask(timerId);
```

## 线程安全

异步任务中不能直接调用 Bukkit API，需要切换回主线程：

```javascript
jukkit.runAsync(function() {
    // 异步执行耗时操作
    var result = heavyComputation();

    // 切换回主线程
    jukkit.runTask(function() {
        jukkit.getServer().broadcastMessage("Result: " + result);
    });
});
```
