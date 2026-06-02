import { COMPANY_INFO } from "../utils/constants";

export const companyIntro = {
  title: "关于天成测绘",
  description:
    "深圳市天成测绘技术有限公司成立于2015年8月18日，注册资本500万元，是一家拥有甲级测绘资质的国家高新技术企业。公司专业从事测绘地理信息技术服务，业务覆盖工程测量、海洋测绘、地图编制、界线与不动产测绘、测绘航空摄影、地理信息系统工程六大板块。公司技术力量雄厚，现有员工63名，其中专业测绘技术人员51人，80%以上骨干拥有7年以上行业经验。公司总部位于深圳市龙岗区，下设广州、惠东、白云、福州等分公司，并在深圳南山设立项目部，服务网络覆盖粤港澳大湾区及全国多地。",
  stats: [
    { value: 10, suffix: "年+", label: "行业深耕" },
    { value: 63, suffix: "人", label: "专业团队" },
    { value: 51, suffix: "人", label: "技术骨干" },
    { value: 1000, suffix: "+", label: "完成项目" },
  ],
  equipment: [
    { name: "GNSS 接收机", count: 16 },
    { name: "全站仪（含0.5秒高精度3台）", count: 20 },
    { name: "高精度水准仪", count: 6 },
    { name: "徕卡激光测距仪", count: 20 },
    { name: "无人机航测系统", count: 5 },
    { name: "专业航摄仪", count: 2 },
    { name: "地下管线探测仪", count: 8 },
    { name: "测深仪", count: 4 },
    { name: "GIS 专业软件", count: 15 },
    { name: "数据服务器", count: 6 },
    { name: "作业车辆", count: 8 },
  ],
};

export const companyHistory = [
  {
    year: "2015",
    title: "公司成立",
    description: "在深圳龙岗注册成立，获得乙级测绘资质，开启测绘地理信息服务征程。",
  },
  {
    year: "2017",
    title: "开拓起步",
    description: "成立惠东分公司，通过ISO 9001质量管理体系认证，业务能力稳步提升。",
  },
  {
    year: "2019",
    title: "加速扩张",
    description: "成立广州分公司及南山项目部，服务网络拓展至珠三角核心区域。",
  },
  {
    year: "2021",
    title: "跨越升级",
    description: "获得甲级测绘资质，通过国家高新技术企业认定，陆续成立白云分公司、福州分公司，完成ISO四大管理体系认证。",
  },
];

export const companyCulture = {
  spirit: "精准求实 诚信创新",
  qualityPolicy: "高效、严谨、科学",
  businessPhilosophy: "客户第一、信誉至上、严守标准",
  mission: "致力于客户的满意与成功，服务至诚，共求发展",
  vision: "成为城市及工程建设领域技术服务一流提供者",
  values: [
    { label: "团队务实拼搏", desc: "脚踏实地，奋勇向前" },
    { label: "进取创新超越", desc: "拥抱变革，追求卓越" },
    { label: "客户三个满意", desc: "质量满意·技术满意·服务满意" },
    { label: "重视合同", desc: "确保质量，准时交付" },
    { label: "服务至诚", desc: "以诚待人，以信立业" },
    { label: "共求发展", desc: "与客户共同成长" },
  ],
};

export const companyStructure = {
  management: ["总经理", "生产经理", "行政经理", "经营经理"],
  departments: [
    "工程测量部",
    "房产测量部",
    "地理信息部",
    "质量安全部",
    "人力资源部",
    "档案管理部",
  ],
};

