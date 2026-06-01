# 深圳市天成测绘技术有限公司 — 企业官网

科技感简约企业官网，基于 React + TypeScript + Vite + Tailwind CSS v4 构建，集成高德地图展示公司位置。

---

## 技术栈

- **框架**：React 19 + TypeScript
- **构建工具**：Vite 7
- **样式**：Tailwind CSS v4（深色科技蓝主题）
- **路由**：React Router v7
- **动画**：Framer Motion
- **图标**：React Icons (Heroicons 2)
- **地图**：高德地图 JS API 2.0

---

## 快速开始

### 1. 配置高德地图 API Key

1. 访问 [高德开放平台](https://lbs.amap.com/) 注册/登录
2. 创建应用 → 添加 Key → 服务平台选择「**Web端(JSAPI)**」
3. 将获取的 Key 和安全密钥填入 `.env` 文件：

```env
VITE_AMAP_KEY=你的Key
VITE_AMAP_SECURITY_CODE=你的安全密钥
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173`

### 4. 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录，可直接部署到任意静态服务器。

---

## 自定义公司信息

所有公司信息和内容数据集中管理，修改以下文件即可：

| 文件 | 内容 |
|------|------|
| `src/utils/constants.ts` | 公司名称、地址、电话、邮箱、坐标 |
| `src/data/company.ts` | 公司简介、统计数据 |
| `src/data/services.ts` | 服务项目列表 |
| `src/data/projects.ts` | 项目案例列表 |
| `src/data/navigation.ts` | 导航菜单 |

---

## 项目结构

```
src/
├── components/
│   ├── common/        # Navbar, Footer, PageHeader, ScrollReveal 等
│   ├── home/          # HeroSection, CompanyIntro, ServiceHighlights 等
│   ├── services/      # ServiceCard
│   ├── projects/      # ProjectCard
│   ├── contact/       # ContactInfo, ContactForm
│   └── map/           # AmapContainer
├── data/              # 静态内容数据
├── hooks/             # useAmap（高德地图 Hook）
├── pages/             # 4 个页面组件
├── routes/            # 路由配置
├── types/             # TypeScript 类型定义
└── utils/             # 常量配置
```

---

## 页面路由

| 路径 | 页面 |
|------|------|
| `/` | 首页 |
| `/services` | 服务项目 |
| `/projects` | 项目案例 |
| `/contact` | 联系我们 |
