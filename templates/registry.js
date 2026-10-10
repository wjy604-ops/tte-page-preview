/* 页面模板登记表。
 * 新增一页：
 * 1. 先检索组件库（index.html 里的组件预览、tokens/*.css、components/*.tsx），能复用的直接用组件的 class 和结构，不要在页面里重画
 * 2. 复制 templates/dashboard-01.html，只改 <main data-page> 里的内容
 * 3. 在下面追加一条，id 与文件名一致
 * 模块页签出现在「导航壳层」旁边，不进平台侧栏。工作台页签先不放出来。
 */
window.TTE_TEMPLATE_CATEGORIES = [
  { id: "dashboard", label: "工作台" },
  { id: "list", label: "列表页" },
  { id: "ticket", label: "单据" },
  { id: "form", label: "表单页" },
  { id: "detail", label: "详情页" }
];

window.TTE_PAGE_TEMPLATES = [
  {
    id: "dashboard-01",
    category: "dashboard",
    title: "导航壳层",
    description: "导航壳保持不变，内容区是三块占位卡加一块铺满的骨架。",
    href: "templates/dashboard-01.html"
  },
  {
    id: "scene-search",
    category: "list",
    title: "场景检索",
    description: "选树、传统检索与 AI 检索、筛选，以及列表、卡片和洞察三种结果。",
    href: "templates/scene-search.html"
  },
  {
    id: "ticket-overview",
    category: "ticket",
    title: "Ticket总览",
    description: "单据范围、筛选，以及带固定操作列的列表。",
    href: "templates/ticket-overview.html"
  }
];
