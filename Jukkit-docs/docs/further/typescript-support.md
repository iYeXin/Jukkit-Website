# TypeScript 支持

Jukkit 提供完整的 TypeScript 类型定义，支持两种使用方式：

## 方式一：JavaScript + 类型提示（默认）

在 `.js` 文件顶部添加三斜线指令：

```javascript
/// <reference path="../index.d.ts" />
```

只需要用编辑器打开一次包含该指令的文件，即可在整个项目中启用类型支持。

## 方式二：TypeScript 编译（可选）

启用 TypeScript 编译，获得完整的类型检查：

### 1. 配置 jukkit.config.js

```javascript
project: {
    srcDir: 'src',
    entry: 'index.js',
    typescript: {
        enable: true,              // 启用 TypeScript 编译
        configPath: 'tsconfig.json',  // 可选，默认 'tsconfig.json'
        entry: 'index.ts'          // 可选，默认使用 entry 替换为 .ts
    }
}
```

### 2. TypeScript 配置选项

| 配置项       | 类型    | 默认值            | 说明                     |
| ------------ | ------- | ----------------- | ------------------------ |
| `enable`     | boolean | `false`           | 是否启用 TypeScript 编译 |
| `configPath` | string  | `'tsconfig.json'` | tsconfig.json 路径       |
| `entry`      | string  | entry 替换为 .ts  | TypeScript 入口文件      |

### 3. 构建流程

启用 TypeScript 后，构建流程变为：

```
TypeScript 编译 → Rspack 打包 → JAR 生成
```

### 4. NPM 脚本

```bash
# 完整构建（包含 TypeScript 编译）
npm run build

# 仅类型检查
npm run typecheck

# TypeScript 监听模式
npm run tsc:watch
```

## 类型推断

`jukkit.on()` 方法会根据事件名称自动推断回调函数中 `event` 参数的类型：

```typescript
// src/index.ts
/// <reference path="../index.d.ts" />

// event 自动推断为 PlayerJoinEvent 类型
jukkit.on("PlayerJoinEvent", (event) => {
    const player = event.getPlayer();  // Player 类型
    player.sendMessage("Welcome!");
});

// 带优先级时同样支持类型推断
jukkit.on("BlockBreakEvent", "HIGH", (event) => {
    event.setCancelled(true);
});
```

## tsconfig.json 示例

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist/ts",
    "rootDir": "./src",
    "baseUrl": ".",
    "paths": {
      "Logger": ["./types/modules/Logger.d.ts"],
      "fs": ["./types/modules/fs.d.ts"],
      "fetch": ["./types/modules/fetch.d.ts"]
    }
  },
  "include": ["src/**/*", "types/**/*.d.ts", "index.d.ts"],
  "exclude": ["node_modules", "dist"]
}
```
