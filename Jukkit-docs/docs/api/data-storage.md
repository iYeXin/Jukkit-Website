# 数据存储

运行时数据存储（无持久化）：

```javascript
// 存储
jukkit.store("key", value);
jukkit.store("counter", 0);
jukkit.store("players", ["Alice", "Bob"]);

// 获取
var counter = jukkit.get("counter");

// 检查
if (jukkit.has("key")) { }

// 删除
jukkit.remove("key");
```
