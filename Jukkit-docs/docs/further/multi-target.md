# 多目标编译

Jukkit 1.3.0+ 支持同时编译多个版本，方便分发和测试。

## 配置方式

```javascript
project: {
    target: ['standalone', 'common']  // 同时编译两个版本
}
```

## 输出文件

单目标编译：
- `dist/MyPlugin-1.0.0.jar`

多目标编译：
- `dist/MyPlugin-1.0.0-standalone.jar`
- `dist/MyPlugin-1.0.0-common.jar`

## 版本差异

| 特性             | Standalone（不推荐） | Common（推荐）                |
| ---------------- | -------------------- | ----------------------------- |
| Nashorn 引擎     | 内嵌                 | 来自 Jukkit-Common            |
| Vert.x           | ❌ 不支持             | ✅ 支持                        |
| 前置插件         | 无需                 | 需要 Jukkit-Common            |
| Node.js 核心模块 | ❌ 不支持             | 未来支持                      |
| npm 生态         | ❌ 不支持             | 未来支持                      |
| JAR 体积         | ~2.5 MB              | > 0.05 MB（取决于项目复杂度） |
| 未来发展         | 维护模式             | 主要开发方向                  |

## 体积对比

| 组件                   | 大小                          |
| ---------------------- | ----------------------------- |
| Jukkit-Common 前置插件 | ~8.5 MB                       |
| Standalone 方案插件    | ~2.5 MB                       |
| Common 方案插件        | > 0.05 MB（取决于项目复杂度） |

## 选择建议

- **新项目**：推荐使用 Common 版本，未来支持更多功能
- **多插件环境**：使用 Common 版本，共享依赖减少总体积
- **需要 Vert.x**：必须使用 Common 版本
- **简单场景**：Standalone 版本适合不想安装前缀插件的情况
- **分发插件**：可同时编译两个版本，让用户自行选择

> **注意**：Standalone 版本在可预见的未来不会支持 Node.js 核心模块和 npm 生态，未来的开发重心是 Common 版本。
