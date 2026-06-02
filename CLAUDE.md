# 天成测绘企业官网

> 技术栈：React 19 + TypeScript + Vite + Tailwind CSS v4 + React Router v7
> 配色：深色科技风（navy-950 黑底 + navy-500 蓝主色 + cyan-500 青强调）
> 部署：GitHub Pages → niceandsmile.github.io/tiancheng-survey/
>       Vercel → tiancheng-survey.vercel.app（海外，国内被墙）

## 项目结构

```
src/
├── assets/images/          # 62 张图片（已压缩至 26MB）
├── components/
│   ├── common/             # Navbar, Footer, PageHeader, SectionTitle, ScrollToTop, ScrollReveal
│   ├── home/               # HeroSection, CompanyIntro, ServiceHighlights, ProjectHighlights
│   ├── services/           # ServiceCard, ServiceAccordion
│   ├── projects/           # ProjectCard
│   ├── contact/            # ContactInfo, ContactForm
│   └── map/                # AmapContainer
├── data/                   # company.ts, services.ts, projects.ts, navigation.ts
├── hooks/                  # useAmap.ts, useScrollAnimation.ts, useMediaQuery.ts
├── pages/                  # HomePage, ServicesPage, ProjectsPage, ContactPage
├── routes/                 # createBrowserRouter + basename
├── types/                  # TypeScript 类型定义
├── utils/                  # 常量（坐标等）
├── App.tsx                 # 布局壳
└── main.tsx
```

## 重要约定

### 图片路径
- 必须用 `import.meta.env.BASE_URL + "images/xxx.jpg"`，不能用 `/images/xxx`
- 因为 GitHub Pages 部署在 `/tiancheng-survey/` 子目录

### 路由 basename
- `src/routes/index.tsx` 中 `basename: "/tiancheng-survey"`
- 自有域名上线后删除此行

### 高德地图
- 三处使用：首页底部、联系我们、Footer 迷你地图
- API Key 通过 `.env` 管理，`.env.example` 供参考
- 地图风格：`darkblue` 暗色主题

## 部署配置

### GitHub Pages（当前主用）
- vite.config.ts: `base: "/tiancheng-survey/"`
- routes: `basename: "/tiancheng-survey"`
- GitHub Actions 自动部署（.github/workflows/deploy.yml）

### 自有域名切换
- 删 vite.config.ts 的 base
- 删 routes 的 basename
- 其余 `import.meta.env.BASE_URL` 自动适配

## 网络环境
- 开发者在中国大陆，GitHub 访问需 Steam++ 加速
- GitHub API (`api.github.com`) 和 SSH 通常可用
- 网站页面的 GitHub IP 被封，但 hosts 改 DNS 对浏览器无效（Chrome DoH）
