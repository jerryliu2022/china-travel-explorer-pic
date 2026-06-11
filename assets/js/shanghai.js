import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { SPOTS, VIDEO_DB, RIVERS, MOUNTAINS, RESERVOIR } from "./shanghai-spots.js";

/* ── 投影：经纬度 → 场景平面坐标 ────────────────── */
const LON0 = 121.47, LAT0 = 31.23, SCALE = 48;
const KLON = Math.cos((31.23 * Math.PI) / 180);
const ll = (lon, lat) => [(lon - LON0) * SCALE * KLON, (LAT0 - lat) * SCALE];

const BASE_H = 1.2; // 底座挤出厚度

/* ── 基础场景 ───────────────────────────────────── */
const container = document.getElementById("scene-container");
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xefe2c4, 160, 320);

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 600);
camera.position.set(0, 15.5, 88);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(innerWidth, innerHeight);
labelRenderer.domElement.style.position = "fixed";
labelRenderer.domElement.style.top = "0";
labelRenderer.domElement.style.left = "0";
labelRenderer.domElement.style.zIndex = "5";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);

// 交互锁定：固定俯视角度与高度，只允许水平拖拽平移预览
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 6);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enableRotate = false;
controls.enableZoom = false;
controls.enablePan = true;
controls.screenSpacePanning = false;
controls.panSpeed = 1.1;
controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.PAN };
controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.PAN };

// 鼠标滚轮：上下拨动绕视野中心水平旋转 3D 模型
const _sph = new THREE.Spherical();
renderer.domElement.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    const offset = camera.position.clone().sub(controls.target);
    _sph.setFromVector3(offset);
    _sph.theta += e.deltaY * 0.0011;
    offset.setFromSpherical(_sph);
    camera.position.copy(controls.target).add(offset);
  },
  { passive: false }
);

/* ── 光照 ───────────────────────────────────────── */
scene.add(new THREE.AmbientLight(0xfff4dd, 0.85));
const sun = new THREE.DirectionalLight(0xffe9bf, 1.5);
sun.position.set(-55, 80, 45);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -90;
sun.shadow.camera.right = 90;
sun.shadow.camera.top = 90;
sun.shadow.camera.bottom = -90;
sun.shadow.camera.far = 260;
sun.shadow.bias = -0.0008;
scene.add(sun);
const fill = new THREE.DirectionalLight(0xc9dcec, 0.4);
fill.position.set(60, 40, -50);
scene.add(fill);

/* ── 桌面衬纸（接收阴影的大平面） ───────────────── */
{
  const mat = new THREE.ShadowMaterial({ opacity: 0.18 });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(700, 700), mat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.05;
  plane.receiveShadow = true;
  scene.add(plane);
}

/* ── 区县底座（GeoJSON 挤出，纸板叠层质感） ─────── */
const PAPER_COLORS = [0xf2e0bd, 0xead4ab, 0xf5e7c9, 0xe6cfa2, 0xefdcb5, 0xe9d8b0];
const districtGroup = new THREE.Group();
scene.add(districtGroup);

function buildDistricts(geojson) {
  const edgeMat = new THREE.LineBasicMaterial({ color: 0xa3865a });
  geojson.features.forEach((f, fi) => {
    const color = PAPER_COLORS[fi % PAPER_COLORS.length];
    const topMat = new THREE.MeshStandardMaterial({ color, roughness: 0.95, metalness: 0 });
    const sideMat = new THREE.MeshStandardMaterial({ color: 0xcbb083, roughness: 1 });
    const polys = f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : [f.geometry.coordinates];

    polys.forEach((poly) => {
      const ring = poly[0];
      if (!ring || ring.length < 4) return;
      const shape = new THREE.Shape();
      ring.forEach(([lon, lat], i) => {
        const [x, z] = ll(lon, lat);
        if (i === 0) shape.moveTo(x, -z);
        else shape.lineTo(x, -z);
      });
      const geo = new THREE.ExtrudeGeometry(shape, { depth: BASE_H, bevelEnabled: false });
      geo.rotateX(-Math.PI / 2);
      const mesh = new THREE.Mesh(geo, [topMat, sideMat]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      districtGroup.add(mesh);

      // 顶面描边
      const pts = ring.map(([lon, lat]) => {
        const [x, z] = ll(lon, lat);
        return new THREE.Vector3(x, BASE_H + 0.03, z);
      });
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), edgeMat);
      districtGroup.add(line);
    });
  });
}

