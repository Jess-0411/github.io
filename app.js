const labelMap = {
  id: "编号",
  name: "名称",
  projectId: "项目编号",
  project: "所属项目",
  type: "类型",
  purpose: "项目目的",
  content: "建设内容",
  target: "预期目标",
  cycle: "项目周期",
  budget: "预算金额",
  dept: "责任部门",
  owner: "负责人",
  remark: "备注",
  status: "状态",
  createdAt: "创建时间",
  node: "当前节点",
  role: "审批角色",
  order: "审批顺序",
  opinion: "审批意见",
  record: "审批记录",
  method: "采购方式",
  supplier: "供应商",
  purchase: "所属采购",
  contract: "所属合同",
  partner: "合作单位",
  amount: "金额",
  signDate: "签订日期",
  period: "履约期限",
  due: "到期提醒",
  month: "月份",
  percent: "完成比例",
  issue: "存在问题",
  nextPlan: "下月计划",
  delayReason: "延期原因",
  payment: "所属付款",
  invoiceNo: "发票号码",
  date: "日期",
  checked: "核销状态",
  members: "验收人员",
  material: "验收材料",
  rectification: "整改期限",
  summary: "项目总结",
  result: "成果附件",
  check: "校验结果",
  docs: "附件",
};

const projects = ["智慧教室多媒体设备采购", "化学实验耗材补充项目", "图书馆教学参考书采购"];
const suppliers = ["明德教育科技有限公司", "青澜教学设备有限公司", "华文书业集团"];

function field(key, label, type = "text", required = false, options = []) {
  return { key, label, type, required, options };
}

