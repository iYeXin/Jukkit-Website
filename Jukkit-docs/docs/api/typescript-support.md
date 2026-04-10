# TypeScript 类型支持

Jukkit 提供完整的 TypeScript 类型定义，支持两种使用方式。

## 方式一：JavaScript + 类型提示

在 `.js` 文件顶部添加三斜线指令：

```javascript
/// <reference path="../index.d.ts" />
```

只需要用编辑器打开一次包含该指令的文件，即可在整个项目中启用类型支持。

## 方式二：TypeScript 编译

启用 TypeScript 编译获得完整的类型检查：

```javascript
// jukkit.config.js
project: {
    typescript: {
        enable: true
    }
}
```

详见 [进阶知识 - TypeScript 支持](./进阶知识.md#typescript-支持)。

## 类型推断

`jukkit.on()` 方法会根据事件名称自动推断回调函数中 `event` 参数的类型：

```javascript
/// <reference path="../index.d.ts" />

// event 自动推断为 PlayerJoinEvent 类型
jukkit.on("PlayerJoinEvent", function(event) {
    var player = event.getPlayer();      // Player 类型
    var message = event.getJoinMessage(); // string 类型
});

// 带优先级时同样支持类型推断
jukkit.on("BlockBreakEvent", "HIGH", function(event) {
    var player = event.getPlayer();  // Player 类型
    var block = event.getBlock();    // Block 类型
    event.setCancelled(true);
});
```

## 类型定义文件结构

```
index.d.ts              # 入口文件
types/
├── global.d.ts         # 全局对象定义
├── jukkit.d.ts         # Jukkit API 核心定义
├── classes.d.ts        # Bukkit 核心类定义
├── events.d.ts         # 事件定义
└── config.d.ts         # 配置类型定义
```