/* ── 山体（低多边形纸艺锥） ─────────────────────── */
function buildMountains() {
  const mat = new THREE.MeshStandardMaterial({ color: 0x9dae7e, roughness: 0.95, flatShading: true });
  const snowMat = new THREE.MeshStandardMaterial({ color: 0x7e9468, roughness: 0.95, flatShading: true });
  MOUNTAINS.forEach(([lon, lat, h, r], i) => {
    const [x, z] = ll(lon, lat);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 6, 1), i % 3 === 0 ? snowMat : mat);
    cone.position.set(x, BASE_H + h / 2 - 0.05, z);
    cone.rotation.y = (i * 1.7) % Math.PI;
    cone.castShadow = true;
    cone.receiveShadow = true;
    scene.add(cone);
  });
}

/* ── 河流与水库 ─────────────────────────────────── */
function buildRivers() {
  const mat = new THREE.MeshStandardMaterial({ color: 0x6fa7c2, roughness: 0.5 });
  RIVERS.forEach((river) => {
    const pts = river.points.map(([lon, lat]) => {
      const [x, z] = ll(lon, lat);
      return new THREE.Vector3(x, BASE_H + 0.1, z);
    });
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.35, 8, false), mat);
    tube.receiveShadow = true;
    scene.add(tube);
  });
  if (RESERVOIR) {
    const [rx, rz] = ll(RESERVOIR.lon, RESERVOIR.lat);
    const lake = new THREE.Mesh(
      new THREE.CircleGeometry(RESERVOIR.r, 24),
      new THREE.MeshStandardMaterial({ color: 0x6fa7c2, roughness: 0.4 })
    );
    lake.rotation.x = -Math.PI / 2;
    lake.position.set(rx, BASE_H + 0.08, rz);
    lake.scale.set(1, 0.72, 1);
    scene.add(lake);
  }
}

/* ── 景点卡片（照片合成拍立得纹理 + 斜杆 + 标签） ── */
const cardGroup = new THREE.Group();
scene.add(cardGroup);
const pickables = [];
const spotNodes = {}; // id -> { sprite, basePos }

function makeCardTexture(img) {
  const W = 256, H = 300, B = 14, TRI = 26;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H + TRI;
  const ctx = cv.getContext("2d");

  // 卡片白底 + 圆角
  ctx.save();
  roundRect(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#faf3e2";
  ctx.fill();
  ctx.restore();

  // 底部指针小三角
  ctx.beginPath();
  ctx.moveTo(W / 2 - 16, H - 2);
  ctx.lineTo(W / 2 + 16, H - 2);
  ctx.lineTo(W / 2, H + TRI);
  ctx.closePath();
  ctx.fillStyle = "#faf3e2";
  ctx.fill();

  // 照片 cover 裁剪
  const pw = W - B * 2, ph = H - B * 2 - 8;
  const ratio = Math.max(pw / img.width, ph / img.height);
  const sw = pw / ratio, sh = ph / ratio;
  const sx = (img.width - sw) / 2, sy = (img.height - sh) / 2;
  ctx.save();
  roundRect(ctx, B, B, pw, ph, 8);
  ctx.clip();
  ctx.drawImage(img, sx, sy, sw, sh, B, B, pw, ph);
  ctx.restore();

  // 描边
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#cdb78c";
  roundRect(ctx, 1.5, 1.5, W - 3, H - 3, 13);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      // 图片加载失败时生成彩色占位图
      const c = document.createElement("canvas");
      c.width = 256;
      c.height = 200;
      const ctx = c.getContext("2d");
      // 随机柔和颜色
      const colors = ["#c0392b","#e67e22","#2980b9","#27ae60","#8e44ad","#d35400","#16a085","#2c3e50"];
      const color = colors[src.length % colors.length];
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 256, 200);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 24px 'PingFang SC', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const name = src.split("/").pop().replace(/\.\w+$/, "");
      ctx.fillText(name, 128, 100);
      resolve(c);
    };
    img.src = src;
  });
}