const pageConfigs = {
  project: {
    title: "项目立项",
    subtitle: "完成项目申请、审批管理与项目主档生成。",
    metrics: [["项目总数", "3"], ["待审批", "1"], ["退回修改", "1"], ["已通过", "1"]],
    flow: ["填写申请", "提交审批", "审批处理", "生成项目编号"],
    addLabel: "新建项目",
    tabs: ["项目申请", "审批管理", "项目列表"],
    filters: ["项目名称", "项目类型", "负责人", "状态"],
    form: [
      field("name", "项目名称", "text", true),
      field("type", "项目类型", "select", true, ["教学设备采购", "图书采购", "实验室建设", "教学耗材", "校园维修"]),
      field("purpose", "项目目的", "textarea", true),
      field("content", "建设内容", "textarea", true),
      field("target", "预期目标", "textarea", true),
      field("cycle", "项目周期", "month", true),
      field("budget", "项目预算", "number", true),
      field("dept", "责任部门", "text", true),
      field("owner", "项目负责人", "text", true),
      field("remark", "备注", "textarea"),
      field("docs", "项目申请书/预算附件/可行性说明", "upload"),
    ],
  },
  purchase: {
    title: "采购管理",
    subtitle: "关联已通过项目，登记采购信息并跟踪采购状态。",
    metrics: [["待采购", "1"], ["采购中", "1"], ["采购完成", "1"], ["供应商", "3"]],
    flow: ["关联项目", "登记采购", "确定供应商", "采购完成"],
    addLabel: "登记采购",
    tabs: ["采购登记", "采购跟踪"],
    filters: ["采购名称", "所属项目", "供应商", "状态"],
    form: [
      field("project", "所属项目", "select", true),
      field("name", "采购名称", "text", true),
      field("type", "采购类型", "select", true, ["设备", "耗材", "图书", "服务"]),
      field("budget", "预算金额", "number", true),
      field("method", "采购方式", "select", true, ["公开招标", "询价", "竞争性谈判"]),
      field("date", "采购时间", "date", true),
      field("supplier", "供应商", "select", true),
      field("docs", "采购文件/报价单", "upload"),
    ],
  },
  contract: {
    title: "合同管理",
    subtitle: "关联采购结果，管理合同登记、履约状态与到期提醒。",
    metrics: [["待签订", "1"], ["履约中", "1"], ["已完成", "1"], ["到期提醒", "1"]],
    flow: ["选择采购", "登记合同", "上传附件", "到期提醒"],
    addLabel: "登记合同",
    tabs: ["合同登记", "合同提醒"],
    filters: ["合同编号", "所属项目", "合作单位", "状态"],
    form: [
      field("project", "所属项目", "select", true),
      field("purchase", "所属采购", "select", true),
      field("id", "合同编号", "text", true),
      field("amount", "合同金额", "number", true),
      field("partner", "合作单位", "select", true),
      field("signDate", "签订日期", "date", true),
      field("period", "履约期限", "date", true),
      field("docs", "合同附件", "upload", true),
    ],
  },
  progress: {
    title: "项目进度",
    subtitle: "负责人按月更新实施进度，记录延期原因与项目时间轴。",
    metrics: [["正常", "1"], ["延期", "1"], ["完成", "1"], ["平均进度", "60%"]],
    flow: ["月度更新", "上传附件", "标记延期", "时间轴展示"],
    addLabel: "更新进度",
    tabs: ["月度进度", "项目时间轴"],
    filters: ["项目名称", "负责人", "月份", "状态"],
    form: [
      field("project", "所属项目", "select", true),
      field("month", "月份", "month", true),
      field("content", "本月完成情况", "textarea", true),
      field("percent", "当前完成比例", "number", true),
      field("issue", "存在问题", "textarea"),
      field("nextPlan", "下月计划", "textarea", true),
      field("status", "项目状态", "select", true, ["正常", "延期", "完成"]),
      field("delayReason", "延期原因", "textarea"),
      field("docs", "附件/照片", "upload"),
    ],
  },
  payment: {
    title: "付款申请",
    subtitle: "独立承载付款申请与财务审核，支撑发票资金闭环。",
    metrics: [["待审核", "1"], ["审核通过", "1"], ["已付款", "1"], ["付款金额", "¥325,000"]],
    flow: ["选择合同", "发起付款", "财务审核", "登记付款时间"],
    addLabel: "发起付款",
    tabs: ["付款申请", "财务审核"],
    filters: ["所属合同", "付款金额", "状态", "付款时间"],
    form: [
      field("contract", "所属合同", "select", true),
      field("amount", "付款金额", "number", true),
      field("percent", "付款比例", "number", true),
      field("remark", "付款说明", "textarea", true),
      field("date", "付款时间", "date"),
      field("docs", "付款附件", "upload"),
    ],
  },
  invoice: {
    title: "发票管理",
    subtitle: "登记发票并关联付款，展示预算、合同、付款与发票匹配情况。",
    metrics: [["已登记", "2"], ["已核销", "1"], ["发票金额", "¥325,000"], ["预算匹配", "3"]],
    flow: ["关联付款", "登记发票", "上传扫描件", "发票核销"],
    addLabel: "登记发票",
    tabs: ["发票登记", "预算统计"],
    filters: ["所属项目", "所属合同", "发票号码", "日期"],
    form: [
      field("project", "所属项目", "select", true),
      field("contract", "所属合同", "select", true),
      field("payment", "所属付款", "select", true),
      field("invoiceNo", "发票号码", "text", true),
      field("amount", "金额", "number", true),
      field("date", "日期", "date", true),
      field("docs", "扫描件", "upload", true),
    ],
  },
  acceptance: {
    title: "验收管理",
    subtitle: "提交验收材料，记录验收意见、整改期限与历史记录。",
    metrics: [["待验收", "1"], ["整改中", "1"], ["已通过", "1"], ["验收记录", "3"]],
    flow: ["提交验收", "填写意见", "整改复验", "记录归档"],
    addLabel: "提交验收",
    tabs: ["验收申请", "验收记录"],
    filters: ["所属项目", "验收人员", "验收结果", "状态"],
    form: [
      field("project", "所属项目", "select", true),
      field("date", "验收时间", "date", true),
      field("members", "验收人员", "text", true),
      field("material", "验收材料", "textarea", true),
      field("opinion", "验收意见", "select", true, ["通过", "整改", "不通过"]),
      field("rectification", "整改期限", "date"),
      field("docs", "验收附件/整改附件", "upload"),
    ],
  },
  closing: {
    title: "项目结项",
    subtitle: "自动校验采购、合同、付款、验收状态，通过后归档核心资料。",
    metrics: [["待校验", "1"], ["可结项", "1"], ["已结项", "1"], ["归档资料", "5类"]],
    flow: ["申请结项", "自动校验", "审批通过", "自动归档"],
    addLabel: "申请结项",
    tabs: ["结项申请", "结项校验", "项目归档"],
    filters: ["所属项目", "负责人", "状态", "校验结果"],
    form: [
      field("project", "所属项目", "select", true),
      field("summary", "项目总结", "textarea", true),
      field("result", "成果附件", "upload", true),
      field("remark", "结项说明", "textarea", true),
    ],
  },
  system: {
    title: "系统管理",
    subtitle: "维护审批流程、编号规则和项目类型，保持 V1 配置简洁。",
    metrics: [["流程配置", "2"], ["编号规则", "2"], ["项目类型", "5"], ["启用项", "9"]],
    flow: ["配置流程", "设置编号", "维护类型", "新业务生效"],
    addLabel: "新增配置",
    tabs: ["流程配置", "编号规则", "项目类型"],
    filters: ["名称", "类型", "状态", "更新时间"],
    form: [
      field("name", "配置名称", "text", true),
      field("type", "配置类型", "select", true, ["审批流程", "审批角色", "编号规则", "项目类型"]),
      field("remark", "配置说明", "textarea", true),
    ],
  },
};

const navItems = [
  ["project", "项目立项"],
  ["purchase", "采购管理"],
  ["contract", "合同管理"],
  ["progress", "项目进度"],
  ["payment", "付款申请"],
  ["invoice", "发票管理"],
  ["acceptance", "验收管理"],
  ["closing", "项目结项"],
  ["system", "系统管理"],
];

const state = { active: "project", tabs: {}, filters: {}, modal: null, confirm: null, data: {} };

