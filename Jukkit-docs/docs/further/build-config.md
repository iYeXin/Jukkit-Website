# 构建配置详解

## jukkit.config.js 完整配置

```javascript
module.exports = {
    // 模板配置
    templates: {
        standalone: 'templateJars/jukkit-template-standalone-1.3.0.jar',
        common: 'templateJars/jukkit-template-common-1.3.0.jar'
    },

    project: {
        srcDir: 'src',
        entry: 'index.js',
        init: {
            dir: 'init',
            entry: 'init.js'
        },
        assetsDir: 'src/assets',
        modulesDir: 'modules',
        output: 'dist/modules.zip',
        target: 'standalone'  // 或 'common'，或 ['standalone', 'common']
    },

    pluginPackage: {
        name: 'MyPlugin',
        version: '1.0.0',
        description: 'A Jukkit plugin',
        author: 'iyexin',
        authors: [],
        website: '',
        prefix: '',
        apiVersion: '1.20',
        load: 'POSTWORLD',
        depend: [],
        softdepend: [],
        loadbefore: [],
        output: 'dist/MyPlugin-1.0.0.jar',
        dev: true
    },

    // 目标特定配置
    targets: {
        standalone: {
            depend: []
        },
        common: {
            depend: ['Jukkit-Common']
        }
    },

    upload: {
        enable: false,
        autoPullLogs: true,
        server: {
            url: 'http://localhost:23333',
            apiKey: 'your-api-key',
            daemonId: 'daemon-id',
            instanceId: 'instance-id'
        },
        targetFile: '/plugins/dev_MyPlugin/.jukkit/modules.zip'
    }
};
```

## 模板配置 (templates)

| 配置项       | 类型   | 说明                         |
| ------------ | ------ | ---------------------------- |
| `standalone` | string | Standalone 版本模板 JAR 路径 |
| `common`     | string | Common 版本模板 JAR 路径     |

## 项目配置 (project)

| 配置项       | 类型               | 说明                                             |
| ------------ | ------------------ | ------------------------------------------------ |
| `srcDir`     | string             | 源码目录，该目录下的所有文件会被 Rspack 编译打包 |
| `entry`      | string             | 入口文件路径（相对于 srcDir）                    |
| `init.dir`   | string             | init 目录路径（相对于项目根目录），独立于 srcDir |
| `init.entry` | string             | init 入口文件（相对于 init 目录）                |
| `assetsDir`  | string             | 资源目录路径（相对于项目根目录）                 |
| `modulesDir` | string             | 模块目录路径（相对于项目根目录）                 |
| `output`     | string             | 输出的模块 ZIP 包路径                            |
| `target`     | string \| string[] | 编译目标：`'standalone'`、`'common'` 或数组      |

## 插件配置 (pluginPackage)

| 配置项        | 类型     | 说明                                       |
| ------------- | -------- | ------------------------------------------ |
| `name`        | string   | 插件名称                                   |
| `version`     | string   | 版本号                                     |
| `description` | string   | 插件描述                                   |
| `author`      | string   | 单个作者                                   |
| `authors`     | string[] | 多作者列表，优先于 `author`                |
| `website`     | string   | 插件网站                                   |
| `prefix`      | string   | 日志前缀，默认使用 `name`                  |
| `apiVersion`  | string   | Bukkit API 版本，如 `1.20`                 |
| `load`        | string   | 加载顺序：`STARTUP` 或 `POSTWORLD`（默认） |
| `depend`      | string[] | 硬依赖列表，缺少时插件不会加载             |
| `softdepend`  | string[] | 软依赖列表，缺少时插件仍可加载             |
| `loadbefore`  | string[] | 在此插件之前加载的插件列表                 |
| `dev`         | boolean  | 开发模式，启用热重载                       |

## 目标特定配置 (targets)

`targets` 配置允许为每个编译目标设置不同的配置，会覆盖 `pluginPackage` 中的对应字段：

```javascript
targets: {
    standalone: {
        depend: []  // Standalone 无需依赖
    },
    common: {
        depend: ['Jukkit-Common'],  // Common 需要 Jukkit-Common
        softdepend: ['PlaceholderAPI']  // 可以添加其他依赖
    }
}
```