const pinMat = new THREE.MeshStandardMaterial({ color: 0xc03f2e, roughness: 0.6 });
const lineMat = new THREE.LineBasicMaterial({ color: 0x8a6f4d, transparent: true, opacity: 0.8 });

async function buildSpots() {
  await Promise.all(
    SPOTS.map(async (spot, si) => {
      const img = await loadImage(`assets/img/${spot.id}.jpg`);
      const tex = makeCardTexture(img);

      const [bx, bz] = ll(spot.lon, spot.lat);
      const [dx, dz] = spot.offset;
      const pinPos = new THREE.Vector3(bx, BASE_H + 0.25, bz);
      const basePos = new THREE.Vector3(bx + dx, BASE_H + spot.poleH - 2.2, bz + dz);

      // 底部红色定位钉
      const pin = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), pinMat);
      pin.position.copy(pinPos);
      cardGroup.add(pin);

      // 地面标记：英文名称标签
      const gdiv = document.createElement("div");
      gdiv.className = "ground-label";
      gdiv.textContent = spot.en;
      const groundLabel = new CSS2DObject(gdiv);
      groundLabel.position.set(bx, BASE_H + 0.15, bz);
      groundLabel.center.set(0.5, -0.3 - (si % 3) * 1.05);
      cardGroup.add(groundLabel);

      // 细连接线：定位钉 → 卡片底
      const lineGeo = new THREE.BufferGeometry().setFromPoints([pinPos, basePos]);
      const line = new THREE.Line(lineGeo, lineMat);
      cardGroup.add(line);

      // 卡片组
      const group = new THREE.Group();
      group.position.copy(basePos);
      cardGroup.add(group);

      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: tex, transparent: true })
      );
      const ar = 326 / 256;
      const w = 5.6;
      sprite.scale.set(w, w * ar, 1);
      sprite.center.set(0.5, 0);
      sprite.userData.spot = spot;
      group.add(sprite);
      pickables.push(sprite);

      // 名称标签
      const div = document.createElement("div");
      div.className = "spot-label";
      div.textContent = spot.name;
      div.style.pointerEvents = "auto";
      div.addEventListener("mouseenter", (e) => showTooltip(spot, e.clientX, e.clientY));
      div.addEventListener("mousemove", (e) => moveTooltip(e.clientX, e.clientY));
      div.addEventListener("mouseleave", hideTooltip);
      div.addEventListener("click", () => flyTo(spot.id));
      const label = new CSS2DObject(div);
      label.position.set(0, w * ar + 1.1, 0);
      group.add(label);

      spotNodes[spot.id] = {
        spot, group, sprite, line, lineGeo, label, pinPos, basePos,
        baseScale: w,
        offset: new THREE.Vector3(),
        shown: true
      };
    })
  );
}

/* ── 屏幕空间动态防遮挡 ─────────────────────────── */
const _proj = new THREE.Vector3();
const _right = new THREE.Vector3();
const _up = new THREE.Vector3();