const els = {
  navList: document.getElementById("navList"),
  pageTitle: document.getElementById("pageTitle"),
  moduleView: document.getElementById("moduleView"),
  modalMask: document.getElementById("modalMask"),
  modalTitle: document.getElementById("modalTitle"),
  modalForm: document.getElementById("modalForm"),
  modalClose: document.getElementById("modalClose"),
  modalCancel: document.getElementById("modalCancel"),
  modalSave: document.getElementById("modalSave"),
  prdOpen: document.getElementById("prdOpen"),
  prdMask: document.getElementById("prdMask"),
  prdTitle: document.getElementById("prdTitle"),
  prdBody: document.getElementById("prdBody"),
  prdClose: document.getElementById("prdClose"),
  prdConfirm: document.getElementById("prdConfirm"),
  flowChartBtn: document.getElementById("flowChartBtn"),
  flowMask: document.getElementById("flowMask"),
  flowBody: document.getElementById("flowBody"),
  flowClose: document.getElementById("flowClose"),
  flowConfirm: document.getElementById("flowConfirm"),
  confirmMask: document.getElementById("confirmMask"),
  confirmTitle: document.getElementById("confirmTitle"),
  confirmMessage: document.getElementById("confirmMessage"),
  confirmSummary: document.getElementById("confirmSummary"),
  confirmClose: document.getElementById("confirmClose"),
  confirmCancel: document.getElementById("confirmCancel"),
  confirmOk: document.getElementById("confirmOk"),
  drawer: document.getElementById("drawer"),
  drawerKicker: document.getElementById("drawerKicker"),
  drawerTitle: document.getElementById("drawerTitle"),
  drawerBody: document.getElementById("drawerBody"),
  drawerClose: document.getElementById("drawerClose"),
  toast: document.getElementById("toast"),
};

function seedData() {
  const projectRows = [
    projectRow("XM20260001", projects[0], "教学设备采购", 480000, "教务处", "沈志彬", "待审批"),
    projectRow("XM20260002", projects[1], "教学耗材", 86000, "实验教学中心", "杨剑兴", "采购中"),
    projectRow("XM20260003", projects[2], "图书采购", 160000, "图书馆", "张俪源", "验收中"),
  ];
  state.data.project = {
    项目申请: projectRows,
    审批管理: projectRows.map((item, index) => ({
      id: `SP2026000${index + 1}`,
      projectId: item.id,
      project: item.name,
      node: index === 1 ? "退回申请人修改" : "部门负责人审批",
      role: "审核人",
      order: index + 1,
      owner: ["陈立", "刘月朝", "舒志建"][index],
      status: ["待审批", "退回修改", "已通过"][index],
      record: "申请人已提交，等待当前节点处理。",
    })),
    项目列表: projectRows,
  };
  state.data.purchase = {
    采购登记: purchaseRows(),
    采购跟踪: purchaseRows().map((row, index) => ({ ...row, status: ["待采购", "采购中", "采购完成"][index] })),
  };
  state.data.contract = {
    合同登记: contractRows(),
    合同提醒: contractRows().map((row, index) => ({ ...row, due: ["30天后到期", "履约中", "已完成"][index] })),
  };
  state.data.progress = { 月度进度: progressRows(), 项目时间轴: timelineRows() };
  state.data.payment = {
    付款申请: paymentRows(),
    财务审核: paymentRows().map((row, index) => ({ ...row, status: ["待审核", "审核通过", "已付款"][index] })),
  };
  state.data.invoice = { 发票登记: invoiceRows(), 预算统计: budgetRows() };
  state.data.acceptance = {
    验收申请: acceptanceRows(),
    验收记录: acceptanceRows().map((row, index) => ({ ...row, record: ["首次验收待安排", "整改后复验通过", "验收意见已归档"][index] })),
  };
  state.data.closing = {
    结项申请: closingRows(),
    结项校验: closingRows().map((row, index) => ({ ...row, check: index === 0 ? "付款未完成" : "全部通过", status: index === 0 ? "不可结项" : "可结项" })),
    项目归档: closingRows().map((row, index) => ({ ...row, docs: "项目申请、审批记录、合同、发票、验收报告", status: index === 2 ? "已归档" : "待归档" })),
  };
  state.data.system = {
    流程配置: [
      { id: "LC001", name: "小额教学耗材审批", type: "审批流程", role: "部门负责人", order: "1", status: "启用", remark: "适用于10万元以下项目。" },
      { id: "LC002", name: "大额设备采购审批", type: "审批流程", role: "部门负责人-财务-校领导", order: "3", status: "启用", remark: "适用于10万元及以上项目。" },
    ],
    编号规则: [
      { id: "BH001", name: "项目编号规则", type: "编号规则", remark: "XM+年份+四位流水，例如 XM20260001", status: "启用", date: "2026-07-09" },
      { id: "BH002", name: "合同编号规则", type: "编号规则", remark: "HT+年份+四位流水，例如 HT20260001", status: "启用", date: "2026-07-09" },
    ],
    项目类型: ["教学设备采购", "图书采购", "实验室建设", "教学耗材", "校园维修"].map((name, index) => ({
      id: `LX00${index + 1}`,
      name,
      type: "项目类型",
      status: "启用",
      remark: "管理员可维护，不在代码中写死。",
    })),
  };
}

function projectRow(id, name, type, budget, dept, owner, status) {
  return {
    id,
    name,
    type,
    purpose: "改善教学条件，提升课堂教学与实验教学质量。",
    content: "完成设备、资料或耗材的采购、安装、使用交付。",
    target: "按计划完成采购、验收和资料归档。",
    cycle: "2026-07 至 2026-09",
    budget,
    dept,
    owner,
    remark: "V1模拟项目数据。",
    status,
    createdAt: "2026-07-09",
    docs: "项目申请书、预算附件、可行性说明",
  };
}

function purchaseRows() {
  return projects.map((project, index) => ({
    id: `CG2026000${index + 1}`,
    project,
    name: `${project}采购`,
    type: ["设备", "耗材", "图书"][index],
    budget: [460000, 82000, 150000][index],
    method: ["公开招标", "询价", "询价"][index],
    date: `2026-07-${12 + index}`,
    supplier: suppliers[index],
    status: ["待采购", "采购中", "采购完成"][index],
    docs: "采购文件、报价单",
  }));
}

