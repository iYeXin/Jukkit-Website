# Dev 模式与热重载

Dev 模式支持热重载，无需重复部署 JAR。

## 工作原理

1. 首次构建 JAR 并部署到服务器
2. 插件启动时在 `/plugins/dev_{pluginName}/` 解压模块 ZIP
3. 后续只需上传新的 modules.zip 文件即可热重载

## 配置

```javascript
pluginPackage: {
    name: 'MyPlugin',
    dev: true  // 启用开发模式
}
```

## 热重载流程

1. 首次部署 dev 版 JAR 到服务器
2. 插件启动时解压 modules.zip 到 `plugins/dev_MyPlugin/`
3. 修改代码后运行 `npm run build`
4. 上传新的 modules.zip 文件
5. 插件自动检测变化并重载
