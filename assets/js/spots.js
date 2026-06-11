// 北京十二景：经纬度按真实地理位置（不要求精确，反映空间分布）
// offset: 卡片相对杆底的水平偏移（避免市中心卡片重叠），poleH: 杆高
// videos: 该景点相关的 YouTube 西方游客旅游视频 id（详见 VIDEO_DB）
export const SPOTS = [
  {
    id: "gugong", name: "故宫博物院", en: "The Forbidden City", tag: "世界遗产",
    lon: 116.3972, lat: 39.9163, poleH: 8.2, offset: [2.2, -1.2],
    desc: "明清两代的皇家宫殿，旧称紫禁城。现存规模最大、保存最完整的木结构古建筑群，红墙金瓦，殿宇连云，1987 年列入《世界遗产名录》。",
    videos: ["BHsdSe4VPaw", "T8z-VWzDgvI", "NU_pUiJoTBU", "SZj-aTVYVVU"]
  },
  {
    id: "tiananmen", name: "天安门", en: "Tian'anmen", tag: "城市象征",
    lon: 116.3976, lat: 39.9087, poleH: 4.6, offset: [-3.6, 2.6],
    desc: "明清皇城正门，始建于明永乐年间。城楼前的天安门广场是世界上最大的城市中心广场之一，见证了无数历史时刻。",
    videos: ["BHsdSe4VPaw", "T8z-VWzDgvI", "s1E2woRJgr4", "7R1MIYmp9lM"]
  },
  {
    id: "tiantan", name: "天坛", en: "Temple of Heaven", tag: "世界遗产",
    lon: 116.4107, lat: 39.8822, poleH: 6.4, offset: [1.2, 3.8],
    desc: "明清两代皇帝祭天祈谷之所。祈年殿三重檐蓝瓦攒尖顶直指苍穹，是中国古代建筑\u201c天人合一\u201d思想的极致表达。",
    videos: ["T8z-VWzDgvI", "fisuPAUpGks", "SZj-aTVYVVU", "7R1MIYmp9lM"]
  },
  {
    id: "yiheyuan", name: "颐和园", en: "Summer Palace", tag: "皇家园林",
    lon: 116.2755, lat: 39.9988, poleH: 6.6, offset: [-2.0, 0],
    desc: "以昆明湖、万寿山为基址的皇家园林，长廊画卷、佛香阁影、十七孔桥卧波，\u201c虽由人作，宛自天开\u201d的造园典范。",
    videos: ["T8z-VWzDgvI", "UI25GwKqTZY", "9y6QmP2BEW0"]
  },
  {
    id: "badaling", name: "八达岭长城", en: "Badaling Great Wall", tag: "世界遗产",
    lon: 115.9931, lat: 40.3625, poleH: 7.2, offset: [0, 0],
    desc: "明长城中最具代表性的一段，雄踞军都山关沟古道。崇山峻岭间长城蜿蜒如龙，\u201c不到长城非好汉\u201d即指于此。",
    videos: ["CaNgxgkyi7s", "hH3-roIQXec", "s1E2woRJgr4", "7R1MIYmp9lM"]
  },
  {
    id: "niaochao", name: "国家体育场 · 鸟巢", en: "Bird's Nest Stadium", tag: "现代地标",
    lon: 116.3906, lat: 39.9929, poleH: 5.8, offset: [-1.2, -2.8],
    desc: "2008 年北京奥运会主体育场，由钢结构\u201c编织\u201d而成的巨型容器，与水立方隔轴相望，是双奥之城的新名片。",
    videos: ["Jsn8r8uboiM", "vvktMUBksqM", "8kprn5-pcA4", "7R1MIYmp9lM"]
  },
  {
    id: "beihai", name: "北海公园", en: "Beihai Park", tag: "皇家园林",
    lon: 116.3832, lat: 39.9254, poleH: 9.8, offset: [-3.2, -2.2],
    desc: "辽金以来近千年历史的皇家园林。琼华岛上藏式白塔倒映碧波，\u201c让我们荡起双桨\u201d唱的就是这里。",
    videos: ["fisuPAUpGks", "vvktMUBksqM", "T7lYXrNKX68"]
  },
  {
    id: "yonghegong", name: "雍和宫", en: "Lama Temple", tag: "古刹梵音",
    lon: 116.4177, lat: 39.9477, poleH: 4.9, offset: [4.2, -2.0],
    desc: "清雍正帝的潜邸改建而成的藏传佛教寺院，黄瓦红墙、香火鼎盛，宫内 18 米高的白檀木弥勒大佛举世罕见。",
    videos: ["6LXRXIr7maQ", "6Wc28rP8GWM"]
  },
  {
    id: "nanluoguxiang", name: "南锣鼓巷", en: "Nanluoguxiang Hutong", tag: "历史街区",
    lon: 116.4037, lat: 39.9370, poleH: 7.4, offset: [1.6, -3.8],
    desc: "元大都\u201c里坊制\u201d格局保存最完整的胡同街区，八百米主巷两侧鱼骨状排开十六条胡同，四合院与文创小店交错共生。",
    videos: ["fisuPAUpGks", "pyHwLnMmWs0", "6Wc28rP8GWM"]
  },
  {
    id: "xiangshan", name: "香山公园", en: "Fragrant Hills", tag: "山林红叶",
    lon: 116.1889, lat: 39.9897, poleH: 8.4, offset: [-2.5, 1.5],
    desc: "西山余脉上的皇家园林，静宜园二十八景遗韵犹存。每至深秋黄栌漫山红遍，\u201c香山红叶\u201d名满天下。",
    videos: ["hzd8ZzLjkFU"]
  },
  {
    id: "zhongguozun", name: "中国尊", en: "CITIC Tower (China Zun)", tag: "现代地标",
    lon: 116.4602, lat: 39.9115, poleH: 6.8, offset: [4.6, 1.6],
    desc: "高 528 米的北京第一高楼（中信大厦），造型取意古代礼器\u201c尊\u201d，矗立 CBD 天际线之巅，俯瞰整座京城。",
    videos: ["BHsdSe4VPaw", "rm3lhwLejsM", "HT8n2yXLRzU", "T3NEoYKGqZE"]
  },
  {
    id: "shisanling", name: "明十三陵", en: "Ming Tombs", tag: "世界遗产",
    lon: 116.2284, lat: 40.2557, poleH: 5.4, offset: [0, 0],
    desc: "明代十三位皇帝的陵寝建筑群，背倚天寿山，神道石像生肃立六百年，是中国帝陵建筑的集大成之作。",
    videos: ["O0zEgBq46_A"]
  }
];