function contractRows() {
  return projects.map((project, index) => ({
    id: `HT2026000${index + 1}`,
    project,
    purchase: `CG2026000${index + 1}`,
    amount: [455000, 81000, 148000][index],
    partner: suppliers[index],
    signDate: `2026-07-${16 + index}`,
    period: `2026-07-${16 + index} 至 2026-09-${16 + index}`,
    status: ["待签订", "履约中", "已完成"][index],
    docs: "合同扫描件",
  }));
}

function progressRows() {
  return projects.map((project, index) => ({
    id: `JD2026000${index + 1}`,
    project,
    month: "2026-07",
    content: ["完成采购需求确认", "完成耗材询价", "完成图书到货清点"][index],
    percent: [35, 55, 90][index],
    issue: ["等待审批完成", "部分报价待补齐", "无"][index],
    nextPlan: ["启动采购", "签订合同", "提交验收"][index],
    delayReason: index === 0 ? "审批节点尚未完成" : "",
    status: ["延期", "正常", "完成"][index],
    docs: "进度附件、现场照片",
  }));
}

function timelineRows() {
  return [
    { id: "TL001", project: projects[0], month: "2026-06", content: "项目申请", status: "完成" },
    { id: "TL002", project: projects[0], month: "2026-07", content: "采购登记", status: "进行中" },
    { id: "TL003", project: projects[0], month: "2026-08", content: "设备安装", status: "待开始" },
    { id: "TL004", project: projects[0], month: "2026-09", content: "验收结项", status: "待开始" },
  ];
}

function paymentRows() {
  return projects.map((project, index) => ({
    id: `FK2026000${index + 1}`,
    project,
    contract: `HT2026000${index + 1}`,
    amount: [136500, 40500, 148000][index],
    percent: [30, 50, 100][index],
    remark: ["首付款申请", "进度款申请", "尾款申请"][index],
    date: index === 2 ? "2026-07-22" : "",
    status: ["待审核", "审核通过", "已付款"][index],
    docs: "付款申请附件",
  }));
}

function invoiceRows() {
  return projects.map((project, index) => ({
    id: `FP2026000${index + 1}`,
    project,
    contract: `HT2026000${index + 1}`,
    payment: `FK2026000${index + 1}`,
    invoiceNo: `24568210${index + 1}`,
    amount: [136500, 40500, 148000][index],
    date: `2026-07-${23 + index}`,
    status: index === 2 ? "已核销" : "已登记",
    docs: "发票扫描件",
  }));
}

function budgetRows() {
  return [
    { id: "YS001", project: projects[0], budget: 480000, contract: "455000", payment: "136500", amount: 136500, status: "匹配" },
    { id: "YS002", project: projects[1], budget: 86000, contract: "81000", payment: "40500", amount: 40500, status: "匹配" },
    { id: "YS003", project: projects[2], budget: 160000, contract: "148000", payment: "148000", amount: 148000, status: "匹配" },
  ];
}

function acceptanceRows() {
  return projects.map((project, index) => ({
    id: `YS2026000${index + 1}`,
    project,
    date: `2026-08-${10 + index}`,
    members: "教务处、资产处、验收组",
    material: "验收报告、验收清单",
    opinion: ["待填写", "整改", "通过"][index],
    rectification: index === 1 ? "2026-08-20" : "",
    status: ["待验收", "整改中", "已通过"][index],
    docs: "验收附件",
  }));
}

function closingRows() {
  return projects.map((project, index) => ({
    id: `JX2026000${index + 1}`,
    project,
    owner: ["沈志彬", "杨剑兴", "张俪源"][index],
    summary: "项目资料已按V1要求汇总。",
    remark: ["等待付款完成后结项", "已满足结项条件", "已完成结项归档"][index],
    status: ["待校验", "待审批", "已结项"][index],
    docs: "成果附件、项目总结",
  }));
}

function renderNav() {
  els.navList.innerHTML = navItems.map(([id, label]) => `<button class="nav-item ${state.active === id ? "active" : ""}" data-nav="${id}" type="button">${label}</button>`).join("");
  els.navList.querySelectorAll("[data-nav]").forEach((btn) => btn.addEventListener("click", () => switchView(btn.dataset.nav)));
}

function switchView(id) {
  state.active = id;
  renderNav();
  render();
}

function render() {
  const config = currentConfig();
  const tab = activeTab();
  const rows = filteredRows();
  els.pageTitle.textContent = config.title;
  els.moduleView.innerHTML = `
    ${renderOverview(config)}
    ${renderTabs(config, tab)}
    ${renderFilters(config.filters)}
    <div class="table-toolbar">
      <h3>${tab}列表</h3>
      <div class="table-actions">
        <button class="ghost-btn" data-export type="button">导出</button>
        <button class="primary-btn" data-add type="button">${actionLabel(tab, config.addLabel)}</button>
      </div>
    </div>
    ${renderTable(rows)}
    ${renderPager(rows.length)}
  `;
  bindModuleEvents();
}

function renderOverview(config) {
  return `<section class="v1-overview">
    <div>
      <h2>${config.title}</h2>
      <p>${config.subtitle}</p>
    </div>
    <div class="v1-metrics">${config.metrics.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("")}</div>
    <div class="v1-flow">${config.flow.map((step, index) => `<span class="${index === 0 ? "start" : index === config.flow.length - 1 ? "end" : ""}">${index + 1}. ${step}</span>`).join("")}</div>
  </section>`;
}