export const certificates = [
  { name: "甲级测绘资质证书", image: `${import.meta.env.BASE_URL}images/甲级资质证书.jpg` },
  { name: "乙级测绘资质证书", image: `${import.meta.env.BASE_URL}images/乙级资质证书.jpg` },
  { name: "国家高新技术企业", image: `${import.meta.env.BASE_URL}images/certificates/high-tech-cert.png` },
  { name: "营业执照", image: `${import.meta.env.BASE_URL}images/营业执照.png` },
  { name: "全国优秀测绘工程奖", image: `${import.meta.env.BASE_URL}images/certificates/national-excellence-award.png` },
  { name: "ISO 四大管理体系认证", image: `${import.meta.env.BASE_URL}images/certificates/three-system-cert.png` },
  { name: "信息安全管理体系认证", image: `${import.meta.env.BASE_URL}images/certificates/information-security-cert.png` },
  { name: "企业信用等级 AAA 级", image: `${import.meta.env.BASE_URL}images/certificates/credit-rating-cert.png` },
  { name: "广东省守合同重信用企业", image: `${import.meta.env.BASE_URL}images/certificates/contract-honoring-cert.png` },
  { name: "诚信供应商 AAA 级", image: `${import.meta.env.BASE_URL}images/certificates/integrity-supplier-cert.png` },
  { name: "诚信经营示范单位", image: `${import.meta.env.BASE_URL}images/certificates/integrity-operation-cert.png` },
  { name: "质量服务诚信企业", image: `${import.meta.env.BASE_URL}images/certificates/quality-service-cert.png` },
  { name: "软件著作权", image: `${import.meta.env.BASE_URL}images/certificates/software-copyright.png` },
  { name: "通用航空企业经营许可证", image: `${import.meta.env.BASE_URL}images/certificates/aviation-license-new.png` },
];

export const patents = [
  { name: "一种三维影像测量装置", image: `${import.meta.env.BASE_URL}images/certificates/patents/patent-01.jpg` },
  { name: "一种外边长测量自动寻标装置", image: `${import.meta.env.BASE_URL}images/certificates/patents/patent-02.jpg` },
  { name: "一种标杆快速保持竖直装置", image: `${import.meta.env.BASE_URL}images/certificates/patents/patent-03.jpg` },
  { name: "测绘地理信息地图数据采集方法及系统", image: `${import.meta.env.BASE_URL}images/certificates/patents/patent-04.jpg` },
  { name: "房产数据智能测量方法及系统", image: `${import.meta.env.BASE_URL}images/certificates/patents/patent-05.jpg` },
  { name: "一种摄影无人机移动控制台", image: `${import.meta.env.BASE_URL}images/certificates/patents/patent-06.jpg` },
];

export const commendations = [
  { name: "客户表扬信（一）", image: `${import.meta.env.BASE_URL}images/certificates/letters/letter-01.jpg` },
  { name: "客户表扬信（二）", image: `${import.meta.env.BASE_URL}images/certificates/letters/letter-02.jpg` },
  { name: "客户表扬信（三）", image: `${import.meta.env.BASE_URL}images/certificates/letters/letter-03.jpg` },
  { name: "客户表扬信（四）", image: `${import.meta.env.BASE_URL}images/certificates/letters/letter-04.jpg` },
  { name: "客户表扬信（五）", image: `${import.meta.env.BASE_URL}images/certificates/letters/letter-05.jpg` },
  { name: "客户表扬信（六）", image: `${import.meta.env.BASE_URL}images/certificates/letters/letter-06.jpg` },
  { name: "客户表扬信（七）", image: `${import.meta.env.BASE_URL}images/certificates/letters/letter-07.jpg` },
  { name: "客户表扬信（八）", image: `${import.meta.env.BASE_URL}images/certificates/letters/letter-08.jpg` },
];

export const companyQualifications = [
  {
    category: "测绘资质",
    items: [
      { name: "甲级测绘资质", desc: "工程测量、界线与不动产测绘" },
      { name: "乙级测绘资质", desc: "测绘航空摄影、海洋测绘、地理信息系统工程、地图编制" },
    ],
  },
  {
    category: "企业认定",
    items: [
      { name: "国家高新技术企业" },
      { name: "企业信用等级 AAA 级" },
      { name: "广东省守合同重信用企业" },
      { name: "诚信供应商 AAA 级" },
      { name: "诚信经营示范单位" },
      { name: "质量服务诚信企业" },
      { name: "立信单位" },
      { name: "全国优秀测绘工程奖" },
      { name: "通用航空企业经营许可证" },
    ],
  },
  {
    category: "管理体系认证",
    items: [
      { name: "ISO 9001 质量管理体系认证" },
      { name: "ISO 14001 环境管理体系认证" },
      { name: "ISO 45001 职业健康安全管理体系认证" },
      { name: "ISO 27001 信息安全管理体系认证" },
    ],
  },
];