function declutterCards() {
  const items = Object.values(spotNodes).filter((n) => n.group.visible);
  if (!items.length) return;
  const W = innerWidth, H = innerHeight;
  const fovScale = (H / 2) / Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);

  for (const n of items) {
    _proj.copy(n.group.position).project(camera);
    n.sx = ((_proj.x + 1) / 2) * W;
    const syBottom = ((1 - _proj.y) / 2) * H;
    const dist = camera.position.distanceTo(n.group.position);
    n.ppu = fovScale / dist;
    n.halfW = (n.sprite.scale.x / 2) * n.ppu;
    n.halfH = (n.sprite.scale.y / 2) * n.ppu;
    n.cy = syBottom - n.halfH;
    n.fx = 0;
    n.fy = 0;
  }

  const PADX = 10, PADY = 18;
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i], b = items[j];
      const ox = a.halfW + b.halfW + PADX - Math.abs(a.sx - b.sx);
      const oy = a.halfH + b.halfH + PADY - Math.abs(a.cy - b.cy);
      if (ox > 0 && oy > 0) {
        if (ox < oy * 0.8) {
          const dir = a.sx <= b.sx ? -1 : 1;
          a.fx += (dir * ox) / 2;
          b.fx -= (dir * ox) / 2;
        } else {
          const dir = a.cy <= b.cy ? -1 : 1;
          a.fy += (dir * oy) / 2;
          b.fy -= (dir * oy) / 2;
        }
      }
    }
  }

  _right.setFromMatrixColumn(camera.matrixWorld, 0);
  _up.setFromMatrixColumn(camera.matrixWorld, 1);
  const GAIN = 0.28, DECAY = 0.96, MAX_OFFSET = 9;

  for (const n of items) {
    if (n.fx !== 0 || n.fy !== 0) {
      n.offset.addScaledVector(_right, (n.fx / n.ppu) * GAIN);
      n.offset.addScaledVector(_up, (-n.fy / n.ppu) * GAIN);
    } else {
      n.offset.multiplyScalar(DECAY);
    }
    if (n.offset.lengthSq() > MAX_OFFSET * MAX_OFFSET) n.offset.setLength(MAX_OFFSET);

    n.group.position.copy(n.basePos).add(n.offset);
    if (n.group.position.y < BASE_H + 2) n.group.position.y = BASE_H + 2;

    n.lineGeo.attributes.position.setXYZ(
      1,
      n.group.position.x,
      n.group.position.y,
      n.group.position.z
    );
    n.lineGeo.attributes.position.needsUpdate = true;
  }
}

/* ── 悬停弹窗 ───────────────────────────────────── */
const tooltip = document.getElementById("tooltip");
const tipImg = document.getElementById("tooltip-img");
const tipName = document.getElementById("tooltip-name");
const tipTag = document.getElementById("tooltip-tag");
const tipDesc = document.getElementById("tooltip-desc");

function showTooltip(spot, x, y) {
  tipImg.src = `assets/img/${spot.id}.jpg`;
  tipName.textContent = spot.name;
  tipTag.textContent = spot.tag;
  tipDesc.textContent = spot.desc;
  tooltip.classList.remove("hidden");
  moveTooltip(x, y);
}
function moveTooltip(x, y) {
  const w = 270, h = tooltip.offsetHeight || 280, pad = 18;
  let left = x + pad, top = y + pad;
  if (left + w > innerWidth - 8) left = x - w - pad;
  if (top + h > innerHeight - 8) top = y - h - pad;
  tooltip.style.left = `${Math.max(8, left)}px`;
  tooltip.style.top = `${Math.max(8, top)}px`;
}
function hideTooltip() {
  tooltip.classList.add("hidden");
}

/* ── 节点显隐控制 ───────────────────────────────── */
function setNodeVisible(n, v) {
  n.group.visible = v;
  n.line.visible = v;
  n.sprite.visible = v;
  n.label.visible = v;
}

/* ── 视野内最近 5 个景点照片展示 ────────────────── */
const MAX_VISIBLE = 5;
const _ndc = new THREE.Vector3();

