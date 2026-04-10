# 事件监听

## jukkit.on(eventName, handler)

监听指定事件（支持类型推断）。

```javascript
jukkit.on("PlayerJoinEvent", function(event) {
    var player = event.getPlayer();
    player.sendMessage("Welcome!");
});
```

## jukkit.on(eventName, priority, handler)

带优先级监听事件。

```javascript
// 优先级："LOWEST", "LOW", "NORMAL", "HIGH", "HIGHEST", "MONITOR"
jukkit.on("BlockBreakEvent", "HIGH", function(event) {
    event.setCancelled(true);
});
```

## 使用事件类

```javascript
var PlayerJoinEvent = Java.type("org.bukkit.event.player.PlayerJoinEvent");

jukkit.on(PlayerJoinEvent, function(event) {
    var player = event.getPlayer();
    player.sendMessage("Welcome!");
});
```

## 支持的事件类型

**玩家事件：**
- `PlayerJoinEvent`, `PlayerQuitEvent`, `PlayerDeathEvent`
- `PlayerRespawnEvent`, `PlayerMoveEvent`, `PlayerTeleportEvent`
- `PlayerInteractEvent`, `PlayerChatEvent`, `PlayerCommandPreprocessEvent`
- `PlayerDropItemEvent`, `PlayerPickupItemEvent`

**方块事件：**
- `BlockPlaceEvent`, `BlockBreakEvent`, `BlockBurnEvent`
- `BlockDispenseEvent`, `BlockRedstoneEvent`

**实体事件：**
- `CreatureSpawnEvent`, `EntityDeathEvent`, `EntityDamageEvent`
- `EntityTargetEvent`, `EntityExplodeEvent`

**库存事件：**
- `InventoryClickEvent`, `InventoryDragEvent`, `CraftItemEvent`

**世界事件：**
- `WeatherChangeEvent`, `LightningStrikeEvent`, `StructureGrowEvent`
