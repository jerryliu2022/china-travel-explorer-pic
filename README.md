# 北京 · 3D 旅行地图

交互式 3D 北京旅行地图网站：基于真实北京市行政区划轮廓（GeoJSON）挤出的纸艺风 3D 底座，
西部、北部程序化山体与永定河、潮白河、温榆河等示意河流，12 个著名景点以"拍立得卡片"
形式按真实地理相对位置立于地图之上。

## 功能

- 北京 16 区真实轮廓挤出 3D 底座，区县描边、纸张配色
- 山川（西山、军都山、燕山）、河流、密云水库示意
- 12 个景点：故宫、天安门、天坛、颐和园、八达岭长城、鸟巢、北海公园、雍和宫、南锣鼓巷、香山、中国尊、明十三陵
- 固定俯视角度与高度，仅支持水平拖拽平移预览（OrbitControls 锁定为 PAN）
- 景点地面标记带英文名称标签；卡片上方有中文名称标签
- 默认只显示视野内距离屏幕中心最近的 5 个景点照片，随拖动动态切换
- 悬停景点照片：其他照片隐藏，照片下方弹出 YouTube 西方游客旅游视频滚动栏
  （缩略图 + 浏览量/点赞量，按浏览量排序，点击跳转 YouTube 观看）
- 照片卡片屏幕空间动态防遮挡，松开后自动归位
- 点击卡片或右侧"十二景"列表，相机水平平移飞往对应景点

## 运行

纯静态站点，无需构建。任选一种方式启动本地服务器：

```bash
python -m http.server 8080
# 或
npx serve .
```

然后访问 http://localhost:8080

## 技术栈

- Three.js 0.160（本地 `assets/lib/`，无需联网）
- 北京边界数据：阿里 DataV GeoAtlas（`assets/data/beijing.json`）
- 景点照片：维基百科/维基共享资源（`assets/img/`）

## 目录结构

```
index.html              入口页面
assets/css/style.css    手账纸艺风样式
assets/js/main.js       Three.js 场景主程序
assets/js/spots.js      景点/山川/河流数据
assets/data/beijing.json  北京市区县 GeoJSON
assets/img/*.jpg        景点照片
assets/lib/             Three.js 及插件
```
