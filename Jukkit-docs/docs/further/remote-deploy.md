# 远程部署

支持 MCSManager 自动上传。

## 配置

```javascript
upload: {
    enable: true,
    autoPullLogs: true,
    server: {
        url: 'http://localhost:23333',
        apiKey: 'your-api-key',
        daemonId: 'daemon-id',
        instanceId: 'instance-id'
    },
    targetFile: '/plugins/dev_MyPlugin/.jukkit/modules.zip'
}
```

## 获取配置信息

1. 登录 MCSManager 面板
2. 进入实例详情页
3. 从 URL 中获取 `daemonId` 和 `instanceId`
4. 在面板设置中生成 API 密钥

详细说明请参阅 [MCSManager 上传指南](./mcsmanager-upload)。
