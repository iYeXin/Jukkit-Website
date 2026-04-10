# 命令注册

## jukkit.command(name, executor)

简单命令注册。

```javascript
jukkit.command("ping", function(sender, cmd, label, args) {
    sender.sendMessage("Pong!");
    return true;
});
```

## jukkit.command(name, options)

完整命令注册。

```javascript
var CommandOptions = Java.type("iyexin.jukkit.core.JukkitAPI$CommandOptions");

jukkit.command("hello", new CommandOptions()
    .description("Say hello")
    .usage("/hello [player]")
    .permission("myplugin.hello")
    .aliases("hi", "hey")
    .executor(function(sender, cmd, label, args) {
        sender.sendMessage("Hello!");
        return true;
    })
    .tabComplete(function(sender, cmd, alias, args) {
        return ["world", "server"];
    })
);
```
