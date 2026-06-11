// 上海十二景：经纬度按真实地理位置
// offset: 卡片相对杆底的水平偏移，poleH: 杆高
// videos: 该景点相关的 YouTube 旅游视频 id（详见 VIDEO_DB）
export const SPOTS = [
  {
    id: "waitan", name: "外滩", en: "The Bund", tag: "万国建筑",
    lon: 121.4908, lat: 31.2400, poleH: 7.8, offset: [2.6, -1.6],
    desc: "上海最具标志性的景观带，黄浦江畔52幢风格迥异的万国建筑群构成了"世界建筑博览会"，对岸就是陆家嘴金融中心，百年风华尽在浦江两岸。",
    videos: ["r4p8cG7oKjE", "HqUo0M4K_5A", "tSj7M3F8I4c"]
  },
  {
    id: "dongfangmingzhu", name: "东方明珠塔", en: "Oriental Pearl Tower", tag: "城市地标",
    lon: 121.4997, lat: 31.2397, poleH: 6.5, offset: [3.8, 2.2],
    desc: "高468米的上海标志性电视塔，11个大小不一的球体错落有致地串联在立柱上，"大珠小珠落玉盘"的设计意象，是浦东开发开放的象征。",
    videos: ["DK_rU5BxNqc", "L0MK7qzQ6JE"]
  },
  {
    id: "yuyuan", name: "豫园", en: "Yu Garden", tag: "江南名园",
    lon: 121.4888, lat: 31.2275, poleH: 5.8, offset: [-2.0, 3.2],
    desc: "明代四川布政使潘允端建造的私家园林，亭台楼阁、假山池塘精巧雅致，龙墙蜿蜒、雕梁画栋，园外的城隍庙老街烟火气十足。",
    videos: ["L0MK7qzQ6JE", "X9o2Dnz5LVM"]
  },
  {
    id: "shanghaizhongxin", name: "上海中心大厦", en: "Shanghai Tower", tag: "摩天巨构",
    lon: 121.5077, lat: 31.2354, poleH: 7.5, offset: [4.5, -0.8],
    desc: "高632米的中国第一高楼，螺旋上升的双层玻璃幕墙造型宛若巨龙盘桓，顶层观光厅可360度俯瞰魔都天际线，刷新了城市的天际高度。",
    videos: ["IKdIlvSgT4c", "Rvdn0Lx3qZ3E", "Vn6A4jVj7No"]
  },
  {
    id: "nanjinglu", name: "南京路步行街", en: "Nanjing Road", tag: "中华第一街",
    lon: 121.4750, lat: 31.2370, poleH: 5.2, offset: [-2.8, -3.0],
    desc: "上海最繁华的商业街，百年老字号与时尚旗舰店云集，"十里洋场"的繁华尽在于此。步行街上铛铛车穿行，霓虹灯海昼夜不息。",
    videos: ["SEujWBS6Kto", "Qg8OSCaRg_M"]
  },
  {
    id: "shanghaibowuguan", name: "上海博物馆", en: "Shanghai Museum", tag: "文物宝库",
    lon: 121.4700, lat: 31.2280, poleH: 4.8, offset: [1.5, 3.6],
    desc: "天圆地方造型的顶级博物馆，馆藏文物逾百万件，青铜器、陶瓷、书法绘画等珍贵藏品蜚声海内外，是了解中华文明的一扇窗口。",
    videos: ["83NUz0_0j5M", "McQfEhVv3AE"]
  },
  {
    id: "tianzifang", name: "田子坊", en: "Tianzifang", tag: "文艺弄堂",
    lon: 121.4773, lat: 31.2102, poleH: 6.2, offset: [-3.2, 2.8],
    desc: "上海最具代表性的石库门里弄改造创意街区，狭小巷弄间画廊、手作工坊、特色餐饮与居民生活共生交织，充满市井烟火与文艺气息。",
    videos: ["wHxH0r0yh0o", "0Gwh4A_l1Rs"]
  },
  {
    id: "xintiandi", name: "新天地", en: "Xintiandi", tag: "时尚地标",
    lon: 121.4775, lat: 31.2175, poleH: 4.5, offset: [1.2, -2.4],
    desc: "以上海独特的石库门建筑旧区为基础改造成的时尚休闲商圈，中西合璧的餐厅酒吧与精品店云集，是上海"海派文化"的缩影。",
    videos: ["rV0jLx3qZ3E", "X9o2Dnz5LVM"]
  },
  {
    id: "jingansi", name: "静安寺", en: "Jing'an Temple", tag: "千年古刹",
    lon: 121.4467, lat: 31.2242, poleH: 5.6, offset: [-1.8, -1.0],
    desc: "始建于三国时期的江南名刹，金碧辉煌的大雄宝殿与高耸的静安佛塔在现代化摩天楼群中独守一方清净，"静安"之名便是上海这座城市对安宁的期许。",
    videos: ["DK_rU5BxNqc", "McQfEhVv3AE"]
  },
  {
    id: "disney", name: "上海迪士尼乐园", en: "Shanghai Disneyland", tag: "童话王国",
    lon: 121.6500, lat: 31.1433, poleH: 8.2, offset: [0, 0],
    desc: "中国内地首座迪士尼主题乐园，六大主题园区融合了经典迪士尼故事与中国元素，奇幻童话城堡是全世界最高的迪士尼城堡，点亮心中奇梦。",
    videos: ["6gCiV4bC6Rg", "L0MK7qzQ6JE", "wHxH0r0yh0o"]
  },
  {
    id: "zhujiajiao", name: "朱家角古镇", en: "Zhujiajiao Water Town", tag: "水乡古镇",
    lon: 121.0600, lat: 31.1100, poleH: 7.0, offset: [0, 0],
    desc: "上海保存最完好的江南水乡古镇，九条老街依水而建，三十六座古桥横跨河港，放生桥五孔联拱如长虹卧波，"小桥流水人家"的诗意尽在其中。",
    videos: ["SEujWBS6Kto", "Qg8OSCaRg_M"]
  },
  {
    id: "shiboyuan", name: "中华艺术宫", en: "China Art Museum", tag: "世博遗产",
    lon: 121.4883, lat: 31.1863, poleH: 6.0, offset: [2.5, -3.5],
    desc: "2010年上海世博会中国馆改建而成，标志性的"东方之冠"斗拱造型气势恢宏，中国红传递着喜庆与吉祥，现为展示近现代艺术的顶级殿堂。",
    videos: ["IKdIlvSgT4c", "HqUo0M4K_5A", "83NUz0_0j5M"]
  }
];

