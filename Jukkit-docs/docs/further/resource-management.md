# 资源管理

Jukkit 支持资源目录打包和访问。资源文件放在 `src/assets` 目录下，打包后可通过 `jukkit.resource` API 访问。

## 资源目录结构

```
src/assets/
├── config/
│   ├── default.yml
│   └── messages.json
├── data/
│   └── items.csv
└── templates/
    └── welcome.txt
```

## 使用资源

```javascript
// 读取文本资源
const config = jukkit.resource.getAsString('config/default.yml');
const messages = JSON.parse(jukkit.resource.getAsString('config/messages.json'));

// 检查资源是否存在
if (jukkit.resource.exists('config/default.yml')) {
    jukkit.log('Config found');
}

// 提取资源到插件数据目录
jukkit.resource.extractToDataFolder('config/default.yml', 'config.yml');

// 列出资源
const files = jukkit.resource.listFiles('config');
files.forEach(file => jukkit.log(' - ' + file));
```

## 完整示例：配置文件初始化

```javascript
const fs = require('fs');

jukkit.onEnable(() => {
    const dataFolder = plugin.getDataFolder();
    const configFile = new java.io.File(dataFolder, 'config.yml');

    // 如果配置文件不存在，从资源中提取默认配置
    if (!configFile.exists()) {
        jukkit.resource.extractToDataFolder('config/default.yml', 'config.yml');
        jukkit.log('Default config extracted');
    }

    // 读取配置
    const configContent = fs.readFileSync(configFile.getAbsolutePath(), 'utf8');

    return true;
});
```
