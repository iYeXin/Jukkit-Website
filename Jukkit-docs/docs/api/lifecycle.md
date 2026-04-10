# 生命周期

## jukkit.onLoad(handler)

设置插件加载时的回调函数。

```javascript
jukkit.onLoad(function(plugin) {
    jukkit.log("Plugin loading...");
});
```

## jukkit.onEnable(handler)

设置插件启用时的回调函数。返回 `true` 表示启用成功。

```javascript
jukkit.onEnable(function(plugin) {
    jukkit.log("Plugin enabled!");
    return true;  // 必须返回 true
});
```

## jukkit.onDisable(handler)

设置插件禁用时的回调函数。

```javascript
jukkit.onDisable(function(plugin) {
    jukkit.log("Plugin disabled");
});
```

## jukkit.onUnload(handler)

设置插件卸载时的回调函数。在 `onDisable` 之后调用。

```javascript
jukkit.onUnload(function() {
    jukkit.log("Plugin unloading...");
});
```