function updateVisibleSpots() {
  if (videoPanelSpot) return;
  const items = Object.values(spotNodes);
  const ranked = items
    .map((n) => {
      _ndc.copy(n.basePos).project(camera);
      const inFront = _ndc.z < 1;
      const d = Math.hypot(_ndc.x, _ndc.y * 0.85);
      return { n, score: inFront ? d : Infinity };
    })
    .sort((a, b) => a.score - b.score);

  ranked.forEach((r, i) => {
    const v = i < MAX_VISIBLE && r.score !== Infinity;
    if (r.n.shown !== v) {
      r.n.shown = v;
      setNodeVisible(r.n, v);
      if (!v) r.n.offset.set(0, 0, 0);
    }
  });
}

/* ── YouTube 视频滚动面板 ───────────────────────── */
const videoPanel = document.getElementById("video-panel");
const videoPanelTitle = document.getElementById("video-panel-title");
const videoPanelStrip = document.getElementById("video-panel-strip");
let videoPanelSpot = null;
let panelPinned = false;
let panelHideTimer = null;

const fmtCount = (v) => {
  if (v == null) return "—";
  if (v >= 10000) return `${(v / 10000).toFixed(1)}万`;
  if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return `${v}`;
};

function showVideoPanel(spot) {
  if (videoPanelSpot?.id === spot.id) return;
  videoPanelSpot = spot;
  hideTooltip();

  Object.values(spotNodes).forEach((n) => setNodeVisible(n, n.spot.id === spot.id));

  videoPanelTitle.innerHTML =
    `<b>${spot.name}</b><i>${spot.en}</i><em>YouTube · 按浏览量排序</em>`;

  const vids = spot.videos
    .map((id) => ({ id, ...VIDEO_DB[id] }))
    .sort((a, b) => (b.views ?? -1) - (a.views ?? -1));

  videoPanelStrip.innerHTML = "";
  vids.forEach((v) => {
    const url = `https://www.youtube.com/watch?v=${v.id}`;
    const item = document.createElement("a");
    item.className = "vp-item";
    item.href = url;
    item.target = "_blank";
    item.rel = "noopener";
    item.title = `${v.title}\n${url}`;
    item.innerHTML = `
      <div class="vp-thumb">
        <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="">
        <span class="vp-play">&#9654;</span>
      </div>
      <p class="vp-title">${v.title}</p>
      <p class="vp-meta">
        <span class="vp-ch">${v.channel}</span>
        <span class="vp-stats">&#128065; ${fmtCount(v.views)} &nbsp; &#128077; ${fmtCount(v.likes)}</span>
        <span class="vp-link">在 YouTube 观看 &#8599;</span>
      </p>`;
    videoPanelStrip.appendChild(item);
  });

  videoPanel.classList.remove("hidden");
  positionVideoPanel();
}

function hideVideoPanel() {
  if (!videoPanelSpot) return;
  videoPanelSpot = null;
  panelPinned = false;
  videoPanel.classList.add("hidden");
  Object.values(spotNodes).forEach((n) => setNodeVisible(n, n.shown));
  updateVisibleSpots();
}

function scheduleHidePanel() {
  clearTimeout(panelHideTimer);
  panelHideTimer = setTimeout(() => {
    if (!panelPinned && !videoPanel.matches(":hover") && !hovered) hideVideoPanel();
  }, 260);
}

videoPanel.addEventListener("mouseenter", () => clearTimeout(panelHideTimer));
videoPanel.addEventListener("mouseleave", () => {
  if (!panelPinned) hideVideoPanel();
});

function positionVideoPanel() {
  if (!videoPanelSpot) return;
  const n = spotNodes[videoPanelSpot.id];
  _ndc.copy(n.group.position).project(camera);
  const sx = ((_ndc.x + 1) / 2) * innerWidth;
  const sy = ((1 - _ndc.y) / 2) * innerHeight;
  const w = videoPanel.offsetWidth || 240;
  const h = videoPanel.offsetHeight || 120;
  let left = sx - w / 2;
  let top = sy + 10;
  left = Math.max(8, Math.min(left, innerWidth - w - 8));
  if (top + h > innerHeight - 8) top = sy - h - 10;
  videoPanel.style.left = `${left}px`;
  videoPanel.style.top = `${top}px`;
}