// YouTube 视频库：西方游客旅游视频（浏览量/点赞为收集时的快照数据，null 表示未知）
export const VIDEO_DB = {
  "BHsdSe4VPaw": { title: "China is NOT What I Expected \ud83c\udde8\ud83c\uddf3 48 Hours in Beijing", channel: "Homeless Pelican", views: 31100, likes: 1800 },
  "T8z-VWzDgvI": { title: "Best Things to Do Beijing China Travel Guide 2026 4K", channel: "Island Hopper TV", views: 18500, likes: 374 },
  "NU_pUiJoTBU": { title: "Forbidden City Vlog - Inside China's Imperial Palace!", channel: "The Curious Tourists", views: 2500, likes: 14 },
  "SZj-aTVYVVU": { title: "Top things to do in Beijing, 3 days in Beijing", channel: "Hannah and Ben", views: 211, likes: 5 },
  "s1E2woRJgr4": { title: "First Time in China \ud83c\udde8\ud83c\uddf3 Beijing Travel Vlog", channel: "Maryam S", views: 362, likes: 39 },
  "7R1MIYmp9lM": { title: "EPIC Beijing Trip | Great Wall, Forbidden City, Temple of Heaven", channel: "Your Average Gent", views: 196, likes: 7 },
  "fisuPAUpGks": { title: "BEIJING VLOG - Great Wall, Temple of Heaven, Beihai Park & more", channel: "Lesley Adina", views: 2100, likes: 188 },
  "UI25GwKqTZY": { title: "Taiji Class and Summer Palace (Boat Ride) - Beijing", channel: "DoctorKanayo", views: 380, likes: null },
  "9y6QmP2BEW0": { title: "China Travel Vlog | Day 1 in Beijing | Summer Palace", channel: "Selena Thinking Out Loud", views: 173, likes: 6 },
  "CaNgxgkyi7s": { title: "10 Million People a Year? The Great Wall's Most Popular Section", channel: "Drone and Phone", views: 5800, likes: 46 },
  "hH3-roIQXec": { title: "Great Wall of China: Guide for Foreigners \ud83c\udde8\ud83c\uddf3", channel: "Vanessa Huang", views: 2200, likes: 57 },
  "vvktMUBksqM": { title: "Beijing Exploration: Forbidden City, Olympic Stadium & Peking Duck", channel: "Dunney Travels", views: null, likes: null },
  "Jsn8r8uboiM": { title: "Beijing Culinary Journey & Bird's Nest Experience", channel: "Sun Kissed Bucket List", views: null, likes: null },
  "8kprn5-pcA4": { title: "Beijing Bird's Nest Concert Experience", channel: "Jack Aynsley Travel", views: null, likes: null },
  "T7lYXrNKX68": { title: "Beijing's Hidden Gems: Temple of Heaven & Beihai Park", channel: "Sven Travel", views: null, likes: null },
  "6LXRXIr7maQ": { title: "Is China Really Non-Religious? Inside Beijing's Most Crowded Temple", channel: "Chinese Life with Judy & Mao", views: 23200, likes: 673 },
  "6Wc28rP8GWM": { title: "First Day in Beijing \ud83c\udde8\ud83c\uddf3 Culture Shock, Lama Temple & Hutongs", channel: "Diversity Travellers", views: 137, likes: 10 },
  "pyHwLnMmWs0": { title: "Walking in Beijing Hutongs (Nanluoguxiang)", channel: "Massimo Nalli", views: 2000, likes: 16 },
  "hzd8ZzLjkFU": { title: "Fragrant Hills Park Autumn Colors: Beijing Day Trip", channel: "James and Keli", views: null, likes: null },
  "rm3lhwLejsM": { title: "CITIC Tower: Explore Beijing's Tallest Building", channel: "KPF", views: 4400, likes: 84 },
  "HT8n2yXLRzU": { title: "Beijing: CITIC / China Zun", channel: "Skyscraper Museum", views: 4000, likes: 58 },
  "T3NEoYKGqZE": { title: "Beijing Rush Hour Walk | Guomao CBD (4K)", channel: "Slow Walker", views: 2100, likes: null },
  "O0zEgBq46_A": { title: "Exploring the Imperial Tombs of the Ming and Qing Dynasties", channel: "YouTube", views: null, likes: null }
};

