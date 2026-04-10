# jukkit.resource - 资源访问 (v1.2.0+)

用于访问打包在插件中的资源文件。资源文件放在 `src/assets` 目录下，打包后可通过此 API 访问。

## 配置资源目录

在 `jukkit.config.js` 中配置：

```javascript
module.exports = {
    project: {
        srcDir: 'src',
        entry: 'index.js',
        assetsDir: 'src/assets',  // 资源目录路径
    },
    // ...
};
```

## 资源目录结构示例

```
my-plugin/
├── src/
│   ├── index.js
│   └── assets/
│       ├── config/
│       │   ├── default.yml
│       │   └── messages.json
│       ├── data/
│       │   └── items.csv
│       └── templates/
│           └── welcome.txt
└── jukkit.config.js
```

## 读取资源

```javascript
// 读取文本资源
const config = jukkit.resource.getAsString('config/default.yml');
const messages = JSON.parse(jukkit.resource.getAsString('config/messages.json'));

// 按行读取
const lines = jukkit.resource.readLines('data/items.csv');
lines.forEach(line => {
    jukkit.log('Item: ' + line);
});

// 获取字节数组（适用于二进制文件）
const data = jukkit.resource.get('images/logo.png');

// 获取输入流
const stream = jukkit.resource.getStream('data/large.bin');
```

## 检查资源

```javascript
// 检查资源是否存在
if (jukkit.resource.exists('config/default.yml')) {
    jukkit.log('Config found');
}

// 检查是否有资源
if (jukkit.resource.hasAssets()) {
    jukkit.log('Assets loaded');
}

// 获取资源数量和大小
jukkit.log('Asset count: ' + jukkit.resource.count());
jukkit.log('Total size: ' + jukkit.resource.totalSize() + ' bytes');

// 获取单个资源大小
const size = jukkit.resource.size('config/default.yml');
```

## 列出资源

```javascript
// 列出目录下的所有文件和子目录
const items = jukkit.resource.list('config');
items.forEach(item => jukkit.log(' - ' + item));

// 只列出文件
const files = jukkit.resource.listFiles('config');
files.forEach(file => jukkit.log('File: ' + file));

// 只列出子目录
const dirs = jukkit.resource.listDirectories('config');
dirs.forEach(dir => jukkit.log('Dir: ' + dir));

// 获取所有资源路径
const allPaths = jukkit.resource.getAllPaths();
allPaths.forEach(path => jukkit.log('Asset: ' + path));
```

## 提取资源

```javascript
// 提取单个资源到指定路径
jukkit.resource.extract('config/default.yml', '/path/to/config.yml');

// 提取资源到插件数据目录
jukkit.resource.extractToDataFolder('config/default.yml', 'config.yml');
// 文件将被提取到 plugins/MyPlugin/config.yml

// 提取整个目录
const count = jukkit.resource.extractDirectory('templates', '/path/to/templates');
jukkit.log('Extracted ' + count + ' files');

// 提取所有资源到指定目录
const total = jukkit.resource.extractAll('/path/to/output');
jukkit.log('Extracted ' + total + ' assets');

// 提取所有资源到插件数据目录
const total = jukkit.resource.extractAllToDataFolder();
jukkit.log('Extracted ' + total + ' assets');
```

## 完整示例：配置文件初始化

```javascript
const fs = require('./libs/fs');

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
    // 解析配置...

    return true;
});
```

## 完整示例：多语言支持

```javascript
// src/assets/lang/en.json
// src/assets/lang/zh_cn.json

let messages = {};

jukkit.onEnable(() => {
    // 加载语言文件
    const lang = 'zh_cn'; // 从配置中获取
    const langFile = 'lang/' + lang + '.json';

    if (jukkit.resource.exists(langFile)) {
        messages = JSON.parse(jukkit.resource.getAsString(langFile));
        jukkit.log('Loaded language: ' + lang);
    } else {
        // 回退到英语
        messages = JSON.parse(jukkit.resource.getAsString('lang/en.json'));
        jukkit.warn('Language file not found, using English');
    }

    return true;
});

function getMessage(key) {
    return messages[key] || key;
}

// 使用
jukkit.on('PlayerJoinEvent', (event) => {
    const player = event.getPlayer();
    player.sendMessage(getMessage('welcome'));
});
```
