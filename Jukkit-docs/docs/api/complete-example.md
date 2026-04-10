# 完整示例

```javascript
/// <reference path="../index.d.ts" />

const Logger = require('Logger');
const logger = new Logger('MyPlugin');

var timerId = null;

jukkit.onLoad(function(plugin) {
    logger.info("Loading...");
});

jukkit.onEnable(function(plugin) {
    logger.info("Plugin enabled!");

    // 注册命令
    jukkit.command("hello", function(sender, cmd, label, args) {
        sender.sendMessage("§aHello, " + sender.getName() + "!");
        return true;
    });

    // 监听事件
    jukkit.on("PlayerJoinEvent", function(event) {
        event.getPlayer().sendMessage("§eWelcome!");
    });

    // 定时任务
    timerId = jukkit.runAsyncTimer(1000, function() {
        logger.info("Timer tick");
    });

    return true;
});

jukkit.onDisable(function(plugin) {
    logger.info("Plugin disabled");

    if (timerId !== null) {
        jukkit.cancelTask(timerId);
    }
});
```
