# koa2项目的示例，koa2+mongoose+ejs单纯示例

## 源码说明
### 项目目录说明
```
|-- config                           // 项目开发环境配置，依赖与config包
|   |-- default.js                   // 项目打包部署默认配置
|-- controllers                      // 代码业务逻辑控制层
|   |-- content.js                   // 业务实现
|-- logger                           // 日志的配置文件
|   |-- index.js
|   |-- logjsConfig.js
|-- routers                          // 路由
|   |-- index.js
|-- app.js                           // 服务配置
|-- globals.js                       // 常用包的引入，全局变量引入
|-- package.json                     // 配置项目相关信息，通过执行 npm init 命令创建
|-- README.md                        // 项目说明
```