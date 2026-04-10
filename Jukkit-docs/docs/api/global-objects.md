# 全局对象

脚本执行环境中可用的全局对象：

## 引擎内置（Nashorn）

| 对象       | 说明                                                 |
| ---------- | ---------------------------------------------------- |
| `Java`     | Java 类型访问，如 `Java.type("java.util.ArrayList")` |
| `java`     | Java 包根，如 `java.lang.System.out.println()`       |
| `org`      | Java 包根，如 `org.bukkit.Bukkit`                    |
| `Packages` | 访问任意 Java 包                                     |

## 环境提供

| 对象     | 说明                             |
| -------- | -------------------------------- |
| `jukkit` | Jukkit API 主对象（详见下文）    |
| `bukkit` | `org.bukkit.Bukkit` 类引用       |
| `server` | 当前 Bukkit Server 实例          |
| `plugin` | 当前插件实例（JsPluginTemplate） |

## Common 版本额外变量

| 变量    | 类型       | 说明                            |
| ------- | ---------- | ------------------------------- |
| `vertx` | Vertx 实例 | 共享实例，多插件共用 event loop |
| `Vertx` | Class      | Vertx 类，可创建独立实例        |