function currentConfig() {
  return pageConfigs[state.active];
}

function activeTab() {
  const config = currentConfig();
  return state.tabs[state.active] || config.tabs[0];
}

function renderTabs(config, tab) {
  return `<div class="module-tabs">${config.tabs.map((name) => `<button class="tab-btn ${name === tab ? "active" : ""}" data-tab="${name}" type="button">${name}</button>`).join("")}</div>`;
}

function renderFilters(filters) {
  return `<div class="filter-bar">${filters.map((name, index) => `<label>${name}：<input data-filter="${index}" placeholder="${name.includes("状态") || name.includes("类型") ? "请选择" : "请输入"}" value="${state.filters[state.active]?.[index] || ""}" /></label>`).join("")}<button class="primary-btn" data-query type="button">查询</button><button class="ghost-btn" data-reset type="button">重置</button></div>`;
}

function filteredRows() {
  const rows = state.data[state.active]?.[activeTab()] || [];
  const keyword = Object.values(state.filters[state.active] || {}).filter(Boolean).join(" ");
  if (!keyword) return rows;
  return rows.filter((row) => JSON.stringify(row).includes(keyword));
}

function renderTable(rows) {
  if (!rows.length) return `<div class="empty">暂无数据，请调整筛选条件或新增记录。</div>`;
  const columns = columnsFor(rows);
  return `<div class="table-wrap"><table class="data-table">
    <thead><tr><th><input type="checkbox" /></th>${columns.map((key) => `<th>${labelMap[key] || key}</th>`).join("")}<th>操作</th></tr></thead>
    <tbody>${rows.map((row) => `<tr><td><input type="checkbox" /></td>${columns.map((key) => `<td>${formatCell(key, row[key])}</td>`).join("")}<td class="op-cell">${rowActions().map((item) => `<button class="link-btn" data-action="${item}" data-id="${row.id}" type="button">${item}</button>`).join("")}</td></tr>`).join("")}</tbody>
  </table></div>`;
}

function columnsFor(rows) {
  const preferred = ["id", "projectId", "name", "project", "type", "budget", "amount", "supplier", "partner", "contract", "percent", "owner", "status", "check", "due", "date", "createdAt"];
  const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  return preferred.filter((key) => keys.includes(key)).slice(0, 8);
}

function formatCell(key, value) {
  if (value === undefined || value === null || value === "") return "--";
  if (["budget", "amount"].includes(key)) return money(value);
  if (key === "percent") return `${value}%`;
  if (["status", "check", "opinion", "due"].includes(key)) return `<span class="status ${statusClass(value)}">${value}</span>`;
  return value;
}

function statusClass(value) {
  const text = String(value);
  if (text.includes("待") || text.includes("退回") || text.includes("不可")) return "pending";
  if (text.includes("中") || text.includes("审核") || text.includes("采购")) return "active";
  if (text.includes("通过") || text.includes("完成") || text.includes("已") || text.includes("可结项") || text.includes("匹配")) return "done";
  if (text.includes("驳回") || text.includes("延期") || text.includes("整改") || text.includes("终止") || text.includes("未")) return "danger";
  return "gray";
}

function rowActions() {
  const tab = activeTab();
  if (tab === "审批管理") return ["审批"];
  const actions = ["详情", "编辑"];
  if (tab === "项目申请") actions.push("提交审批", "撤回申请");
  if (state.active === "purchase") actions.push("采购完成");
  if (state.active === "contract") actions.push("合同终止");
  if (state.active === "progress") actions.push("更新进度");
  if (state.active === "payment") actions.push("财务审核");
  if (state.active === "invoice") actions.push("发票核销");
  if (state.active === "acceptance") actions.push("验收通过", "整改提交");
  if (state.active === "closing") actions.push("结项校验", "结项归档");
  return [...new Set(actions)];
}

function renderPager(total) {
  return `<div class="pager">
    <span class="pager-total">共 ${total} 条</span>
    <button class="pager-btn" disabled type="button">‹</button>
    <button class="pager-btn active" type="button">1</button>
    <button class="pager-btn" type="button">2</button>
    <button class="pager-btn" type="button">3</button>
    <span class="pager-ellipsis">...</span>
    <button class="pager-btn" type="button">10</button>
    <button class="pager-btn" type="button">›</button>
    <select class="pager-size"><option>10 条/页</option><option>20 条/页</option><option>50 条/页</option></select>
    <span class="pager-jump">跳至</span>
    <input class="pager-input" />
    <span class="pager-jump">页</span>
  </div>`;
}

function bindModuleEvents() {
  els.moduleView.querySelectorAll("[data-tab]").forEach((btn) => btn.addEventListener("click", () => {
    state.tabs[state.active] = btn.dataset.tab;
    render();
  }));
  els.moduleView.querySelector("[data-add]")?.addEventListener("click", () => openModal());
  els.moduleView.querySelector("[data-export]")?.addEventListener("click", () => showToast("已生成模拟导出任务"));
  els.moduleView.querySelector("[data-query]")?.addEventListener("click", () => {
    state.filters[state.active] = Object.fromEntries([...els.moduleView.querySelectorAll("[data-filter]")].map((input) => [input.dataset.filter, input.value]));
    render();
  });
  els.moduleView.querySelector("[data-reset]")?.addEventListener("click", () => {
    state.filters[state.active] = {};
    render();
  });
  els.moduleView.querySelectorAll("[data-action]").forEach((btn) => btn.addEventListener("click", () => handleAction(btn.dataset.action, btn.dataset.id)));
}