// 手绘河流（经纬度折线，不求精确，示意走向）
export const RIVERS = [
  { name: "永定河", points: [[115.78, 40.12], [115.95, 40.02], [116.09, 39.95], [116.20, 39.86], [116.30, 39.74], [116.42, 39.58]] },
  { name: "潮白河", points: [[116.92, 40.45], [116.80, 40.28], [116.72, 40.10], [116.70, 39.93], [116.82, 39.72]] },
  { name: "温榆河—北运河", points: [[116.30, 40.13], [116.44, 40.04], [116.56, 39.95], [116.68, 39.86], [116.78, 39.72]] }
];

// 手绘山体（西山 + 北部军都山/燕山）：[lon, lat, 高度, 半径]
export const MOUNTAINS = [
  // 西部西山一带
  [115.95, 39.95, 4.2, 5.5], [116.05, 40.04, 3.4, 4.5], [115.82, 39.86, 5.0, 6.5],
  [115.62, 39.79, 4.4, 6.0], [115.55, 39.97, 5.4, 6.5], [115.93, 39.71, 3.2, 4.8],
  [115.48, 39.88, 4.6, 5.5], [115.72, 40.06, 4.0, 5.2],
  // 北部军都山、燕山
  [115.88, 40.46, 5.2, 6.5], [116.12, 40.44, 4.2, 5.5], [116.36, 40.56, 5.0, 6.2],
  [116.62, 40.61, 4.6, 5.8], [116.92, 40.60, 5.2, 6.5], [117.18, 40.52, 4.2, 5.5],
  [116.48, 40.38, 3.4, 4.8], [117.02, 40.36, 3.8, 5.0], [115.72, 40.27, 4.8, 6.0],
  [117.32, 40.40, 3.2, 4.5], [116.20, 40.30, 3.0, 4.2]
];

// 密云水库（蓝色水面）
export const RESERVOIR = { lon: 116.93, lat: 40.49, r: 4.2 };
