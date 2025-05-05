# 警报器模拟器 (Siren Simulator)

一个基于Web的警报器模拟器，提供多种警报声效和视觉效果。

## 功能特点

- 多种警报器选择：
  - 防空警报
  - 救护车警报
  - 消防车警报
  - 警车警报（两种不同音效）
  - 路边警告灯

- 视听效果：
  - 逼真的警报声音效果
  - 动态闪烁的警示灯效果
  - 支持循环播放
  - 一键静音控制

## 技术实现

- 纯原生JavaScript实现，无需任何框架
- 使用Web Audio API处理音频
- CSS动画实现灯光效果
- 响应式设计，支持各种设备

## 使用方法

1. 直接在浏览器中打开index.html文件
2. 点击任意警报器图标开始播放
3. 再次点击同一图标停止播放
4. 点击右上角的音量图标可以控制声音开关
5. 同一时间只能播放一个警报器的声音

## 浏览器支持

- Chrome（推荐）
- Firefox
- Safari
- Edge

## 注意事项

本应用仅供娱乐学习使用，切勿用于非法用途，后果自负！

## 文件结构

```
Siren/
├── static/
│   ├── img/
│   └── music/
│       ├── alarm.mp3
│       ├── ambulance.mp3
│       ├── fire.mp3
│       ├── police1.mp3
│       ├── police2.mp3
│       └── warning.mp3
├── index.html
├── script.js
└── styles.css
```

## 许可证

本应用基于 安卓警用报警器（com.policealarm.yixiang）重构

本项目基于 MIT 许可证开源。

Copyright (c) 2025 muzihuaner 