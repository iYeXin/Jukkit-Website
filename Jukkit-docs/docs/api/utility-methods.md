# 工具方法

## 日志

```javascript
jukkit.log("Info message");      // INFO
jukkit.warn("Warning message");  // WARNING
jukkit.error("Error message");   // SEVERE
```

## 获取实例

```javascript
// 获取插件实例
var plugin = jukkit.getPlugin();
jukkit.log(plugin.getPluginName());    // 插件名
jukkit.log(plugin.getPluginVersion()); // 版本号

// 获取 Bukkit 服务器
var server = jukkit.getServer();
jukkit.log(server.getVersion());
```

## 注入全局变量

```javascript
jukkit.injectGlobalVariable('myGlobal', { foo: 'bar' });
// 之后可以直接使用 myGlobal
```