function handleAction(action, id) {
  const row = findRow(id);
  if (!row) return showToast("当前记录不存在");
  if (action === "详情") return openDrawer(row);
  if (action === "编辑") return openModal(row);
  if (action === "审批") return openApprovalDrawer(row);
  const statusMap = {
    提交审批: "待审批",
    撤回申请: "草稿",
    采购完成: "采购完成",
    合同终止: "已终止",
    更新进度: "正常",
    财务审核: "审核通过",
    发票核销: "已核销",
    验收通过: "已通过",
    整改提交: "整改中",
    结项校验: "可结项",
    结项归档: "已归档",
  };
  requestConfirm({
    title: `确认${action}`,
    message: "该操作会更新当前记录状态，并同步刷新列表数据。",
    summary: `业务页面：${currentConfig().title} / ${activeTab()}<br>当前记录：${row.name || row.project || row.id}<br>操作内容：${action}`,
    onConfirm: () => {
      if (action === "结项校验" && row.check && row.check !== "全部通过") {
        row.status = "不可结项";
        showToast("校验未通过，不能结项");
      } else {
        row.status = statusMap[action] || row.status;
        if (action === "发票核销") row.checked = "已核销";
        if (action === "验收通过") row.opinion = "通过";
        showToast(`${action}已完成`);
      }
      render();
    },
  });
}

function findRow(id) {
  return (state.data[state.active]?.[activeTab()] || []).find((row) => row.id === id);
}

function openModal(row = null) {
  const config = currentConfig();
  state.modal = { row, module: state.active, tab: activeTab() };
  els.modalTitle.textContent = row ? `编辑${config.title}` : actionLabel(activeTab(), config.addLabel);
  els.modalForm.innerHTML = buildForm(config.form, row);
  bindUploadBoxes();
  els.modalMask.classList.remove("hidden");
}