/* ── 鼠标拾取 ───────────────────────────────────── */
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hovered = null;

renderer.domElement.addEventListener("pointermove", (e) => {
  pointer.x = (e.clientX / innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(pickables, false).filter((h) => h.object.visible);
  const hit = hits.length ? hits[0].object : null;

  if (hit !== hovered) {
    if (hovered) {
      const n = spotNodes[hovered.userData.spot.id];
      hovered.scale.set(n.baseScale, n.baseScale * (326 / 256), 1);
    }
    hovered = hit;
    if (hovered) {
      const n = spotNodes[hovered.userData.spot.id];
      const s = n.baseScale * 1.18;
      hovered.scale.set(s, s * (326 / 256), 1);
      clearTimeout(panelHideTimer);
      showVideoPanel(hovered.userData.spot);
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "";
      scheduleHidePanel();
    }
  }
});

let downX = 0, downY = 0;
renderer.domElement.addEventListener("pointerdown", (e) => {
  downX = e.clientX;
  downY = e.clientY;
});
renderer.domElement.addEventListener("click", (e) => {
  if (Math.hypot(e.clientX - downX, e.clientY - downY) > 5) return;
  if (hovered) {
    panelPinned = true;
    showVideoPanel(hovered.userData.spot);
  } else {
    hideVideoPanel();
  }
});

/* ── 相机飞行 ───────────────────────────────────── */
let flight = null;
function flyTo(id) {
  const node = spotNodes[id];
  if (!node) return;
  const delta = new THREE.Vector3(
    node.basePos.x - controls.target.x,
    0,
    node.basePos.z - controls.target.z
  );
  flight = {
    t: 0,
    fromCam: camera.position.clone(),
    toCam: camera.position.clone().add(delta),
    fromTarget: controls.target.clone(),
    toTarget: controls.target.clone().add(delta)
  };
  document.querySelectorAll("#spot-list li").forEach((li) => {
    li.classList.toggle("active", li.dataset.id === id);
  });
}

/* ── 右侧列表 ───────────────────────────────────── */
const ul = document.getElementById("spot-list-ul");
SPOTS.forEach((s) => {
  const li = document.createElement("li");
  li.textContent = s.name;
  li.dataset.id = s.id;
  li.addEventListener("click", () => flyTo(s.id));
  li.addEventListener("mouseenter", (e) => showTooltip(s, e.clientX, e.clientY));
  li.addEventListener("mouseleave", hideTooltip);
  ul.appendChild(li);
});

/* ── 启动 ───────────────────────────────────────── */
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

async function init() {
  const res = await fetch("assets/data/shanghai.json");
  const geojson = await res.json();
  buildDistricts(geojson);
  buildMountains();
  buildRivers();
  await buildSpots();

  document.getElementById("loading").classList.add("fade");

  // 开场动画
  camera.position.set(0, 40, 190);
  flight = {
    t: 0,
    fromCam: camera.position.clone(),
    toCam: new THREE.Vector3(0, 15.5, 88),
    fromTarget: new THREE.Vector3(0, 0, 6),
    toTarget: new THREE.Vector3(0, 0, 6)
  };
}

function animate() {
  requestAnimationFrame(animate);
  if (flight) {
    flight.t += 0.016;
    const k = easeInOut(Math.min(flight.t / 1.6, 1));
    camera.position.lerpVectors(flight.fromCam, flight.toCam, k);
    controls.target.lerpVectors(flight.fromTarget, flight.toTarget, k);
    if (flight.t >= 1.6) flight = null;
  }
  controls.update();
  updateVisibleSpots();
  declutterCards();
  positionVideoPanel();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  labelRenderer.setSize(innerWidth, innerHeight);
});

init();
animate();
