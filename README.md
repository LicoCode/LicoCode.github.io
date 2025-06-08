# 天气交互展示项目

一个实时展示天气效果并具有趣味交互功能的网页项目，包含动态天气动画、日夜模式切换和隐藏式内容探索功能。

## ✨ 功能特性
- 🌦️ 实时天气效果模拟（雨、雪、闪电、多云）
- 🌓 自动日夜模式切换（根据当地日出日落时间）
- 🎮 交互式状态图标（鼠标悬停/点击/触摸触发动画）
- 💬 隐藏式弹窗内容（通过特定交互次数触发）
- 🌪️ 风力影响动画效果（根据实际风速参数）
- 📱 响应式设计（适配移动端和PC端）

## 🛠️ 技术栈
- **前端框架**: Vanilla JavaScript
- **动画引擎**: HTML5 Canvas + CSS Animation
- **天气服务**: 集成第三方天气API
- **构建工具**: 原生ES Module

## 📂 项目结构
LICode.github.io/
├── assets/            # 静态资源
│   └── images/        # 图片素材
│       ├── aaa.jpg    # 生气图片
│       ├── eee.jpg    # 清醒图片
│       ├── l.jpg     # 网站ICO
│       └── zzz.jpg   # 睡觉图片
├── css/               # 样式文件
│   ├── daynight.css   # 日夜模式样式
│   ├── global.css      # 全局样式
│   ├── modal.css      # 弹窗样式
│   ├── status.css      # 状态样式
│   └── weather.css    # 天气动画样式
├── js/                # 脚本文件
│   ├── daynight.js     # 日夜模式逻辑
│   ├── main.js        # 主逻辑入口
│   ├── preload.js     # 预加载资源
│   ├── status.js       # 状态交互逻辑
│   ├── weather.js     # 天气效果核心逻辑
│   └── weatherService.js # 天气服务接口
├── CNAME              # 自定义域名配置
├── index.html         # 主页面
└── README.md          # 项目说明文件

## 🚀 快速使用
```bash
# 克隆仓库
git clone https://github.com/LicoCode/LicoCode.github.io.git

# 直接访问
https://licocode.github.io/
https://ilico.cn/
```
