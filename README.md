# lugia-iconfont

## 目录说明

### ai/

存放 Adobe Illustrator 源文件

### font/

生成的字体图标文件，**供前端使用**

 前缀 `lugia-icon` 的文件是单色字体图标文件
 
 前缀 `lugia-symbol-icon` 的文件是彩色图标文件

### font-css-module/

生成的字体图标文件，**供前端使用**，**供 css module 使用**

### svg/

由 **ai** 存储为单个的 **svg** 图标

### svg/symbol

用于存储彩色图标

该文件下`svg图片`的尽量使用`symbol_`做为的前缀，以便于收集图标信息

例如： `symbol_basic.svg`
## 使用

```bash
# 安装依赖
yarn

# 在 font 目录下生成字体图标文件
yarn run build
```

## `loading` 图标

`loading` 图标增加一个类名 `lugia-icon-utils-loading`

## 如何在 `lugia-web` 中使用

如果图标有更新，运行 `yarn run build` 更新生成的字体图标文件

拷贝 `font/` 目录下的文件覆盖 `lugia-web` 中的对应字体文件即可

### 特殊文件说明

 `lugia-iconConfig.json` 生成的所有图标的集合信息
 
### 注意事项
彩色图标
    
1.导出 .svg 时尽量减少代码中带有  

`<?xml version="1.0" encoding="UTF-8"?>`
    
比如 做图工具 Sketch 可以安装 SVGO Compressor 插件 来压缩文件体积
