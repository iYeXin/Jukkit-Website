# 资源访问

资源文件放在 `src/assets` 目录下，打包后可通过 `jukkit.resource` API 访问。

## 读取资源

```javascript
// 读取文本资源
const config = jukkit.resource.getAsString('config/default.yml');
const messages = JSON.parse(jukkit.resource.getAsString('config/messages.json'));

// 按行读取
const lines = jukkit.resource.readLines('data/items.csv');

// 获取字节数组
const data = jukkit.resource.get('images/logo.png');
```

## 检查资源

```javascript
// 检查是否存在
if (jukkit.resource.exists('config/default.yml')) { }

// 检查是否有资源
if (jukkit.resource.hasAssets()) { }

// 获取资源数量和大小
jukkit.resource.count();
jukkit.resource.totalSize();
```

## 列出资源

```javascript
// 列出目录下的所有文件和子目录
const items = jukkit.resource.list('config');

// 只列出文件
const files = jukkit.resource.listFiles('config');

// 只列出子目录
const dirs = jukkit.resource.listDirectories('config');

// 获取所有资源路径
const allPaths = jukkit.resource.getAllPaths();
```

## 提取资源

```javascript
// 提取单个资源到指定路径
jukkit.resource.extract('config/default.yml', '/path/to/config.yml');

// 提取资源到插件数据目录
jukkit.resource.extractToDataFolder('config/default.yml', 'config.yml');

// 提取整个目录
const count = jukkit.resource.extractDirectory('templates', '/path/to/templates');

// 提取所有资源到插件数据目录
const total = jukkit.resource.extractAllToDataFolder();
```