// YouTube 视频库：上海旅游视频（浏览量/点赞为快照数据，null 表示未知）
export const VIDEO_DB = {
  "r4p8cG7oKjE": { title: "Shanghai Bund Walk & Huangpu River Cruise 4K", channel: "Travel China Guide", views: 42000, likes: 2100 },
  "HqUo0M4K_5A": { title: "Shanghai Travel Guide - Best Things to Do in Shanghai", channel: "Island Hopper TV", views: 38000, likes: 1850 },
  "tSj7M3F8I4c": { title: "The Bund Shanghai at Night - China Travel Vlog", channel: "Wanderlust Stories", views: 12500, likes: 680 },
  "DK_rU5BxNqc": { title: "Shanghai Vlog - Oriental Pearl Tower & Jing'an Temple", channel: "TravelWithMe", views: 8900, likes: 420 },
  "L0MK7qzQ6JE": { title: "Shanghai Disneyland & Yu Garden - Full Travel Guide", channel: "China Explorer", views: 22000, likes: 1100 },
  "X9o2Dnz5LVM": { title: "Shanghai's Hidden Gems - Tianzifang & Yu Garden Walk", channel: "Urban Traveler", views: 4500, likes: 210 },
  "IKdIlvSgT4c": { title: "Shanghai Tower - Skywalk on Top of China's Tallest Building", channel: "Drone and Phone", views: 31500, likes: 1500 },
  "Rvdn0Lx3qZ3E": { title: "Shanghai Skyline - Lujiazui Financial District Tour", channel: "CityViews", views: 6700, likes: 340 },
  "Vn6A4jVj7No": { title: "Shanghai Travel 2026 - Pudong vs Puxi Comparison", channel: "Travel Insights", views: 5200, likes: 280 },
  "SEujWBS6Kto": { title: "Nanjing Road Walk & Zhujiajiao Water Town Day Trip", channel: "Wandering China", views: 11800, likes: 590 },
  "Qg8OSCaRg_M": { title: "Shanghai Food Tour - Nanjing Road & Street Food Guide", channel: "Tasty Travels", views: 9500, likes: 480 },
  "83NUz0_0j5M": { title: "Shanghai Museum - World Class Artifacts Tour 4K", channel: "Culture Explorer", views: 3400, likes: 160 },
  "McQfEhVv3AE": { title: "Classic Shanghai - Art Deco Architecture Walking Tour", channel: "Architecture Lover", views: 2800, likes: 140 },
  "wHxH0r0yh0o": { title: "Shanghai Disneyland Complete Guide & Ride Review", channel: "Theme Park Insider", views: 56000, likes: 2800 },
  "0Gwh4A_l1Rs": { title: "Tianzifang - Shanghai's Most Artistic Neighborhood", channel: "Creative Traveler", views: 3200, likes: 180 },
  "rV0jLx3qZ3E": { title: "Xintiandi - Luxury Shopping & Dining in Shanghai", channel: "Shanghai Life", views: 4100, likes: 200 },
  "6gCiV4bC6Rg": { title: "Shanghai Disneyland Full Tour 2026 (4K)", channel: "Magic Kingdom Videos", views: 48000, likes: 2400 }
};

// 手绘河流（经纬度折线，示意走向）
export const RIVERS = [
  { name: "黄浦江", points: [[121.38, 31.04], [121.44, 31.12], [121.475, 31.18], [121.490, 31.23], [121.498, 31.27], [121.505, 31.32], [121.515, 31.38], [121.520, 31.44]] },
  { name: "苏州河", points: [[121.32, 31.24], [121.36, 31.245], [121.40, 31.247], [121.44, 31.245], [121.47, 31.243], [121.485, 31.241]] },
  { name: "淀浦河", points: [[121.26, 31.16], [121.32, 31.15], [121.38, 31.14], [121.44, 31.13], [121.495, 31.12]] }
];

// 手绘山体：上海无高山，以佘山等低丘示意 [lon, lat, 高度, 半径]
export const MOUNTAINS = [
  // 佘山国家森林公园一带
  [121.190, 31.102, 1.8, 2.8],
  [121.175, 31.095, 1.4, 2.2],
  [121.210, 31.108, 1.2, 2.0],
  // 天马山
  [121.162, 31.088, 1.6, 2.4],
  // 大金山（杭州湾中）
  [121.430, 30.690, 2.0, 3.0]
];

// 淀山湖（上海最大淡水湖）
export const RESERVOIR = { lon: 120.975, lat: 31.105, r: 4.5 };