function buildForm(fields, row) {
  return fields.map((item) => {
    const value = row ? row[item.key] || "" : "";
    const label = `<label>${item.required ? '<span class="required-star">*</span>' : ""}${item.label}</label>`;
    if (item.type === "textarea") {
      return `<div class="field wide">${label}<textarea name="${item.key}" data-required="${item.required}" placeholder="请输入${item.label}">${value}</textarea><div class="field-error">请填写${item.label}</div></div>`;
    }
    if (item.type === "select") {
      return `<div class="field">${label}<select name="${item.key}" data-required="${item.required}"><option value="">请选择${item.label}</option>${optionsFor(item).map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`).join("")}</select><div class="field-error">请选择${item.label}</div></div>`;
    }
    if (item.type === "upload") {
      return `<div class="field wide">${label}<input type="hidden" name="${item.key}" data-required="${item.required}" value="${value}" /><div class="upload-box ${value ? "has-file" : ""}" data-upload="${item.key}" data-label="${item.label}">${value || `点击上传${item.label}`}</div><div class="field-error">请上传${item.label}</div></div>`;
    }
    return `<div class="field">${label}<input type="${item.type}" name="${item.key}" data-required="${item.required}" value="${value}" placeholder="请输入${item.label}" /><div class="field-error">请填写${item.label}</div></div>`;
  }).join("");
}

function optionsFor(item) {
  if (item.options.length) return item.options;
  if (item.key === "project") return projects;
  if (item.key === "supplier" || item.key === "partner") return suppliers;
  if (item.key === "purchase") return ["CG20260001", "CG20260002", "CG20260003"];
  if (item.key === "contract") return ["HT20260001", "HT20260002", "HT20260003"];
  if (item.key === "payment") return ["FK20260001", "FK20260002", "FK20260003"];
  return ["启用", "停用"];
}

function bindUploadBoxes() {
  els.modalForm.querySelectorAll("[data-upload]").forEach((box) => {
    box.addEventListener("click", () => {
      const input = els.modalForm.querySelector(`[name="${box.dataset.upload}"]`);
      const fileName = `模拟上传-${box.dataset.label}.pdf`;
      input.value = fileName;
      box.textContent = fileName;
      box.classList.add("has-file");
      box.closest(".field").classList.remove("invalid");
      showToast(`${box.dataset.label}已模拟上传`);
    });
  });
}

function saveModal() {
  if (!state.modal || !validateForm()) return;
  const form = Object.fromEntries(new FormData(els.modalForm).entries());
  const rows = state.data[state.modal.module][state.modal.tab];
  if (state.modal.row) {
    Object.assign(state.modal.row, form);
  } else {
    rows.unshift({ id: nextId(state.modal.module), ...form, status: defaultStatus(state.modal.module) });
  }
  els.modalMask.classList.add("hidden");
  state.modal = null;
  render();
  showToast("已保存，模拟数据已更新");
}

function nextId(module) {
  const prefix = { project: "XM", purchase: "CG", contract: "HT", progress: "JD", payment: "FK", invoice: "FP", acceptance: "YS", closing: "JX", system: "PZ" }[module] || "JL";
  return `${prefix}${new Date().getFullYear()}${String(Date.now()).slice(-4)}`;
}

function defaultStatus(module) {
  return { project: "草稿", purchase: "待采购", contract: "待签订", progress: "正常", payment: "待审核", invoice: "已登记", acceptance: "待验收", closing: "待校验", system: "启用" }[module] || "待处理";
}

function validateForm() {
  let valid = true;
  els.modalForm.querySelectorAll("[data-required='true']").forEach((control) => {
    const fieldNode = control.closest(".field");
    const empty = !String(control.value || "").trim();
    fieldNode.classList.toggle("invalid", empty);
    if (empty) valid = false;
  });
  if (!valid) showToast("请先补全必填项");
  return valid;
}

function openDrawer(row) {
  els.drawerKicker.textContent = `${currentConfig().title} / ${activeTab()}`;
  els.drawerTitle.textContent = row.name || row.project || row.id;
  els.drawerBody.innerHTML = `
    <div class="detail-grid">${Object.entries(row).map(([key, value]) => `<div class="detail-item"><span>${labelMap[key] || key}</span><strong>${formatPlainValue(formatCell(key, value))}</strong></div>`).join("")}</div>
    <div class="timeline">
      <div class="panel-title">V1项目时间轴</div>
      ${["项目申请", "审批", "采购", "合同", "实施", "付款", "发票", "验收", "结项"].map((name, index) => `<div class="timeline-item"><div class="timeline-date">${index + 1}</div><div>${name}${index < 3 ? "已完成" : "待推进"}</div></div>`).join("")}
    </div>
  `;
  els.drawer.classList.remove("hidden");
}

function openApprovalDrawer(row) {
  els.drawerKicker.textContent = "审批详情";
  els.drawerTitle.textContent = row.project || row.name || row.id;
  els.drawerBody.innerHTML = `
    <div class="approval-detail">
      <div class="approval-code">编号：${row.id}</div>
      <h3>${row.project || row.name}</h3>
      <div class="approval-state">审批中，等待${row.owner || "审核人"}处理</div>
      ${renderApprovalListInfo(row)}
      <div class="approval-divider"></div>
      <div class="approval-section-head"><span>流程</span><b>⌄</b></div>
      ${renderApprovalFlow(row)}
    </div>
    <div class="approval-actions">
      <button class="outline-danger-btn" id="approvalReject" type="button">驳回</button>
      <button class="ghost-btn" id="approvalReturn" type="button">退回修改</button>
      <button class="primary-btn" id="approvalAgree" type="button">同意</button>
    </div>
  `;
  els.drawer.classList.remove("hidden");
  [
    ["approvalReject", "驳回", "已驳回"],
    ["approvalReturn", "退回修改", "退回修改"],
    ["approvalAgree", "同意", "已通过"],
  ].forEach(([id, action, status]) => {
    document.getElementById(id).addEventListener("click", () => requestConfirm({
      title: `确认${action}`,
      message: "请确认审批意见，确认后将更新审批记录状态。",
      summary: `审批事项：${row.project || row.name || row.id}<br>当前节点：${row.node || "部门负责人审批"}<br>审批动作：${action}`,
      onConfirm: () => {
        row.status = status;
        row.opinion = action;
        els.drawer.classList.add("hidden");
        render();
        showToast(`审批已${action}`);
      },
    }));
  });
}

function renderApprovalListInfo(row) {
  const keys = columnsFor([row]).filter((key) => key !== "id");
  const rows = keys.map((key) => [labelMap[key] || key, row[key]]).filter(([, value]) => value !== undefined && value !== "");
  return `<div class="approval-list-info">${rows.map(([label, value]) => `<div class="approval-list-row"><span>${label}</span><strong>${formatPlainValue(formatCell(label, value))}</strong></div>`).join("")}</div>`;
}

function renderApprovalFlow(row) {
  const steps = [
    ["发起人", "申请人已提交审批。", "2026-07-09 09:00"],
    ["审批人", `${row.owner || "审核人"}正在处理。`, "等待处理"],
    ["记录归档", "通过后进入下一业务节点。", "待流转"],
  ];
  return `<div class="approval-flow">${steps.map((step, index) => `<div class="approval-flow-item ${index === 0 ? "done" : index === 1 ? "current" : ""}">
    <div class="approval-avatar">${index === 0 ? "✓" : step[0].slice(0, 1)}</div>
    <div class="approval-flow-main"><div class="approval-flow-title"><strong>${step[0]}</strong><span>${step[2]}</span></div><p>${step[1]}</p></div>
  </div>`).join("")}</div>`;
}

function actionLabel(tab, fallback) {
  if (tab.includes("审批")) return "处理审批";
  if (tab.includes("校验")) return "执行校验";
  if (tab.includes("归档")) return "确认归档";
  if (tab.includes("提醒")) return "处理提醒";
  return fallback;
}

function requestConfirm({ title, message, summary, onConfirm }) {
  state.confirm = onConfirm;
  els.confirmTitle.textContent = title;
  els.confirmMessage.textContent = message;
  els.confirmSummary.innerHTML = summary || "";
  els.confirmMask.classList.remove("hidden");
}

function commitConfirm() {
  const fn = state.confirm;
  closeConfirm();
  if (fn) fn();
}

function closeConfirm() {
  state.confirm = null;
  els.confirmMask.classList.add("hidden");
}

function openPrdModal() {
  const config = currentConfig();
  const tab = activeTab();
  els.prdTitle.textContent = `${config.title} PRD`;
  els.prdBody.innerHTML = buildPrd(config, tab);
  els.prdMask.classList.remove("hidden");
}

function buildPrd(config, tab) {
  const rows = config.tabs.map((name) => `<tr><td>${config.title}</td><td>${name}</td><td>支持${name}的数据登记、查询、详情查看、状态流转和资料关联，满足V1业务闭环。</td><td>${name === tab ? "P0" : "P1"}</td><td>静态原型使用前端模拟数据。</td></tr>`).join("");
  return `
    ${prdSection("1. 背景与目标", [`建设${config.title}能力，支撑学校项目从申请到结项的轻量级闭环管理。`, "V1不引入企业ERP能力，仅覆盖项目参数要求和必要流程断点。"])}
    ${prdSection("2. 用户与使用场景", ["申请人提交项目资料，审核人处理审批，负责人更新进度，财务人员处理付款和发票，管理员维护流程、编号和项目类型。"])}
    ${prdSection("3. 需求范围", ["In Scope：查询、新增、编辑、详情、状态流转、附件模拟上传、PRD查看、流程图查看。", "Out of Scope：真实后端、真实权限、OCR、供应商评级、统计大屏、地图、真实PDF或ZIP导出。"])}
    <h3>4. 功能需求列表</h3><table class="prd-table"><thead><tr><th>功能模块</th><th>功能点</th><th>需求描述</th><th>优先级（P0 / P1 / P2）</th><th>备注说明</th></tr></thead><tbody>${rows}</tbody></table>
    ${prdSection("5. 核心流程与交互说明", [`用户进入${config.title}后，通过顶部标签定位${tab}，再执行查询、新增、详情或业务动作。`, "提交审批、审批、财务审核、核销、验收、结项等关键动作必须二次确认。"])}
    ${prdSection("6. 异常场景与边界条件", ["必填字段为空时阻止保存并高亮字段。", "筛选无结果时展示空状态。", "结项校验未通过时禁止结项归档。"])}
    ${prdSection("7. 数据口径与埋点需求", ["项目编号为全流程唯一标识，采购、合同、付款、发票、验收、结项均通过项目或合同关联。", "建议埋点：页面访问、查询、新增、详情、状态确认、PRD查看、流程图查看。"])}
    ${prdSection("8. 风险、依赖与限制", ["当前为静态原型，数据刷新仅在浏览器内模拟。", "生产化依赖组织用户、流程引擎、附件服务、财务接口和消息服务。"])}
    ${prdSection("9. 验收标准", [`${config.title}页面可访问并显示模拟数据。`, "新增弹窗字段为空，必填项仅在字段名前显示星号。", "关键动作弹出二次确认并可更新列表状态。"])}
  `;
}

function prdSection(title, lines) {
  return `<h3>${title}</h3><ul>${lines.map((line) => `<li>${line}</li>`).join("")}</ul>`;
}

function openFlowChartModal() {
  const groups = [
    ["V1项目全过程", ["项目申请", "审批", "采购", "合同", "项目实施", "付款申请", "发票登记", "验收", "结项"]],
    ["项目立项操作", ["新建项目", "保存草稿", "提交审批", "同意/驳回/退回修改", "生成项目编号"]],
    ["采购合同操作", ["关联项目", "登记采购", "确定供应商", "登记合同", "到期提醒"]],
    ["付款发票操作", ["选择合同", "发起付款", "财务审核", "登记付款时间", "登记发票", "发票核销"]],
    ["验收结项操作", ["提交验收", "填写意见", "整改", "保存验收记录", "结项校验", "自动归档"]],
    ["系统配置操作", ["配置审批流程", "配置审批角色", "配置审批顺序", "维护编号规则", "维护项目类型"]],
  ];
  els.flowBody.innerHTML = groups.map(([title, steps]) => renderFlowGroup(title, steps)).join("");
  els.flowMask.classList.remove("hidden");
}

function renderFlowGroup(title, steps) {
  return `<section class="flow-group"><div class="flow-group-head"><h3>${title}</h3><span>${steps.length} 个节点</span></div><div class="flow-track">${steps.map((step, index) => `<div class="flow-node ${index === 0 ? "start" : index === steps.length - 1 ? "end" : index % 3 === 0 ? "decision" : ""}"><b>${index + 1}</b><span>${step}</span></div>${index < steps.length - 1 ? '<i class="flow-arrow">→</i>' : ""}`).join("")}</div></section>`;
}

function formatPlainValue(value) {
  return String(value).replace(/<[^>]+>/g, "");
}

function money(value) {
  return `¥${Number(value || 0).toLocaleString("zh-CN")}`;
}

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  toastTimer = setTimeout(() => els.toast.classList.add("hidden"), 2200);
}

function bindGlobalEvents() {
  els.modalClose.addEventListener("click", () => els.modalMask.classList.add("hidden"));
  els.modalCancel.addEventListener("click", () => els.modalMask.classList.add("hidden"));
  els.modalSave.addEventListener("click", saveModal);
  els.prdOpen.addEventListener("click", openPrdModal);
  els.prdClose.addEventListener("click", () => els.prdMask.classList.add("hidden"));
  els.prdConfirm.addEventListener("click", () => els.prdMask.classList.add("hidden"));
  els.flowChartBtn.addEventListener("click", openFlowChartModal);
  els.flowClose.addEventListener("click", () => els.flowMask.classList.add("hidden"));
  els.flowConfirm.addEventListener("click", () => els.flowMask.classList.add("hidden"));
  els.confirmClose.addEventListener("click", closeConfirm);
  els.confirmCancel.addEventListener("click", closeConfirm);
  els.confirmOk.addEventListener("click", commitConfirm);
  els.drawerClose.addEventListener("click", () => els.drawer.classList.add("hidden"));
}

seedData();
renderNav();
bindGlobalEvents();
switchView("project");
