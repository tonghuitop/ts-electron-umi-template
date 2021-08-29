# umi+electron+typescript 一个模版文件
---
一个基于umijs + electron + typescript的模版

### 主要特性
- 支持整个应用的热重载
- 全面支持typescript，使用bable/reset-typescript编译。【由于webpack配置文件, 也使用了ts文件，所以安装了typescript和ts-node。】
- 使用webpack分打包main和preload
- 使用electron-builder,进行app打包

### 项目结构
```
|-- config
|   |-- icon.icns                         // 打包后程序图标 MacOS
|   |-- icon.ico                          // 打包后程序图标 Windows
|   |-- webpack.common.config.ts          // webpack-main和webpack-preload 基础配置
|   |-- webpack.dev.config.js             // webpack-main和webpack-preload 开发配置
|   `-- webpack.main.prod.config.js       // webpack-main和webpack-preload 正式配置
|-- dist                                  // 项目编译输出目录
|   |-- main                              // 主程序编译目录
|   `-- renderer                          // 页面编译目录
|-- release                               // 打包输出目录
|-- src                                   // 开发目录
|   |-- main                              // 主程序目录
|   |   `-- main.js                       // 主程序入口
|   |-- preload                           // 预加载目录
|   |   `-- main.js                       // 预加载程序入口
|   `-- renderer                          // React项目页面
|       |-- assets
|       |   `-- yay.jpg
|       |-- config
|       |   |-- config.ts                 // umijs配置
|       |-- models
|       |   `-- global.js
|       |-- pages
|           `-- index.js
|-- package.json                          // 项目依赖以及打包配置
`-- README.md                             // 项目说明文档
```

### 环境搭建
下载依赖
```
yarn || npm install
```

### 开发
```
yarn dev || npm run dev
```

### 打包
```
yarn dmg || npm run dmg   // 打包macOS
yarn exe || npm run exe   // 打包windows
yarn dist                 // 打出当前系统平台包
```

### 打包配置 `package.json`
```
{
  ...
  "build": {
    "productName": "electron-umi",// 程序名称
    "files": [ // 需要打包的文件
      "dist/",
      "node_modules/",
      "package.json"
    ],
    "mac": { // 打包mac版本
      "category": "your.app.category.type", // mac app分类 
      "target": [ // 打包类型
        "dmg",
        "zip"
      ]
    },
    "win": { // 打包windows版本
      "target": [ // 打包类型
        "nsis"
      ]
    },
    "nsis": {
      "oneClick": false,
      "perMachine": true,
      "allowToChangeInstallationDirectory": true
    },
    "directories": { // 打包后输出目录
      "output": "release"
    },
    "appId": "com.cn.littlestrong.demo", // appstore包名
    "asar": false //  是否加密处理
  },
}
```
