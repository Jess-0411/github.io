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
  actualAmount: "实际采购金额",
  startAt: "开始采购时间",
  finishAt: "完成采购时间",
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
  announceAt: "招标公告发布时间",
  bidDeadline: "投标截止时间",
  awardAt: "中标单位确认时间",
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
  resultOpinion: "验收结果",
  resultDocs: "验收结果附件",
  rectificationDocs: "整改附件",
  rectification: "整改期限",
  summary: "项目总结",
  result: "成果附件",
  archiveText: "归档说明",
  archiveDocs: "归档附件",
  submitter: "提交人员",
  submittedAt: "提交时间",
  check: "校验结果",
  docs: "附件",
  code: "类型编码",
  usedCount: "使用项目数",
  creator: "创建人员",
  sort: "显示顺序",
};

const projects = ["智慧教室多媒体设备采购", "化学实验耗材补充项目", "图书馆教学参考书采购"];
const suppliers = ["明德教育科技有限公司", "青澜教学设备有限公司", "华文书业集团"];
const appFirstOpenedAt = formatDateTime(new Date());
const uploadRules = {
  maxFiles: 5,
  maxSize: 15 * 1024 * 1024,
  extensions: [".prd", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".jpj", ".png"],
};

function field(key, label, type = "text", required = false, options = []) {
  return { key, label, type, required, options };
}

const pageConfigs = {
  project: {
    title: "项目管理",
    subtitle: "完成项目创建、项目详情查看与项目审批流转。",
    metrics: [["项目总数", "3"], ["待审批", "1"], ["退回修改", "1"], ["已通过", "1"]],
    flow: ["创建项目", "查看详情", "提交审批", "审批处理"],
    addLabel: "新建项目",
    tabs: ["项目管理", "项目审批"],
    filters: ["项目名称", "项目类型", "负责人", "状态"],
    tabFilters: {
      项目类型设置: ["类型名称"],
    },
    form: [
      field("name", "项目名称", "text", true),
      field("type", "项目类型", "select", true),
      field("purpose", "项目目的", "textarea", true),
      field("content", "建设内容", "textarea", true),
      field("target", "预期目标", "textarea", true),
      field("cycle", "项目周期", "daterange", true),
      field("budget", "项目预算", "number", true),
      field("dept", "责任部门", "text", true),
      field("owner", "项目负责人", "text", true),
      field("remark", "备注", "textarea"),
      field("docs", "项目申请书/预算附件/可行性说明", "upload"),
    ],
    tabForms: {
      项目类型设置: [
        field("name", "类型名称", "text", true),
        field("remark", "类型说明", "textarea"),
      ],
    },
  },
  purchase: {
    title: "采购管理",
    subtitle: "关联已通过项目，新增采购信息并跟踪采购状态。",
    metrics: [["待采购", "1"], ["采购中", "1"], ["采购完成", "1"], ["采购节点", "3"]],
    flow: ["关联项目", "新增采购", "开始采购", "采购完成"],
    addLabel: "新增采购",
    tabs: ["新增采购"],
    filters: ["采购名称", "所属项目", "状态"],
    form: [
      field("project", "所属项目", "select", true),
      field("name", "采购名称", "text", true),
      field("type", "采购类型", "select", true, ["设备", "耗材", "图书", "服务"]),
      field("budget", "预算金额", "number", true),
      field("method", "采购方式", "select", true, ["公开招标", "询价", "竞争性谈判"]),
      field("date", "采购时间", "date", true),
      field("docs", "采购文件/报价单", "upload"),
    ],
  },
  contract: {
    title: "合同管理",
    subtitle: "关联采购结果，管理合同登记与履约状态。",
    metrics: [["待签订", "1"], ["履约中", "1"], ["已完成", "1"], ["已终止", "0"]],
    flow: ["选择采购", "登记合同", "上传附件", "履约跟踪"],
    addLabel: "登记合同",
    tabs: ["合同登记"],
    filters: ["合同编号", "所属项目", "合作单位", "状态"],
    form: [
      field("project", "所属项目", "select", true),
      field("purchase", "所属采购", "select", true),
      field("id", "合同编号", "text", true),
      field("amount", "合同金额", "number", true),
      field("partner", "合作单位", "select", true),
      field("signDate", "预计签订日期", "date", true),
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
    metrics: [["待审核", "1"], ["审核通过", "1"], ["已驳回", "1"], ["付款金额", "¥325,000"]],
    flow: ["选择合同", "发起付款", "财务审核", "登记付款时间"],
    addLabel: "发起付款",
    tabs: ["付款申请", "财务审核"],
    filters: ["所属项目", "所属合同", "状态", "付款时间"],
    form: [
      field("project", "所属项目", "select", true),
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
    metrics: [["已登记", "2"], ["发票金额", "¥325,000"]],
    flow: ["关联付款", "登记发票", "上传扫描件"],
    addLabel: "登记发票",
    tabs: ["发票登记"],
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
    subtitle: "提交验收材料，审核时填写验收结果；待整改项目提交整改后回到待验收。",
    metrics: [["待验收", "1"], ["待整改", "1"], ["已验收", "1"], ["验收记录", "3"]],
    flow: ["提交验收", "验收审核", "提交整改", "记录归档"],
    addLabel: "提交验收",
    tabs: ["验收申请", "验收审核"],
    filters: ["所属项目", "验收人员", "状态"],
    form: [
      field("project", "所属项目", "select", true),
      field("date", "验收时间", "date", true),
      field("members", "验收人员", "text", true),
      field("material", "验收材料", "textarea", true),
      field("docs", "验收附件", "upload"),
    ],
  },
  closing: {
    title: "项目归档",
    subtitle: "项目已验收后自动进入项目归档，提交归档资料后进入归档审批。",
    metrics: [["待审批", "3"], ["已驳回", "2"], ["已归档", "2"], ["归档资料", "6类"]],
    flow: ["已验收", "新增归档", "待审批", "归档完成"],
    addLabel: "新增归档",
    tabs: ["项目归档", "归档审核"],
    filters: ["所属项目", "负责人", "归档状态"],
    form: [
      field("project", "所属项目", "select", true),
      field("summary", "项目总结", "textarea", true),
      field("result", "成果附件", "upload", true),
      field("remark", "归档说明", "textarea", true),
    ],
  },
  system: {
    title: "系统管理",
    subtitle: "维护审批流程配置与项目进度节点，保持 V1 配置简洁。",
    metrics: [["流程配置", "2"], ["审批角色", "2"], ["进度节点", "9"], ["配置模块", "2"]],
    flow: ["配置流程", "设置角色", "配置节点", "流程生效"],
    addLabel: "新增配置",
    tabs: ["流程配置", "项目进度节点"],
    filters: ["名称", "类型", "状态", "更新时间"],
    tabFilters: {
      项目进度节点: ["节点名称"],
    },
    form: [
      field("name", "配置名称", "text", true),
      field("type", "配置类型", "select", true, ["审批流程", "审批角色"]),
      field("remark", "配置说明", "textarea", true),
    ],
    tabForms: {
      项目进度节点: [
        field("name", "项目进度节点", "text", true),
        field("sort", "显示顺序", "number", true),
        field("remark", "节点说明", "textarea"),
      ],
    },
  },
};

const navItems = [
  ["project", "项目管理"],
  ["purchase", "采购管理"],
  ["contract", "合同管理"],
  ["payment", "付款申请"],
  ["invoice", "发票管理"],
  ["acceptance", "验收管理"],
  ["closing", "项目归档"],
  ["system", "系统管理"],
];

const state = { active: "project", tabs: {}, filters: {}, modal: null, confirm: null, data: {}, subPage: null, detailId: null, flowStep: 0 };

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
  confirmKicker: document.querySelector("#confirmMask .prd-kicker"),
  confirmTitle: document.getElementById("confirmTitle"),
  confirmMessage: document.getElementById("confirmMessage"),
  confirmSummary: document.getElementById("confirmSummary"),
  confirmExtra: document.getElementById("confirmExtra"),
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
    项目管理: projectRows,
    项目审批: projectRows.map((item, index) => ({
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
    项目类型设置: [
      { id: "LX20260001", name: "教学设备采购", remark: "多媒体教学设备、实验仪器等教学直接相关设备采购。", usedCount: 1, createdAt: appFirstOpenedAt, creator: "admin" },
      { id: "LX20260002", name: "教学耗材", remark: "实验耗材、教学用具补充等低值易耗项目。", usedCount: 1, createdAt: appFirstOpenedAt, creator: "admin" },
      { id: "LX20260003", name: "图书采购", remark: "图书资料、教学参考书等采购项目。", usedCount: 1, createdAt: appFirstOpenedAt, creator: "admin" },
      { id: "LX20260004", name: "校园维修", remark: "后续扩展使用，当前暂无项目关联。", usedCount: 0, createdAt: appFirstOpenedAt, creator: "admin" },
    ],
  };
  state.data.purchase = {
    新增采购: purchaseRows(),
  };
  state.data.contract = {
    合同登记: contractRows(),
  };
  state.data.progress = { 月度进度: progressRows(), 项目时间轴: timelineRows() };
  state.data.payment = {
    付款申请: paymentRows(),
    财务审核: paymentRows().map((row, index) => ({ ...row, status: ["待审核", "审核通过", "已驳回"][index] })),
  };
  state.data.invoice = { 发票登记: invoiceRows(), 预算统计: budgetRows() };
  state.data.acceptance = {
    验收申请: acceptanceRows(),
    验收审核: acceptanceRows(),
  };
  state.data.closing = {
    项目归档: closingRows(),
    归档审核: closingRows().map((row) => ({ ...row })),
  };
  state.data.system = {
    流程配置: [
      { id: "LC001", name: "项目审批流程", type: "审批流程", status: "启用", updatedAt: "2026-07-10 09:00", remark: "项目立项审批流程。" },
      { id: "LC002", name: "采购审批流程", type: "审批流程", status: "启用", updatedAt: "2026-07-10 09:05", remark: "采购业务审批流程。" },
      { id: "LC003", name: "付款审批流程", type: "审批流程", status: "启用", updatedAt: "2026-07-10 09:10", remark: "付款申请审批流程。" },
      { id: "LC004", name: "验收审批流程", type: "审批流程", status: "启用", updatedAt: "2026-07-10 09:15", remark: "验收业务审批流程。" },
      { id: "LC005", name: "项目归档流程", type: "审批流程", status: "启用", updatedAt: "2026-07-10 09:20", remark: "项目归档流程。" },
    ],
    项目进度节点: progressNodeRows(),
  };
  state.data.projectProgress = Object.fromEntries(projectRows.map((row) => [row.id, defaultProjectProgress(row)]));
}

function projectRow(id, name, type, budget, dept, owner, status) {
  return {
    id,
    name,
    type,
    purpose: "改善教学条件，提升课堂教学与实验教学质量。",
    content: "完成设备、资料或耗材的采购、安装、使用交付。",
    target: "按计划完成采购、验收和资料归档。",
    cycle: "2026-07-01 至 2026-09-30",
    budget,
    dept,
    owner,
    remark: "V1模拟项目数据。",
    status,
    createdAt: "2026-07-09",
    docs: [`${name}-项目申请书.pdf`, `${name}-预算附件.xlsx`, `${name}-可行性说明.docx`],
  };
}

function purchaseRows() {
  return projects.map((project, index) => ({
    id: `CG2026000${index + 1}`,
    project,
    name: `${project}采购`,
    type: ["设备", "耗材", "图书"][index],
    budget: [460000, 82000, 150000][index],
    actualAmount: ["", "", 148000][index],
    method: ["公开招标", "询价", "询价"][index],
    date: `2026-07-${12 + index}`,
    startAt: ["", "2026-07-13 09:00", "2026-07-14 09:00"][index],
    finishAt: ["", "", "2026-07-22 10:30"][index],
    announceAt: ["", "2026-07-13 09:00", "2026-07-14 09:00"][index],
    bidDeadline: ["", "2026-07-18 17:00", "2026-07-19 17:00"][index],
    awardAt: ["", "", "2026-07-21 10:00"][index],
    supplier: ["", "", suppliers[index]][index],
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
    signDate: index === 0 ? "" : `2026-07-${16 + index}`,
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
    { id: "TL002", project: projects[0], month: "2026-07", content: "新增采购", status: "进行中" },
    { id: "TL003", project: projects[0], month: "2026-08", content: "设备安装", status: "待开始" },
    { id: "TL004", project: projects[0], month: "2026-09", content: "验收归档", status: "待开始" },
  ];
}

function progressNodeRows() {
  return ["项目申请", "审批", "采购", "合同", "实施", "付款", "发票", "验收", "归档"].map((name, index) => ({
    id: `JD${String(index + 1).padStart(3, "0")}`,
    name,
    sort: index + 1,
    remark: `${name}阶段进度节点`,
    creator: "admin",
  }));
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
    status: ["待审核", "审核通过", "已驳回"][index],
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
    status: ["待验收", "待整改", "已验收"][index],
    docs: "验收附件",
    resultDocs: index === 2 ? "验收结果附件.pdf" : "",
    rectificationDocs: index === 1 ? "整改照片.png" : "",
    rectificationText: index === 1 ? "已补充设备安装照片，等待复验。" : "",
  }));
}

function closingRows() {
  const rows = [
    [projects[0], "待审批", "沈志彬"],
    [projects[1], "待审批", "杨剑兴"],
    [projects[2], "已驳回", "张俪源"],
    [projects[0], "已归档", "沈志彬"],
    [projects[1], "已驳回", "杨剑兴"],
    [projects[2], "已归档", "张俪源"],
  ];
  return rows.map(([project, status, owner], index) => ({
    id: `GD2026000${index + 1}`,
    project,
    owner,
    summary: "项目资料已按V1要求汇总。",
    remark: "项目已验收，待提交归档资料。",
    status,
    docs: "项目申请、审批记录、合同、发票、验收报告",
    archiveText: "已汇总项目实施、验收及成果资料，申请归档。",
    archiveDocs: "项目归档资料.zip",
    submittedAt: `2026-07-${10 + index}`,
    submitter: "admin",
    opinion: status === "已驳回" ? "归档资料需补充成果附件说明。" : "",
  }));
}

function renderNav() {
  els.navList.innerHTML = navItems.map(([id, label]) => `<button class="nav-item ${state.active === id ? "active" : ""}" data-nav="${id}" type="button">${label}</button>`).join("");
  els.navList.querySelectorAll("[data-nav]").forEach((btn) => btn.addEventListener("click", () => switchView(btn.dataset.nav)));
}

function switchView(id) {
  state.active = id;
  state.subPage = null;
  state.detailId = null;
  renderNav();
  render();
}

function render() {
  const config = currentConfig();
  if (state.active === "project" && state.subPage === "projectTypes") return renderProjectTypePage(config);
  if (state.active === "project" && state.subPage === "projectDetail") return renderProjectDetailPage();
  if (state.active === "project" && state.subPage === "approvalDetail") return renderApprovalDetailPage();
  if (state.active === "payment" && state.subPage === "paymentDetail") return renderPaymentDetailPage();
  if (state.active === "payment" && state.subPage === "paymentAudit") return renderPaymentAuditPage();
  if (state.active === "acceptance" && state.subPage === "acceptanceAudit") return renderAcceptanceAuditPage();
  if (state.active === "closing" && state.subPage === "closingDetail") return renderClosingDetailPage();
  const tab = activeTab();
  if (state.active === "system" && tab === "流程配置" && state.subPage === "flowEditor") return renderSystemFlowConfig(config);
  if (state.active === "system" && tab === "流程配置") return renderSystemFlowList(config);
  const rows = filteredRows();
  const hideToolbarActions = state.active === "project" && tab === "项目审批";
  const showAddButton = true;
  const tableOptions = { selectable: false };
  els.pageTitle.textContent = config.title;
  els.moduleView.innerHTML = `
    ${renderTabs(config, tab)}
    ${renderStatusGuide()}
    ${renderFilters(filtersForActivePage(config, tab))}
    ${hideToolbarActions ? "" : `<div class="table-toolbar type-toolbar">
      <div class="table-actions">
        ${state.active === "project" && tab === "项目管理" ? '<button class="ghost-btn" data-project-types type="button">项目类型管理</button>' : ""}
        <button class="ghost-btn" data-export type="button">导出</button>
        ${showAddButton ? `<button class="primary-btn" data-add type="button">${actionLabel(tab, config.addLabel)}</button>` : ""}
      </div>
    </div>`}
    ${renderTable(rows, tableOptions)}
    ${rows.length > 10 ? renderPager(rows.length) : ""}
  `;
  bindModuleEvents();
}

function renderProjectTypePage(config) {
  const tab = "项目类型设置";
  const rows = filteredRows();
  els.pageTitle.textContent = "项目类型管理";
  els.moduleView.innerHTML = `
    <div class="sub-page-head">
      <button class="ghost-btn" data-back-project type="button">返回</button>
    </div>
    ${renderFilters(filtersForActivePage(config, tab), "compact")}
    <div class="table-toolbar type-toolbar">
      <div class="table-actions">
        <button class="ghost-btn" data-export type="button">导出</button>
        <button class="primary-btn" data-add type="button">新建项目类型</button>
      </div>
    </div>
    ${renderTable(rows, { selectable: false })}
    ${rows.length > 10 ? renderPager(rows.length) : ""}
  `;
  bindModuleEvents();
}

function renderSystemFlowConfig(config) {
  els.pageTitle.textContent = config.title;
  els.moduleView.innerHTML = `
    <div class="sub-page-head"><button class="ghost-btn" data-back-project type="button">返回</button></div>
    <div class="flow-designer">
      ${renderFlowDesignerSteps()}
      <div class="flow-designer-body">
        ${renderFlowDesignerStepContent()}
      </div>
      <div class="flow-designer-footer">
        <button class="ghost-btn" data-flow-prev type="button" ${state.flowStep === 0 ? "disabled" : ""}>上一步</button>
        <button class="ghost-btn" data-flow-save type="button">保存草稿</button>
        <button class="primary-btn" data-flow-next type="button">${state.flowStep === flowDesignerSteps().length - 1 ? "发布流程" : "下一步"}</button>
      </div>
    </div>
  `;
  bindModuleEvents();
}

function renderSystemFlowList(config) {
  const rows = state.data.system?.流程配置 || [];
  els.pageTitle.textContent = config.title;
  els.moduleView.innerHTML = `
    ${renderTabs(config, "流程配置")}
    <div class="table-toolbar type-toolbar"><div class="table-actions">
      <button class="primary-btn" data-flow-add type="button">新增流程</button>
    </div></div>
    <table class="data-table"><thead><tr><th>序号</th><th>流程名称</th><th>状态</th><th>最近修改时间</th><th>操作</th></tr></thead>
    <tbody>${rows.map((row, index) => `<tr><td>${index + 1}</td><td>${row.name}</td><td>${formatCell("status", row.status)}</td><td>${row.updatedAt || "-"}</td><td class="op-cell"><button class="link-btn" data-flow-edit="${row.id}" type="button">编辑</button><button class="link-btn" data-flow-toggle="${row.id}" type="button">${row.status === "启用" ? "停用" : "启用"}</button></td></tr>`).join("")}</tbody></table>
  `;
  bindModuleEvents();
}

function flowDesignerSteps() {
  return ["基础信息", "审批表单", "审批流程", "高级设置"];
}

function renderFlowDesignerSteps() {
  return `<div class="flow-stepper">${flowDesignerSteps().map((name, index) => `<button class="flow-step ${index === state.flowStep ? "active" : ""} ${index < state.flowStep ? "done" : ""}" data-flow-step="${index}" type="button"><span>${index + 1}</span>${name}</button>`).join("")}</div>`;
}

function renderFlowDesignerStepContent() {
  const renderers = [renderFlowBasicStep, renderFlowFormStep, renderFlowProcessStep, renderFlowAdvancedStep];
  return renderers[state.flowStep]();
}

function renderFlowBasicStep() {
  return `<div class="flow-basic-layout">
    <div class="flow-basic-form">
      <div class="flow-icon-card">
        <span class="flow-icon-main">¥</span>
      </div>
      <label><span class="required-star">*</span>表单名称
        <div class="input-with-count"><input value="项目立项审批" maxlength="50" /><span>6/50</span></div>
      </label>
      <label>表单说明
        <div class="textarea-with-count"><textarea placeholder="请输入">适用于学校教学采购项目的立项审批。</textarea><span>18/100</span></div>
      </label>
      <label>表单可见范围
        <select><option>仅教职工可见</option><option>仅管理员可见</option><option>全部人员可见</option></select>
      </label>
      <label><span class="required-star">*</span>分组
        <select><option>项目管理</option><option>采购管理</option><option>系统管理</option></select>
      </label>
      <label>表单管理员
        <select><option value="">请选择</option><option>admin</option><option>教务处管理员</option></select>
      </label>
    </div>
  </div>`;
}

function renderFlowFormStep() {
  const controls = ["单行文本输入", "多行文本输入", "数字输入框", "单选框", "多选框", "日期", "部门选择", "日期时间区间"];
  const specialControls = ["上传附件", "关联审批单"];
  const previewRows = [
    ["部门选择", "选择部门", "请选择部门"],
    ["多行文本输入", "", "请输入内容"],
    ["单选框", "", "请选择选项"],
    ["日期", "", "请选择日期时间"],
  ];
  return `<div class="flow-form-builder">
    <aside class="flow-control-palette">
      <div class="segmented"><button class="active" type="button">控件</button><button type="button">套件</button></div>
      <h4>基础控件</h4>
      <div class="control-grid">${controls.map((item) => `<button type="button">＋ ${item}</button>`).join("")}</div>
      <h4>特殊控件</h4>
      <div class="control-grid">${specialControls.map((item) => `<button type="button">＋ ${item}</button>`).join("")}</div>
    </aside>
    <main class="phone-preview">
      <div class="phone-shell">
        ${previewRows.map(([label, action, placeholder], index) => `<section class="phone-field ${index === 3 ? "selected" : ""}">
          <div class="phone-label">${index === 0 ? '<span class="required-star">*</span>' : ""}${label}${index === 3 ? '<b>×</b>' : ""}</div>
          ${action ? `<button class="primary-btn tiny-btn" type="button">${action}</button><span>${placeholder}</span>` : `<div class="${label.includes("多行") ? "phone-textarea" : "phone-input"}">${placeholder}</div>`}
        </section>`).join("")}
      </div>
    </main>
    <aside class="flow-property-panel">
      <h4>日期</h4>
      <label>表单名称<input value="日期" /></label>
      <label>提示文字<input placeholder="请设置日期提示文字" /></label>
      <label>日期格式<select><option>年-月-日 时:分</option><option>年-月-日</option></select></label>
      <div class="switch-row"><span>必填项</span><input type="checkbox" /></div>
      <div class="switch-row"><span>可打印</span><input type="checkbox" checked /></div>
    </aside>
  </div>`;
}

function renderFlowProcessStep() {
  const nodes = [
    ["发起人", "仅教职工可见", "green", ""],
    ["审批人", "发起人的直接主管", "orange", ""],
    ["审批人", "请选择审批人", "orange error", "未指定审批人"],
  ];
  return `<div class="flow-process-layout">
    <main class="approval-canvas">
      ${nodes.map((node, index) => `<div class="flow-node-card ${node[2]}">
        <div class="node-card-head">${node[0]}</div>
        <div class="node-card-body"><span>${node[1]}</span><b>›</b></div>
        ${node[3] ? `<em>${node[3]}</em>` : ""}
      </div>${index < nodes.length - 1 ? '<button class="node-add-btn" type="button">＋</button><i class="node-line"></i>' : ""}`).join("")}
      <button class="node-add-btn" type="button">＋</button>
      <div class="flow-end-pill">流程结束</div>
    </main>
    <aside class="approver-panel">
      <h3>审批人</h3>
      <div class="warning-tip">审批人选择范围受步骤【表单可见范围】影响，请根据实际场景进行配置</div>
      <h4>设置审批人</h4>
      <p>选择审批对象</p>
      <div class="radio-grid">
        <label><input type="radio" checked /> 指定教职工</label>
        <label><input type="radio" /> 指定角色</label>
        <label><input type="radio" /> 直属主管</label>
        <label><input type="radio" /> 连续多级主管</label>
        <label><input type="radio" /> 自选家长</label>
      </div>
      <button class="primary-btn" type="button">＋ 选择人员</button>
      <div class="panel-divider"></div>
      <h4>审批人为空时处理方案</h4>
      <label><input type="radio" checked /> 自动通过</label>
      <label><input type="radio" /> 自动转交审批管理员</label>
      <label class="disabled-option"><input type="radio" disabled /> 自动转交到指定人员</label>
    </aside>
  </div>`;
}

function renderFlowAdvancedStep() {
  return `<div class="flow-advanced-layout">
    <h2>撤销/修改审批单</h2>
    <section>
      <h3>撤销设置</h3>
      <label class="check-line"><input type="checkbox" checked /> 允许提交人撤销 <input class="inline-number" type="number" value="180" /> 天内已通过的审批单</label>
      <label class="check-line"><input type="checkbox" checked /> 允许提交人撤销审批中的审批单（最多180天）</label>
    </section>
    <section>
      <h3>修改设置</h3>
      <label class="check-line"><input type="checkbox" checked /> 允许修改 <input class="inline-number" type="number" value="90" /> 天内提交并通过的审批，最多只允许修改 <input class="inline-number" type="number" value="1" /> 次</label>
    </section>
  </div>`;
}

function renderProjectDetailPage() {
  const row = (state.data.project?.项目管理 || []).find((item) => item.id === state.detailId);
  if (!row) {
    state.subPage = null;
    state.detailId = null;
    showToast("当前项目不存在");
    return render();
  }
  els.pageTitle.textContent = "项目详情";
  els.moduleView.innerHTML = `
    <div class="sub-page-head">
      <button class="ghost-btn" data-back-project type="button">返回</button>
    </div>
    <div class="detail-page">
      <h2>${row.name}</h2>
      ${renderProjectInfoGrid(row)}
      <div class="progress-section">
        <div class="panel-title progress-title"><span>进度表</span><button class="primary-btn" data-add-project-progress type="button">添加进度</button></div>
        <div class="table-wrap"><table class="data-table progress-table">
          <thead><tr><th>进度节点</th><th>完成时间</th><th>操作人</th></tr></thead>
          <tbody>${projectProgressRows(row).map((item) => `<tr><td>${item.name}</td><td>${item.completedAt || "-"}</td><td>${item.operator || "-"}</td></tr>`).join("")}</tbody>
        </table></div>
      </div>
    </div>
  `;
  bindModuleEvents();
}

function renderApprovalDetailPage() {
  const approval = (state.data.project?.项目审批 || []).find((item) => item.id === state.detailId);
  const project = findProjectById(approval?.projectId);
  if (!approval || !project) {
    state.subPage = null;
    state.detailId = null;
    showToast("当前审批记录不存在");
    return render();
  }
  els.pageTitle.textContent = "项目审批";
  els.moduleView.innerHTML = `
    <div class="sub-page-head">
      <button class="ghost-btn" data-back-project type="button">返回</button>
    </div>
    <div class="detail-page approval-page">
      <h2>${project.name}</h2>
      ${renderProjectInfoGrid(project)}
      <div class="approval-page-section">
        <div class="panel-title">审批流程</div>
        ${renderApprovalFlow(approval)}
      </div>
      <div class="approval-actions approval-page-actions">
        <button class="outline-danger-btn" data-approval-action="驳回" data-approval-status="已驳回" type="button">驳回</button>
        <button class="primary-btn" data-approval-action="同意" data-approval-status="已通过" type="button">同意</button>
      </div>
    </div>
  `;
  bindModuleEvents();
}

function renderPaymentAuditPage() {
  const payment = (state.data.payment?.[activeDataKey()] || []).find((item) => item.id === state.detailId);
  if (!payment) {
    state.subPage = null;
    state.detailId = null;
    showToast("当前付款记录不存在");
    return render();
  }
  const isAudit = state.subPage === "paymentAudit";
  els.pageTitle.textContent = isAudit ? "财务审核" : "付款申请详情";
  els.moduleView.innerHTML = `
    <div class="sub-page-head">
      <button class="ghost-btn" data-back-project type="button">返回</button>
    </div>
    <div class="detail-page approval-page">
      <h2>${payment.contract || payment.id}</h2>
      <div class="approval-page-section">
        <div class="panel-title">付款基本信息</div>
        ${renderPaymentInfoGrid(payment)}
      </div>
      <div class="approval-page-section">
        <div class="panel-title">流程内容</div>
        ${renderApprovalFlow(payment)}
      </div>
      ${isAudit ? `<div class="approval-actions approval-page-actions">
        <button class="outline-danger-btn" data-approval-action="驳回" data-approval-status="已驳回" type="button">驳回</button>
        <button class="primary-btn" data-approval-action="同意" data-approval-status="审核通过" type="button">同意</button>
      </div>` : ""}
    </div>
  `;
  bindModuleEvents();
}

function renderPaymentDetailPage() {
  return renderPaymentAuditPage();
}

function openClosingDetailPage(row) {
  state.subPage = "closingDetail";
  state.detailId = row.id;
  state.closingDetailTab = "项目申请";
  state.closingAuditMode = false;
  state.filters[state.active] = {};
  render();
}

function openClosingAuditPage(row) {
  state.subPage = "closingDetail";
  state.detailId = row.id;
  state.closingDetailTab = "项目申请";
  state.closingAuditMode = true;
  state.filters[state.active] = {};
  render();
}

function projectDetailEntries(row) {
  return Object.entries(row)
    .filter(([key]) => !["progress", "projectId"].includes(key))
    .map(([key, value]) => ({ key, label: key === "id" ? "项目编号" : labelMap[key] || key, value }));
}

function renderProjectInfoGrid(row) {
  return `<div class="detail-grid">${projectDetailEntries(row).map(({ key, label, value }) => {
    if (key === "docs") return renderAttachmentItem(label, value);
    return `<div class="detail-item"><span>${label}</span><strong>${formatPlainValue(formatCell(key, value))}</strong></div>`;
  }).join("")}</div>`;
}

function renderPaymentInfoGrid(row) {
  const fields = formForActivePage(pageConfigs.payment, "付款申请");
  return `<div class="detail-grid">${fields.map((item) => {
    if (item.key === "docs") return renderAttachmentItem(item.label, row[item.key]);
    return `<div class="detail-item"><span>${item.label}</span><strong>${formatPlainValue(formatCell(item.key, row[item.key]))}</strong></div>`;
  }).join("")}</div>`;
}

function renderAttachmentItem(label, value) {
  const attachments = normalizeAttachments(value);
  return `<div class="detail-item attachment-item"><span>${label}</span><div class="attachment-list">${attachments.map((name) => `<div class="attachment-row"><strong>${name}</strong><button class="link-btn" data-preview="${name}" type="button">预览</button></div>`).join("")}</div></div>`;
}

function normalizeAttachments(value) {
  if (Array.isArray(value)) return value;
  return String(value || "").split(/[、,，/]/).map((item) => item.trim()).filter(Boolean).map((item) => item.includes(".") ? item : `${item}.pdf`);
}

function currentConfig() {
  return pageConfigs[state.active];
}

function activeTab() {
  const config = currentConfig();
  return state.tabs[state.active] || config.tabs[0];
}

function activeDataKey() {
  if (state.active === "project" && state.subPage === "projectTypes") return "项目类型设置";
  return activeTab();
}

function renderTabs(config, tab) {
  if (config.tabs.length <= 1) return "";
  return `<div class="module-tabs">${config.tabs.map((name) => `<button class="tab-btn ${name === tab ? "active" : ""}" data-tab="${name}" type="button">${name}</button>`).join("")}</div>`;
}

function filtersForActivePage(config, tab) {
  return config.tabFilters?.[tab] || config.filters;
}

function renderStatusGuide() {
  return "";
}

function renderFilters(filters, mode = "") {
  return `<div class="filter-bar ${mode === "compact" ? "filter-bar-compact" : ""}">${filters.map((name, index) => `<label>${name}：${renderFilterControl(name, index)}</label>`).join("")}<button class="primary-btn filter-action-btn" data-query type="button">查询</button><button class="ghost-btn filter-action-btn" data-reset type="button">重置</button></div>`;
}

function renderFilterControl(name, index) {
  const value = state.filters[state.active]?.[index] || "";
  if (/(时间|日期|月份)/.test(name)) {
    const [start, end] = String(value).split("至").map((item) => item.trim());
    return `<span class="filter-date-range"><input type="date" data-filter-start="${index}" value="${start || ""}" /><span>至</span><input type="date" data-filter-end="${index}" value="${end || ""}" /></span>`;
  }
  const options = filterOptionsFor(name);
  if (options.length) {
    return `<select data-filter="${index}"><option value="">请选择</option>${options.map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`).join("")}</select>`;
  }
  return `<input data-filter="${index}" placeholder="请输入" value="${value}" />`;
}

function filterOptionsFor(name) {
  if (name === "类型名称") return [];
  if (name.includes("项目类型")) return projectTypeNames();
  if (name.includes("采购类型")) return ["设备", "耗材", "图书", "服务"];
  if (name.includes("类型")) return ["审批流程", "审批角色"];
  if (name.includes("状态")) return statusOptionsForActivePage();
  return [];
}

function projectTypeNames() {
  const rows = state.data.project?.项目类型设置 || [];
  return rows.map((row) => row.name);
}

function statusOptionsForActivePage() {
  if (state.active === "project" && activeDataKey() === "项目管理") return projectStatusOptions();
  const rows = state.data[state.active]?.[activeDataKey()] || [];
  return [...new Set(rows.map((row) => row.status).filter(Boolean))];
}

function projectStatusOptions() {
  return [
    "待审批",
    "退回修改",
    "已驳回",
    "已通过",
    "待采购",
    "采购中",
    "采购完成",
    "待签合同",
    "履约中",
    "实施中",
    "延期",
    "待付款",
    "付款审核中",
    "已付款",
    "发票已登记",
    "待验收",
    "待整改",
    "已验收",
    "待归档",
    "已归档",
  ];
}

function filteredRows() {
  const rows = state.data[state.active]?.[activeDataKey()] || [];
  const keyword = Object.values(state.filters[state.active] || {}).filter(Boolean).join(" ");
  const result = keyword ? rows.filter((row) => JSON.stringify(row).includes(keyword)) : rows;
  if (activeDataKey() === "项目进度节点") return [...result].sort((a, b) => Number(a.sort || 0) - Number(b.sort || 0));
  return result;
}

function renderTable(rows, options = {}) {
  if (!rows.length) return `<div class="empty">暂无数据，请调整筛选条件或新增记录。</div>`;
  const columns = columnsFor(rows);
  const selectable = false;
  return `<div class="table-wrap"><table class="data-table">
    <thead><tr><th>序号</th>${selectable ? "<th><input type=\"checkbox\" /></th>" : ""}${columns.map((key) => `<th>${columnLabel(key)}</th>`).join("")}<th>操作</th></tr></thead>
    <tbody>${rows.map((row, index) => `<tr><td>${index + 1}</td>${selectable ? "<td><input type=\"checkbox\" /></td>" : ""}${columns.map((key) => `<td>${formatCell(key, row[key])}</td>`).join("")}<td class="op-cell">${rowActions(row).map((item) => `<button class="link-btn" data-action="${item}" data-id="${row.id}" type="button">${item}</button>`).join("")}</td></tr>`).join("")}</tbody>
  </table></div>`;
}

function columnLabel(key) {
  if (state.active === "project" && key === "id") return "项目编号";
  if (state.active === "closing" && key === "status") return "归档状态";
  if (activeDataKey() === "项目类型设置" && key === "name") return "类型名称";
  if (activeDataKey() === "项目进度节点" && key === "name") return "项目进度节点";
  return labelMap[key] || key;
}

function columnsFor(rows) {
  if (activeDataKey() === "项目类型设置") return ["name", "createdAt", "creator"];
  if (activeDataKey() === "项目进度节点") return ["sort", "name", "remark", "creator"];
  if (state.active === "purchase") return ["id", "name", "project", "type", "budget", "actualAmount", "method", "status"];
  if (state.active === "closing") return ["id", "project", "owner", "status"];
  const preferred = activeDataKey() === "项目审批"
    ? ["projectId", "project", "owner", "status"]
    : ["id", "projectId", "name", "code", "project", "type", "budget", "actualAmount", "amount", "supplier", "partner", "contract", "percent", "owner", "usedCount", "status", "check", "due", "date", "announceAt", "bidDeadline", "awardAt", "createdAt"];
  const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  return preferred.filter((key) => keys.includes(key)).slice(0, 8);
}

function formatCell(key, value) {
  if (value === undefined || value === null || value === "") return "--";
  if (Array.isArray(value)) return value.join("、");
  if (["budget", "actualAmount", "amount"].includes(key)) return money(value);
  if (key === "percent") return `${value}%`;
  if (["status", "check", "opinion", "due"].includes(key)) return `<span class="status ${statusClass(value)}">${value}</span>`;
  return value;
}

function statusClass(value) {
  const text = String(value);
  if (text.includes("待") || text.includes("退回") || text.includes("不可")) return "pending";
  if (text.includes("中") || text.includes("审核") || text.includes("采购")) return "active";
  if (text.includes("通过") || text.includes("完成") || text.includes("已") || text.includes("可归档") || text.includes("匹配")) return "done";
  if (text.includes("驳回") || text.includes("延期") || text.includes("整改") || text.includes("终止") || text.includes("未")) return "danger";
  return "gray";
}

function rowActions(row) {
  const tab = activeDataKey();
  if (tab === "项目审批") return row.status === "待审批" ? ["审批"] : ["详情"];
  if (tab === "项目类型设置" || tab === "项目进度节点") return ["编辑", "删除"];
  if (state.active === "contract") {
    if (row.status === "已终止") return ["查看详情"];
    const contractActions = ["详情", "编辑"];
    if (row.status === "待签订") contractActions.push("签订合同");
    if (row.status === "履约中") contractActions.push("履约完成", "终止合同");
    return contractActions;
  }
  if (state.active === "payment" && tab === "财务审核") {
    return canAuditPayment(row) ? ["详情", "审核"] : ["详情"];
  }
  if (state.active === "acceptance") {
    if (tab === "验收申请") return ["详情", "编辑"];
    if (row.status === "已验收") return ["详情"];
    if (row.status === "待整改") return ["详情", "提交整改"];
    return ["详情", "审核"];
  }
  const actions = ["详情", "编辑"];
  if (state.active === "project" && tab === "项目管理" && row.status !== "待审批") actions.push("提交审批");
  if (state.active === "purchase" && row.status === "待采购") actions.push("开始采购");
  if (state.active === "purchase" && row.status === "采购中") actions.push("完成采购");
  if (state.active === "progress") actions.push("更新进度");
  if (state.active === "closing") {
    if (tab === "归档审核") return row.status === "待审批" ? ["详情", "审核"] : ["详情"];
    if (row.status === "已驳回") return ["详情", "重新提交", "删除"];
    if (row.status === "待审批") return ["详情", "删除"];
    return ["详情"];
  }
  return [...new Set(actions)];
}

function canAuditPayment(row) {
  if (row.status !== "待审核") return false;
  const configs = state.data.system?.流程配置 || [];
  return configs.some((item) => item.status === "启用" && String(item.name || "").includes("付款审批"));
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
    state.subPage = null;
    state.filters[state.active] = {};
    render();
  }));
  els.moduleView.querySelector("[data-project-types]")?.addEventListener("click", () => {
    state.subPage = "projectTypes";
    state.filters[state.active] = {};
    render();
  });
  els.moduleView.querySelector("[data-back-project]")?.addEventListener("click", () => {
    state.subPage = null;
    state.detailId = null;
    state.filters[state.active] = {};
    render();
  });
  els.moduleView.querySelector("[data-add-project-progress]")?.addEventListener("click", openAddProjectProgressConfirm);
  els.moduleView.querySelectorAll("[data-archive-tab]").forEach((btn) => btn.addEventListener("click", () => {
    state.closingDetailTab = btn.dataset.archiveTab;
    render();
  }));
  els.moduleView.querySelectorAll("[data-flow-step]").forEach((btn) => btn.addEventListener("click", () => {
    state.flowStep = Number(btn.dataset.flowStep);
    render();
  }));
  els.moduleView.querySelector("[data-flow-prev]")?.addEventListener("click", () => {
    state.flowStep = Math.max(0, state.flowStep - 1);
    render();
  });
  els.moduleView.querySelector("[data-flow-next]")?.addEventListener("click", () => {
    const last = flowDesignerSteps().length - 1;
    if (state.flowStep < last) {
      state.flowStep += 1;
      render();
      return;
    }
    requestConfirm({
      title: "确认发布流程",
      message: "发布后该流程将作为项目立项审批流程在原型中生效。",
      onConfirm: () => showToast("流程已发布"),
    });
  });
  els.moduleView.querySelector("[data-flow-save]")?.addEventListener("click", () => showToast("流程配置草稿已保存"));
  els.moduleView.querySelector("[data-archive-reject]")?.addEventListener("click", () => {
    requestApprovalOpinion({
      title: "确认驳回归档",
      message: "确认后项目归档状态将变更为已驳回。",
      action: "驳回",
      onConfirm: (opinion) => {
        const id = state.detailId;
        Object.values(state.data.closing || {}).forEach((rows) => rows.find((item) => item.id === id) && Object.assign(rows.find((item) => item.id === id), { status: "已驳回", opinion }));
        state.subPage = null;
        state.closingAuditMode = false;
        render();
        showToast("归档已驳回");
      },
    });
  });
  els.moduleView.querySelector("[data-archive-agree]")?.addEventListener("click", () => {
    requestApprovalOpinion({
      title: "确认通过归档",
      message: "确认后项目归档状态将变更为已归档。",
      action: "同意",
      onConfirm: (opinion) => {
        const id = state.detailId;
        Object.values(state.data.closing || {}).forEach((rows) => rows.find((item) => item.id === id) && Object.assign(rows.find((item) => item.id === id), { status: "已归档", opinion }));
        state.subPage = null;
        state.closingAuditMode = false;
        render();
        showToast("归档审核已通过");
      },
    });
  });
  els.moduleView.querySelector("[data-add]")?.addEventListener("click", () => openModal());
  els.moduleView.querySelector("[data-flow-add]")?.addEventListener("click", () => openSystemFlowEditor());
  els.moduleView.querySelectorAll("[data-flow-edit]").forEach((btn) => btn.addEventListener("click", () => openSystemFlowEditor(btn.dataset.flowEdit)));
  els.moduleView.querySelectorAll("[data-flow-toggle]").forEach((btn) => btn.addEventListener("click", () => toggleSystemFlow(btn.dataset.flowToggle)));
  els.moduleView.querySelector("[data-export]")?.addEventListener("click", () => showToast("已生成模拟导出任务"));
  els.moduleView.querySelectorAll("[data-preview]").forEach((btn) => btn.addEventListener("click", () => showToast(`正在预览：${btn.dataset.preview}`)));
  els.moduleView.querySelectorAll("[data-approval-action]").forEach((btn) => btn.addEventListener("click", () => confirmApprovalAction(btn.dataset.approvalAction, btn.dataset.approvalStatus)));
  els.moduleView.querySelector("[data-query]")?.addEventListener("click", () => {
    const nextFilters = {};
    els.moduleView.querySelectorAll("[data-filter]").forEach((input) => { nextFilters[input.dataset.filter] = input.value; });
    els.moduleView.querySelectorAll("[data-filter-start]").forEach((input) => {
      const index = input.dataset.filterStart;
      const end = els.moduleView.querySelector(`[data-filter-end="${index}"]`)?.value || "";
      nextFilters[index] = input.value && end ? `${input.value} 至 ${end}` : input.value || end;
    });
    state.filters[state.active] = nextFilters;
    render();
  });
  els.moduleView.querySelector("[data-reset]")?.addEventListener("click", () => {
    state.filters[state.active] = {};
    render();
  });
  els.moduleView.querySelectorAll("[data-action]").forEach((btn) => btn.addEventListener("click", () => handleAction(btn.dataset.action, btn.dataset.id)));
}

function toggleSystemFlow(id) {
  const row = (state.data.system?.流程配置 || []).find((item) => item.id === id);
  if (!row) return;
  const nextStatus = row.status === "启用" ? "停用" : "启用";
  requestConfirm({
    title: `确认${nextStatus}流程`,
    message: `确认后流程状态将变更为“${nextStatus}”。`,
    onConfirm: () => {
      row.status = nextStatus;
      row.updatedAt = formatDateTime(new Date());
      render();
      showToast(`流程已${nextStatus}`);
    },
  });
}

function openSystemFlowEditor(id = null) {
  state.subPage = "flowEditor";
  state.detailId = id;
  state.flowStep = 0;
  render();
}

function handleAction(action, id) {
  const row = findRow(id);
  if (!row) return showToast("当前记录不存在");
  if (action === "查看详情") return openDrawer(row);
  if (action === "详情" && state.active === "project" && activeDataKey() === "项目管理") return openProjectDetailPage(row);
  if (action === "详情" && state.active === "purchase") return openPurchaseDetail(row);
  if (action === "详情" && state.active === "payment") return openPaymentDetailPage(row);
  if (action === "详情" && state.active === "acceptance") return openAcceptanceAuditPage(row, false);
  if (action === "详情" && state.active === "closing") return openClosingDetailPage(row);
  if (action === "详情") return openDrawer(row);
  if (action === "编辑") return openModal(row);
  if (action === "删除" && activeDataKey() === "项目类型设置") return deleteProjectType(row);
  if (action === "删除" && activeDataKey() === "项目进度节点") return deleteProgressNode(row);
  if (action === "审批") return openApprovalDetailPage(row);
  if (action === "开始采购") return openPurchaseStartConfirm(row);
  if (action === "完成采购") return openPurchaseCompleteConfirm(row);
  if (action === "签订合同") return openSignContractModal(row);
  if (action === "审核" && state.active === "payment") return openPaymentAuditPage(row);
  if (action === "审核" && state.active === "acceptance") return openAcceptanceAuditPage(row, true);
  if (action === "审核" && state.active === "closing") return openClosingAuditPage(row);
  if (action === "提交整改" && state.active === "acceptance") return openAcceptanceRectifyConfirm(row);
  if (action === "提交" && state.active === "closing") return openArchiveSubmitConfirm(row);
  if (action === "重新提交" && state.active === "closing") return openArchiveResubmitConfirm(row);
  if (action === "删除" && state.active === "closing") return deleteArchiveRow(row);
  const statusMap = {
    提交审批: "待审批",
    撤回申请: "退回修改",
    开始采购: "采购中",
    采购完成: "采购完成",
    履约完成: "已完成",
    终止合同: "已终止",
    合同终止: "已终止",
    更新进度: "正常",
    财务审核: "审核通过",
    发票核销: "已核销",
  };
  requestConfirm({
    title: `确认${action}`,
    message: "该操作会更新当前记录状态，并同步刷新列表数据。",
    summary: `业务页面：${currentConfig().title} / ${activeTab()}<br>当前记录：${row.name || row.project || row.id}<br>操作内容：${action}`,
    onConfirm: () => {
      row.status = statusMap[action] || row.status;
      if (action === "提交审批" && state.active === "project") {
        const approval = (state.data.project?.项目审批 || []).find((item) => item.projectId === row.id);
        if (approval) approval.status = "待审批";
      }
      if (action === "发票核销") row.checked = "已核销";
      showToast(`${action}已完成`);
      render();
    },
  });
}

function openPurchaseStartConfirm(row) {
  requestConfirm({
    title: "确认开始采购",
    message: "请填写招标公告发布时间和投标截止时间，确认后采购状态进入采购中，并同步更新项目进度。",
    extra: buildPurchaseStartForm(row),
    onConfirm: () => {
      const form = readConfirmExtraForm();
      if (!form.announceAt || !form.bidDeadline) {
        showToast("请填写招标公告发布时间和投标截止时间");
        return false;
      }
      row.startAt = row.startAt || formatDateTime(new Date());
      row.announceAt = form.announceAt;
      row.bidDeadline = form.bidDeadline;
      row.status = "采购中";
      syncPurchaseProgress(row, "start");
      render();
      showToast("开始采购已完成，项目进度已同步更新");
      return true;
    },
  });
}

function openPurchaseCompleteConfirm(row) {
  requestConfirm({
    title: "确认完成采购",
    message: "请填写中标单位确认时间、供应商名称和实际采购金额，确认后采购状态进入采购完成。",
    extra: buildPurchaseCompleteForm(row),
    onConfirm: () => {
      const form = readConfirmExtraForm();
      if (!form.awardAt || !form.supplier || !form.actualAmount) {
        showToast("请补全必填项");
        return false;
      }
      row.awardAt = form.awardAt;
      row.supplier = form.supplier;
      row.actualAmount = Number(form.actualAmount);
      row.finishAt = row.finishAt || formatDateTime(new Date());
      row.status = "采购完成";
      syncPurchaseProgress(row, "finish");
      render();
      showToast("采购完成已确认，项目进度已同步更新");
      return true;
    },
  });
}

function buildPurchaseStartForm(row) {
  return `<div class="confirm-form">
    <label><span class="required-star">*</span>招标公告发布时间<input name="announceAt" type="datetime-local" value="${toDatetimeLocal(row.announceAt)}" /></label>
    <label><span class="required-star">*</span>投标截止时间<input name="bidDeadline" type="datetime-local" value="${toDatetimeLocal(row.bidDeadline)}" /></label>
  </div>`;
}

function buildPurchaseCompleteForm(row) {
  return `<div class="confirm-form">
    <label><span class="required-star">*</span>中标单位确认时间<input name="awardAt" type="datetime-local" value="${toDatetimeLocal(row.awardAt)}" /></label>
    <label><span class="required-star">*</span>供应商名称<input name="supplier" type="text" placeholder="请输入供应商名称" value="${row.supplier || ""}" /></label>
    <label><span class="required-star">*</span>实际采购金额<input name="actualAmount" type="number" placeholder="请输入实际采购金额" value="${row.actualAmount || ""}" /></label>
  </div>`;
}

function readConfirmExtraForm() {
  return Object.fromEntries([...els.confirmExtra.querySelectorAll("input, select, textarea")].map((control) => [control.name, control.type === "datetime-local" ? fromDatetimeLocal(control.value) : control.value]));
}

function syncPurchaseProgress(row, phase = "start") {
  const rows = state.data.progress?.月度进度 || [];
  const progress = rows.find((item) => item.project === row.project);
  if (progress) {
    progress.content = phase === "finish"
      ? `采购已完成，供应商${row.supplier || "-"}，实际采购金额${money(row.actualAmount)}，中标确认${row.awardAt || "-"}。`
      : `采购已启动，招标公告${row.announceAt || "-"}，投标截止${row.bidDeadline || "-"}。`;
    progress.percent = Math.max(Number(progress.percent || 0), phase === "finish" ? 45 : 35);
    progress.status = "正常";
    progress.nextPlan = phase === "finish" ? "准备合同登记与履约推进。" : "跟进采购执行并确认中标单位。";
  }
  const project = (state.data.project?.项目管理 || []).find((item) => item.name === row.project);
  if (project) project.status = phase === "finish" ? "采购完成" : "采购中";
}

function openPurchaseDetail(row) {
  els.drawerKicker.textContent = "";
  els.drawerKicker.classList.add("hidden");
  els.drawerTitle.textContent = row.name || row.id;
  els.drawerBody.innerHTML = `
    <div class="detail-section">
      <div class="panel-title">采购基本信息</div>
      ${renderDetailGrid([
        ["id", row.id],
        ["name", row.name],
        ["project", row.project],
        ["type", row.type],
        ["budget", row.budget],
        ["actualAmount", row.actualAmount],
        ["method", row.method],
        ["date", row.date],
        ["status", row.status],
      ])}
    </div>
    <div class="detail-section">
      <div class="panel-title">开始采购记录</div>
      ${renderDetailGrid([
        ["announceAt", row.announceAt],
        ["bidDeadline", row.bidDeadline],
      ])}
    </div>
    <div class="detail-section">
      <div class="panel-title">完成采购记录</div>
      ${renderDetailGrid([
        ["awardAt", row.awardAt],
        ["supplier", row.supplier],
        ["actualAmount", row.actualAmount],
      ])}
    </div>
    <div class="detail-section">
      <div class="panel-title">采购附件</div>
      ${renderAttachmentItem(labelMap.docs, row.docs)}
    </div>
  `;
  els.drawer.classList.remove("hidden");
}

function renderDetailGrid(entries) {
  return `<div class="detail-grid">${entries.map(([key, value]) => `<div class="detail-item"><span>${labelMap[key] || key}</span><strong>${formatPlainValue(formatCell(key, value))}</strong></div>`).join("")}</div>`;
}

function openProjectDetailPage(row) {
  state.subPage = "projectDetail";
  state.detailId = row.id;
  state.filters[state.active] = {};
  render();
}

function openApprovalDetailPage(row) {
  state.subPage = "approvalDetail";
  state.detailId = row.id;
  state.filters[state.active] = {};
  render();
}

function openPaymentAuditPage(row) {
  state.subPage = "paymentAudit";
  state.detailId = row.id;
  state.filters[state.active] = {};
  render();
}

function openPaymentDetailPage(row) {
  state.subPage = "paymentDetail";
  state.detailId = row.id;
  state.filters[state.active] = {};
  render();
}

function openAcceptanceAuditPage(row, audit = true) {
  state.subPage = "acceptanceAudit";
  state.detailId = row.id;
  state.acceptanceAuditMode = audit;
  state.filters[state.active] = {};
  render();
}

function renderAcceptanceAuditPage() {
  const row = findAcceptanceById(state.detailId);
  if (!row) {
    state.subPage = null;
    state.detailId = null;
    showToast("当前验收记录不存在");
    return render();
  }
  const isAudit = state.acceptanceAuditMode !== false;
  els.pageTitle.textContent = isAudit ? "验收审核" : "验收详情";
  els.moduleView.innerHTML = `
    <div class="sub-page-head">
      <button class="ghost-btn" data-back-project type="button">返回</button>
    </div>
    <div class="detail-page approval-page">
      <h2>${row.project}</h2>
      <div class="approval-page-section">
        <div class="panel-title">验收基本信息</div>
        ${renderAcceptanceInfoGrid(row)}
      </div>
      ${isAudit ? `<div class="approval-page-section">
        <div class="panel-title">验收结果填写</div>
        ${renderAcceptanceAuditForm(row)}
      </div>` : ""}
      <div class="approval-page-section">
        <div class="panel-title">验收流程</div>
        ${renderAcceptanceFlow(row)}
      </div>
      ${isAudit ? `<div class="approval-actions approval-page-actions">
        <button class="primary-btn" data-acceptance-submit type="button">提交审核</button>
      </div>` : ""}
    </div>
  `;
  bindModuleEvents();
  bindAcceptanceAuditUploads(row);
}

function findAcceptanceById(id) {
  const rows = Object.values(state.data.acceptance || {}).flat();
  return rows.find((item) => item.id === id);
}

function renderAcceptanceInfoGrid(row) {
  const entries = [
    ["id", row.id],
    ["project", row.project],
    ["date", row.date],
    ["members", row.members],
    ["material", row.material],
    ["opinion", row.opinion],
    ["rectification", row.rectification],
    ["status", row.status],
  ];
  return `<div class="detail-grid">${entries.map(([key, value]) => `<div class="detail-item"><span>${labelMap[key] || key}</span><strong>${formatPlainValue(formatCell(key, value))}</strong></div>`).join("")}${renderAttachmentItem(labelMap.docs, row.docs)}</div>`;
}

function renderAcceptanceAuditForm(row) {
  return `<div class="acceptance-audit-form">
    <label><span class="required-star">*</span>验收结果
      <select data-acceptance-result>
        ${["通过", "整改", "不通过"].map((item) => `<option value="${item}" ${row.resultOpinion === item || row.opinion === item ? "selected" : ""}>${item}</option>`).join("")}
      </select>
    </label>
    <label>整改期限
      <input type="date" data-acceptance-rectification value="${row.rectification || ""}" />
    </label>
    <div class="field wide">
      <label>验收结果附件</label>
      <input class="upload-input" type="file" data-acceptance-file="resultDocs" multiple accept="${uploadRules.extensions.join(",")}" />
      <div class="upload-box ${row.resultDocs ? "has-file" : ""}" data-acceptance-upload="resultDocs" data-label="验收结果附件">${renderUploadBoxContent(row.resultDocs, "验收结果附件")}</div>
      <div class="upload-tip">支持同时上传多个文件，最多5个；单个文件最大15M；支持 PRD/PDF、Word、Excel、JPG/JPJ、PNG 格式。</div>
    </div>
  </div>`;
}

function bindAcceptanceAuditUploads(row) {
  els.moduleView.querySelectorAll("[data-acceptance-upload]").forEach((box) => {
    const key = box.dataset.acceptanceUpload;
    const fileInput = els.moduleView.querySelector(`[data-acceptance-file="${key}"]`);
    box.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-remove-file]");
      if (removeButton) {
        event.stopPropagation();
        row[key] = normalizeAttachments(row[key]).filter((name) => name !== removeButton.dataset.removeFile).join("、");
        box.innerHTML = renderUploadBoxContent(row[key], box.dataset.label);
        box.classList.toggle("has-file", Boolean(row[key]));
        return;
      }
      fileInput?.click();
    });
    fileInput?.addEventListener("change", () => {
      const files = [...fileInput.files];
      const error = validateUploadFiles(files);
      if (error) {
        fileInput.value = "";
        showToast(error);
        return;
      }
      row[key] = files.map((file) => file.name).join("、");
      box.innerHTML = renderUploadBoxContent(row[key], box.dataset.label);
      box.classList.add("has-file");
      showToast(`已选择 ${files.length} 个文件`);
    });
  });
  els.moduleView.querySelector("[data-acceptance-submit]")?.addEventListener("click", () => submitAcceptanceAudit(row, false));
}

function submitAcceptanceAudit(row, forceRectify) {
  const result = els.moduleView.querySelector("[data-acceptance-result]")?.value || "通过";
  const rectification = els.moduleView.querySelector("[data-acceptance-rectification]")?.value || "";
  requestApprovalOpinion({
    title: "确认提交验收审核",
    message: "提交后将保存验收结果和验收结果附件，并同步更新验收状态。",
    action: "提交验收审核",
    onConfirm: (opinion) => {
      row.resultOpinion = result;
      row.opinion = opinion;
      row.rectification = rectification || row.rectification;
      row.status = result === "通过" ? "已验收" : "待整改";
      syncAcceptanceRows(row);
      syncArchiveFromAcceptance(row);
      render();
      showToast("验收审核已提交");
    },
  });
}

function openAcceptanceRectifyConfirm(row) {
  requestConfirm({
    title: "提交整改",
    message: "请填写整改说明并上传整改附件，提交后验收状态将回到待验收。",
    extra: buildAcceptanceRectifyForm(row),
    onConfirm: () => {
      const form = readConfirmExtraForm();
      if (!String(form.rectificationText || "").trim()) {
        showToast("请填写整改说明");
        return false;
      }
      if (String(form.rectificationText || "").length > 200) {
        showToast("整改说明最多200字");
        return false;
      }
      if (!String(form.rectificationDocs || "").trim()) {
        showToast("请上传整改附件");
        return false;
      }
      row.rectificationText = form.rectificationText;
      row.rectificationDocs = form.rectificationDocs;
      row.status = "待验收";
      row.opinion = "整改已提交";
      syncAcceptanceRows(row);
      render();
      showToast("整改已提交，状态已回到待验收");
      return true;
    },
  });
  bindConfirmUploadBoxes();
}

function openArchiveSubmitConfirm(row) {
  requestConfirm({
    title: "提交项目归档",
    message: "请填写归档说明并上传归档附件，提交后归档状态将变更为待审批。",
    extra: buildArchiveSubmitForm(row),
    onConfirm: () => {
      const form = readConfirmExtraForm();
      if (!String(form.archiveText || "").trim()) {
        showToast("请填写归档说明");
        return false;
      }
      if (!String(form.archiveDocs || "").trim()) {
        showToast("请上传归档附件");
        return false;
      }
      row.archiveText = form.archiveText;
      row.archiveDocs = form.archiveDocs;
      row.submitter = "admin";
      row.submittedAt = formatDateTime(new Date());
      row.status = "待审批";
      render();
      showToast("项目归档已提交，状态已变更为待审批");
      return true;
    },
  });
  bindConfirmUploadBoxes();
}

function openArchiveResubmitConfirm(row) {
  requestConfirm({
    title: "重新提交项目归档",
    message: "请核对并修改上次提交的归档内容，重新提交后状态将变更为待审批。",
    extra: buildArchiveResubmitForm(row),
    onConfirm: () => {
      const form = readConfirmExtraForm();
      if (!["summary", "result", "remark", "archiveText", "archiveDocs"].every((key) => String(form[key] || "").trim())) {
        showToast("请补全项目总结、成果附件、归档说明和归档附件");
        return false;
      }
      Object.assign(row, {
        summary: form.summary.trim(),
        result: form.result.trim(),
        remark: form.remark.trim(),
        archiveText: form.archiveText.trim(),
        archiveDocs: form.archiveDocs.trim(),
        status: "待审批",
        opinion: "",
        submittedAt: formatDateTime(new Date()),
        submitter: "admin",
      });
      syncClosingRows(row);
      render();
      showToast("归档资料已重新提交，状态已变更为待审批");
      return true;
    },
  });
  bindConfirmUploadBoxes();
}

function buildArchiveSubmitForm(row) {
  return `<div class="confirm-form">
    <label><span class="required-star">*</span>归档说明<textarea name="archiveText" placeholder="请输入归档说明">${row.archiveText || ""}</textarea></label>
    <label><span class="required-star">*</span>归档附件
      <input type="hidden" name="archiveDocs" value="${formatPlainValue(row.archiveDocs || "")}" />
      <input class="upload-input" type="file" data-confirm-file="archiveDocs" multiple accept="${uploadRules.extensions.join(",")}" />
      <div class="upload-box ${row.archiveDocs ? "has-file" : ""}" data-confirm-upload="archiveDocs" data-label="归档附件">${renderUploadBoxContent(row.archiveDocs, "归档附件")}</div>
    </label>
  </div>`;
}

function buildArchiveResubmitForm(row) {
  return `<div class="confirm-form archive-resubmit-form">
    <div class="confirm-summary">上次驳回意见：${escapeHtml(row.opinion || "未记录审批意见")}</div>
    <label><span class="required-star">*</span>项目总结<textarea name="summary" maxlength="500" placeholder="请输入项目总结">${escapeHtml(row.summary || "")}</textarea></label>
    <label><span class="required-star">*</span>成果附件
      <input type="hidden" name="result" value="${escapeHtml(row.result || "")}" />
      <input class="upload-input" type="file" data-confirm-file="result" multiple accept="${uploadRules.extensions.join(",")}" />
      <div class="upload-box ${row.result ? "has-file" : ""}" data-confirm-upload="result" data-label="成果附件">${renderUploadBoxContent(row.result, "成果附件")}</div>
    </label>
    <label><span class="required-star">*</span>归档说明<textarea name="remark" maxlength="500" placeholder="请输入归档说明">${escapeHtml(row.remark || "")}</textarea></label>
    <label><span class="required-star">*</span>提交说明<textarea name="archiveText" maxlength="500" placeholder="请输入提交说明">${escapeHtml(row.archiveText || row.remark || "")}</textarea></label>
    <label><span class="required-star">*</span>归档附件
      <input type="hidden" name="archiveDocs" value="${escapeHtml(row.archiveDocs || "")}" />
      <input class="upload-input" type="file" data-confirm-file="archiveDocs" multiple accept="${uploadRules.extensions.join(",")}" />
      <div class="upload-box ${row.archiveDocs ? "has-file" : ""}" data-confirm-upload="archiveDocs" data-label="归档附件">${renderUploadBoxContent(row.archiveDocs, "归档附件")}</div>
    </label>
  </div>`;
}

function renderClosingDetailPage() {
  const row = (state.data.closing?.项目归档 || []).find((item) => item.id === state.detailId);
  if (!row) {
    state.subPage = null;
    state.detailId = null;
    showToast("当前归档记录不存在");
    return render();
  }
  const project = findProjectByName(row.project) || {};
  const active = state.closingDetailTab || "项目申请";
  const isAudit = state.closingAuditMode === true;
  els.pageTitle.textContent = isAudit ? "归档审核" : "项目归档详情";
  els.moduleView.innerHTML = `
    <div class="sub-page-head">
      <button class="ghost-btn" data-back-project type="button">返回</button>
    </div>
    <div class="detail-page archive-detail-page">
      <h2>${row.project}</h2>
      <div class="approval-page-section">
        <div class="panel-title">项目基本信息</div>
        ${renderProjectInfoGrid(project)}
      </div>
      <div class="archive-detail-tabs">${archiveDetailTabs().map((tab) => `<button class="tab-btn ${tab === active ? "active" : ""}" data-archive-tab="${tab}" type="button">${tab}</button>`).join("")}</div>
      <div class="archive-detail-content">${renderArchiveDetailContent(row, active)}</div>
      <div class="approval-page-section">
        <div class="panel-title">归档审批流程</div>
        ${renderArchiveApprovalFlow(row)}
      </div>
      ${isAudit ? `<div class="approval-actions approval-page-actions"><button class="outline-danger-btn" data-archive-reject type="button">驳回</button><button class="primary-btn" data-archive-agree type="button">同意</button></div>` : ""}
    </div>
  `;
  bindModuleEvents();
}

function archiveDetailTabs() {
  return ["项目申请", "采购", "合同", "付款", "发票", "验收", "归档提交"];
}

function renderArchiveDetailContent(row, tab) {
  const projectName = row.project;
  const maps = {
    项目申请: findProjectByName(projectName),
    采购: (state.data.purchase?.新增采购 || []).find((item) => item.project === projectName),
    合同: (state.data.contract?.合同登记 || []).find((item) => item.project === projectName),
    付款: (state.data.payment?.付款申请 || []).find((item) => item.project === projectName),
    发票: (state.data.invoice?.发票登记 || []).find((item) => item.project === projectName),
    验收: findAcceptanceByProject(projectName),
    归档提交: row,
  };
  const data = maps[tab];
  if (!data) return `<div class="empty archive-empty">暂无${tab}信息</div>`;
  if (tab === "项目申请") return renderProjectInfoGrid(data);
  if (tab === "验收") return renderAcceptanceInfoGrid(data);
  if (tab === "归档提交") return renderArchiveSubmitInfo(row);
  return renderObjectDetailGrid(data);
}

function renderObjectDetailGrid(row) {
  return `<div class="detail-grid">${Object.entries(row).filter(([key]) => !["projectId"].includes(key)).map(([key, value]) => {
    if (["docs", "archiveDocs", "resultDocs", "rectificationDocs"].includes(key)) return renderAttachmentItem(labelMap[key] || key, value);
    return `<div class="detail-item"><span>${labelMap[key] || key}</span><strong>${formatPlainValue(formatCell(key, value))}</strong></div>`;
  }).join("")}</div>`;
}

function renderArchiveSubmitInfo(row) {
  return `<div class="detail-grid">
    <div class="detail-item"><span>归档状态</span><strong>${formatPlainValue(formatCell("status", row.status))}</strong></div>
    <div class="detail-item"><span>提交人员</span><strong>${row.submitter || "-"}</strong></div>
    <div class="detail-item"><span>提交时间</span><strong>${row.submittedAt || "-"}</strong></div>
    <div class="detail-item"><span>归档说明</span><strong>${row.archiveText || "-"}</strong></div>
    ${renderAttachmentItem("归档附件", row.archiveDocs)}
  </div>`;
}

function renderArchiveApprovalFlow(row) {
  const steps = [
    ["归档提交", row.submittedAt ? `${row.submitter || "admin"}已提交归档资料。` : "尚未提交归档资料。", row.submittedAt || "--", row.archiveDocs],
    ["归档审批", row.status === "待审批" ? "管理员审核归档资料完整性。" : "提交后进入该节点。", row.status === "待审批" ? "处理中" : "待流转", ""],
    ["归档完成", row.status === "已归档" ? "项目资料已完成归档。" : "审批通过后完成归档。", row.status === "已归档" ? "已完成" : "待完成", ""],
  ];
  return `<div class="approval-flow archive-flow">${steps.map((step, index) => `<div class="approval-flow-item ${index === 0 && row.submittedAt ? "done" : index === 1 && row.status === "待审批" ? "current" : ""}">
    <div class="approval-avatar">${index + 1}</div>
    <div class="approval-flow-main">
      <div class="approval-flow-title"><strong>${step[0]}</strong><span>${step[2]}</span></div>
      <p>${step[1]}</p>
      ${step[3] ? `<div class="flow-attachment-list">${normalizeAttachments(step[3]).map((name) => `<span>${escapeHtml(name)}</span>`).join("")}</div>` : ""}
    </div>
  </div>`).join("")}</div>`;
}

function buildAcceptanceRectifyForm(row) {
  return `<div class="confirm-form">
    <label><span class="required-star">*</span>整改说明<textarea name="rectificationText" maxlength="200" placeholder="请输入整改说明，最多200字">${row.rectificationText || ""}</textarea></label>
    <label><span class="required-star">*</span>整改附件
      <input type="hidden" name="rectificationDocs" value="${formatPlainValue(row.rectificationDocs || "")}" />
      <input class="upload-input" type="file" data-confirm-file="rectificationDocs" multiple accept="${uploadRules.extensions.join(",")}" />
      <div class="upload-box ${row.rectificationDocs ? "has-file" : ""}" data-confirm-upload="rectificationDocs" data-label="整改附件">${renderUploadBoxContent(row.rectificationDocs, "整改附件")}</div>
    </label>
  </div>`;
}

function bindConfirmUploadBoxes() {
  els.confirmExtra.querySelectorAll("[data-confirm-upload]").forEach((box) => {
    const key = box.dataset.confirmUpload;
    const fileInput = els.confirmExtra.querySelector(`[data-confirm-file="${key}"]`);
    const hiddenInput = els.confirmExtra.querySelector(`[name="${key}"]`);
    box.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-remove-file]");
      if (removeButton) {
        event.stopPropagation();
        const files = normalizeAttachments(hiddenInput.value).filter((name) => name !== removeButton.dataset.removeFile);
        hiddenInput.value = files.join("、");
        box.innerHTML = renderUploadBoxContent(hiddenInput.value, box.dataset.label);
        box.classList.toggle("has-file", files.length > 0);
        return;
      }
      if (key === "archiveDocs") {
        const defaultFile = "项目归档资料.zip";
        hiddenInput.value = hiddenInput.value || defaultFile;
        box.innerHTML = renderUploadBoxContent(hiddenInput.value, box.dataset.label);
        box.classList.add("has-file");
        showToast("归档附件已默认上传");
        return;
      }
      fileInput?.click();
    });
    fileInput?.addEventListener("change", () => {
      const files = [...fileInput.files];
      const error = validateUploadFiles(files);
      if (error) {
        fileInput.value = "";
        showToast(error);
        return;
      }
      hiddenInput.value = files.map((file) => file.name).join("、");
      box.innerHTML = renderUploadBoxContent(hiddenInput.value, box.dataset.label);
      box.classList.add("has-file");
      showToast(`已选择 ${files.length} 个文件`);
    });
  });
}

function syncAcceptanceRows(source) {
  Object.values(state.data.acceptance || {}).forEach((rows) => {
    const target = rows.find((item) => item.id === source.id);
    if (target && target !== source) Object.assign(target, source);
  });
}

function syncClosingRows(source) {
  Object.values(state.data.closing || {}).forEach((rows) => {
    const target = rows.find((item) => item.id === source.id);
    if (target && target !== source) Object.assign(target, source);
  });
}

function syncArchiveFromAcceptance(row) {
  return row;
}

function findProjectByName(name) {
  return (state.data.project?.项目管理 || []).find((item) => item.name === name);
}

function findAcceptanceByProject(project) {
  return Object.values(state.data.acceptance || {}).flat().find((item) => item.project === project);
}

function renderAcceptanceFlow(row) {
  const steps = [
    ["提交验收申请", `申请材料：${row.material || "-"}`, row.docs],
    ["验收组审核", `验收结果：${row.resultOpinion || row.opinion || "待填写"}`, row.resultDocs],
    ["整改/复验", row.status === "待整改" ? `整改期限：${row.rectification || "-"}` : "无整改或整改已完成", row.rectificationDocs],
    ["验收记录归档", `当前状态：${row.status}`, ""],
  ];
  return `<div class="approval-flow acceptance-flow">${steps.map((step, index) => `<div class="approval-flow-item ${index === 0 ? "done" : index === 1 ? "current" : ""}">
    <div class="approval-avatar">${index + 1}</div>
    <div class="approval-flow-main">
      <div class="approval-flow-title"><strong>${step[0]}</strong><span>${index === 0 ? row.date : index === 3 ? "待归档" : "处理中"}</span></div>
      <p>${step[1]}</p>
      ${step[2] ? `<div class="flow-attachment-list">${normalizeAttachments(step[2]).map((name) => `<span>${escapeHtml(name)}</span>`).join("")}</div>` : ""}
    </div>
  </div>`).join("")}</div>`;
}

function confirmApprovalAction(action, status) {
  const isPaymentAudit = state.active === "payment" && state.subPage === "paymentAudit";
  const row = isPaymentAudit
    ? (state.data.payment?.[activeDataKey()] || []).find((item) => item.id === state.detailId)
    : (state.data.project?.项目审批 || []).find((item) => item.id === state.detailId);
  if (!row) return showToast(isPaymentAudit ? "当前付款记录不存在" : "当前审批记录不存在");
  requestApprovalOpinion({
    title: `确认${action}`,
    message: isPaymentAudit ? "请确认财务审核意见，确认后将更新付款申请状态。" : "请确认审批意见，确认后将更新审批记录状态。",
    action,
    onConfirm: (opinion) => {
      row.status = status;
      row.opinion = opinion;
      if (isPaymentAudit) {
        Object.values(state.data.payment || {}).forEach((rows) => {
          const samePayment = rows.find((item) => item.id === row.id);
          if (samePayment) Object.assign(samePayment, { status, opinion });
        });
      }
      state.subPage = null;
      state.detailId = null;
      render();
      showToast(isPaymentAudit ? `财务审核已${action}` : `审批已${action}`);
    },
  });
}

function openAddProjectProgressConfirm() {
  const project = (state.data.project?.项目管理 || []).find((item) => item.id === state.detailId);
  if (!project) return showToast("当前项目不存在");
  requestConfirm({
    title: "添加项目进度",
    message: "请选择进度节点并填写完成时间、操作人，确认后将更新项目详情进度表。",
    extra: buildProjectProgressForm(project),
    onConfirm: () => {
      const form = readConfirmExtraForm();
      if (!form.nodeName || !form.completedAt || !form.operator) {
        showToast("请补全进度节点、完成时间和操作人");
        return false;
      }
      const records = state.data.projectProgress[project.id] || [];
      const existing = records.find((item) => item.name === form.nodeName);
      if (existing) {
        existing.completedAt = form.completedAt;
        existing.operator = form.operator;
      } else {
        records.push({ name: form.nodeName, completedAt: form.completedAt, operator: form.operator });
      }
      state.data.projectProgress[project.id] = records;
      render();
      showToast("项目进度已更新");
      return true;
    },
  });
}

function buildProjectProgressForm(project) {
  return `<div class="confirm-form">
    <label><span class="required-star">*</span>进度节点<select name="nodeName"><option value="">请选择进度节点</option>${progressNodes().map((node) => `<option value="${node.name}">${node.sort}. ${node.name}</option>`).join("")}</select></label>
    <label><span class="required-star">*</span>完成时间<input name="completedAt" type="date" /></label>
    <label><span class="required-star">*</span>操作人<input name="operator" type="text" placeholder="请输入操作人" value="${project.owner || ""}" /></label>
  </div>`;
}

function projectProgressRows(row) {
  const records = state.data.projectProgress?.[row.id] || defaultProjectProgress(row);
  const byName = Object.fromEntries(records.map((item) => [item.name, item]));
  return progressNodes().map((node) => ({
    name: node.name,
    completedAt: byName[node.name]?.completedAt || "",
    operator: byName[node.name]?.operator || "",
  }));
}

function defaultProjectProgress(row) {
  const progressMap = {
    待审批: ["2026-07-09", "", "", "", "", "", "", "", ""],
    退回修改: ["2026-07-09", "", "", "", "", "", "", "", ""],
    已通过: ["2026-07-09", "2026-07-10", "", "", "", "", "", "", ""],
    待采购: ["2026-07-09", "2026-07-10", "", "", "", "", "", "", ""],
    采购中: ["2026-07-09", "2026-07-10", "", "", "", "", "", "", ""],
    采购完成: ["2026-07-09", "2026-07-10", "2026-07-15", "", "", "", "", "", ""],
    履约中: ["2026-07-09", "2026-07-10", "2026-07-15", "2026-07-20", "", "", "", "", ""],
    实施中: ["2026-07-09", "2026-07-10", "2026-07-15", "2026-07-20", "", "", "", "", ""],
    验收中: ["2026-07-09", "2026-07-10", "2026-07-15", "2026-07-20", "2026-08-12", "2026-08-20", "2026-08-22", "", ""],
    已归档: ["2026-07-09", "2026-07-10", "2026-07-15", "2026-07-20", "2026-08-12", "2026-08-20", "2026-08-22", "2026-09-03", "2026-09-10"],
  };
  const times = progressMap[row.status] || [];
  return progressNodeRows().map((node, index) => ({
    name: node.name,
    completedAt: times[index] || "",
    operator: times[index] ? row.owner : "",
  }));
}

function progressNodes() {
  return [...(state.data.system?.项目进度节点 || progressNodeRows())].sort((a, b) => Number(a.sort || 0) - Number(b.sort || 0));
}

function findRow(id) {
  return (state.data[state.active]?.[activeDataKey()] || []).find((row) => row.id === id);
}

function openModal(row = null) {
  const config = currentConfig();
  const tab = activeDataKey();
  state.modal = { row, module: state.active, tab };
  els.modalTitle.textContent = row ? `编辑${modalEntityName(config, tab)}` : actionLabel(tab, config.addLabel);
  els.modalForm.innerHTML = buildForm(formForActivePage(config, tab), row);
  bindUploadBoxes();
  els.modalMask.classList.remove("hidden");
}

function openSignContractModal(row) {
  state.modal = { row, module: "contract", tab: activeDataKey(), action: "signContract" };
  els.modalTitle.textContent = "签订合同";
  els.modalForm.innerHTML = buildForm([field("signDate", "签订日期", "date", true)], null);
  els.modalMask.classList.remove("hidden");
}

function modalEntityName(config, tab) {
  if (tab === "项目类型设置") return "项目类型";
  if (tab === "项目进度节点") return "项目进度节点";
  return config.title;
}

function formForActivePage(config, tab) {
  return config.tabForms?.[tab] || config.form;
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
    if (item.type === "daterange") {
      const [start, end] = parseDateRange(value);
      return `<div class="field">${label}<div class="date-range"><input type="date" name="${item.key}Start" data-range="${item.key}" data-required="${item.required}" value="${start}" /><span>至</span><input type="date" name="${item.key}End" data-range="${item.key}" data-required="${item.required}" value="${end}" /></div><input type="hidden" name="${item.key}" value="${value}" /><div class="field-error">请选择${item.label}</div></div>`;
    }
    if (item.type === "upload") {
      return `<div class="field wide">${label}
        <input type="hidden" name="${item.key}" data-required="${item.required}" value="${formatPlainValue(value)}" />
        <input class="upload-input" type="file" data-file-input="${item.key}" multiple accept="${uploadRules.extensions.join(",")}" />
        <div class="upload-box ${value ? "has-file" : ""}" data-upload="${item.key}" data-label="${item.label}">
          ${renderUploadBoxContent(value, item.label)}
        </div>
        <div class="upload-tip">支持同时上传多个文件，最多5个；单个文件最大15M；支持 PRD/PDF、Word、Excel、JPG/JPJ、PNG 格式。</div>
        <div class="field-error">请上传${item.label}</div>
      </div>`;
    }
    return `<div class="field">${label}<input type="${item.type}" name="${item.key}" data-required="${item.required}" value="${value}" placeholder="请输入${item.label}" /><div class="field-error">请填写${item.label}</div></div>`;
  }).join("");
}

function optionsFor(item) {
  if (item.options.length) return item.options;
  if (item.key === "project") return projects;
  if (item.key === "type") return projectTypeNames();
  if (item.key === "supplier" || item.key === "partner") return suppliers;
  if (item.key === "purchase") return ["CG20260001", "CG20260002", "CG20260003"];
  if (item.key === "contract") return ["HT20260001", "HT20260002", "HT20260003"];
  if (item.key === "payment") return ["FK20260001", "FK20260002", "FK20260003"];
  return ["启用", "停用"];
}

function renderUploadBoxContent(value, label) {
  const files = normalizeAttachments(value);
  if (!files.length) {
    return `<div class="upload-empty"><span class="upload-icon">⇧</span><strong>点击上传${label}</strong></div>`;
  }
  return `<div class="upload-file-list">${files.map((name) => `<span class="upload-file-item"><span>${escapeHtml(name)}</span><button type="button" class="link-btn upload-remove-btn" data-remove-file="${escapeHtml(name)}">删除</button></span>`).join("")}</div><div class="upload-add-hint">点击此处继续上传</div>`;
}

function bindUploadBoxes() {
  els.modalForm.querySelectorAll("[data-upload]").forEach((box) => {
    const fileInput = els.modalForm.querySelector(`[data-file-input="${box.dataset.upload}"]`);
    const hiddenInput = els.modalForm.querySelector(`[name="${box.dataset.upload}"]`);
    box.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-remove-file]");
      if (removeButton) {
        event.stopPropagation();
        const files = normalizeAttachments(hiddenInput.value).filter((name) => name !== removeButton.dataset.removeFile);
        hiddenInput.value = files.join("、");
        box.innerHTML = renderUploadBoxContent(hiddenInput.value, box.dataset.label);
        box.classList.toggle("has-file", files.length > 0);
        return;
      }
      fileInput?.click();
    });
    fileInput?.addEventListener("change", () => {
      const files = [...fileInput.files];
      const error = validateUploadFiles(files);
      if (error) {
        fileInput.value = "";
        showToast(error);
        return;
      }
      const names = files.map((file) => file.name);
      hiddenInput.value = names.join("、");
      box.innerHTML = renderUploadBoxContent(names, box.dataset.label);
      box.classList.toggle("has-file", names.length > 0);
      box.closest(".field").classList.remove("invalid");
      showToast(`已选择 ${names.length} 个文件`);
    });
  });
}

function validateUploadFiles(files) {
  if (!files.length) return "";
  if (files.length > uploadRules.maxFiles) return "最多上传5个文件";
  const invalidType = files.find((file) => !uploadRules.extensions.includes(fileExtension(file.name)));
  if (invalidType) return "仅支持 PRD/PDF、Word、Excel、JPG/JPJ、PNG 格式";
  const oversize = files.find((file) => file.size > uploadRules.maxSize);
  if (oversize) return "单个文件最大15M";
  return "";
}

function fileExtension(name) {
  const index = String(name).lastIndexOf(".");
  return index >= 0 ? String(name).slice(index).toLowerCase() : "";
}

function saveModal() {
  if (!state.modal || !validateForm()) return;
  const form = Object.fromEntries(new FormData(els.modalForm).entries());
  normalizeDateRanges(form);
  if (state.modal.action === "signContract") {
    state.modal.row.signDate = form.signDate;
    state.modal.row.status = "履约中";
    els.modalMask.classList.add("hidden");
    state.modal = null;
    render();
    showToast("合同已签订");
    return;
  }
  const rows = state.data[state.modal.module][state.modal.tab];
  if (state.modal.row) {
    Object.assign(state.modal.row, form);
    if (state.modal.tab === "项目进度节点") state.modal.row.sort = Number(form.sort || 0);
  } else {
    const nextRow = state.modal.tab === "项目类型设置"
      ? { id: nextId(state.modal.module, state.modal.tab), ...form, usedCount: 0, createdAt: formatDateTime(new Date()), creator: "admin" }
      : state.modal.tab === "项目进度节点"
        ? { id: nextId(state.modal.module, state.modal.tab), ...form, sort: Number(form.sort || 0), creator: "admin" }
      : { id: nextId(state.modal.module, state.modal.tab), ...form, status: state.modal.module === "closing" ? "待审批" : (form.status || defaultStatus(state.modal.module, state.modal.tab)), submittedAt: state.modal.module === "closing" ? formatDateTime(new Date()) : undefined, submitter: state.modal.module === "closing" ? "admin" : undefined };
    rows.unshift(nextRow);
  }
  els.modalMask.classList.add("hidden");
  state.modal = null;
  render();
  showToast("已保存，模拟数据已更新");
}

function nextId(module, tab = "") {
  const prefix = tab === "项目类型设置" ? "LX" : tab === "项目进度节点" ? "JD" : { project: "XM", purchase: "CG", contract: "HT", progress: "JD", payment: "FK", invoice: "FP", acceptance: "YS", closing: "GD", system: "PZ" }[module] || "JL";
  return `${prefix}${new Date().getFullYear()}${String(Date.now()).slice(-4)}`;
}

function defaultStatus(module, tab = "") {
  if (tab === "项目类型设置") return "启用";
  return { project: "待审批", purchase: "待采购", contract: "待签订", progress: "正常", payment: "待审核", invoice: "已登记", acceptance: "待验收", closing: "待审批", system: "启用" }[module] || "待处理";
}

function deleteArchiveRow(row) {
  requestConfirm({
    title: "确认删除归档记录",
    message: "删除后该归档记录将从列表中移除。",
    onConfirm: () => {
      Object.keys(state.data.closing || {}).forEach((key) => {
        state.data.closing[key] = state.data.closing[key].filter((item) => item.id !== row.id);
      });
      render();
      showToast("归档记录已删除");
    },
  });
}

function deleteProjectType(row) {
  if (activeDataKey() !== "项目类型设置") return;
  const usedCount = Number(row.usedCount || 0);
  if (usedCount > 0) {
    showToast("已使用项目类型不支持删除操作");
    return;
  }
  requestConfirm({
    title: "确认删除项目类型",
    message: "删除后该项目类型将不再出现在项目类型设置列表中。",
    summary: "",
    showKicker: false,
    onConfirm: () => {
      const rows = state.data.project.项目类型设置;
      state.data.project.项目类型设置 = rows.filter((item) => item.id !== row.id);
      render();
      showToast("项目类型已删除");
    },
  });
}

function deleteProgressNode(row) {
  requestConfirm({
    title: "确认删除进度节点",
    message: "删除后项目详情进度表将不再展示该节点。",
    onConfirm: () => {
      state.data.system.项目进度节点 = state.data.system.项目进度节点.filter((item) => item.id !== row.id);
      render();
      showToast("项目进度节点已删除");
    },
  });
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

function normalizeDateRanges(form) {
  els.modalForm.querySelectorAll("[data-range]").forEach((control) => {
    const key = control.dataset.range;
    const start = form[`${key}Start`] || "";
    const end = form[`${key}End`] || "";
    form[key] = start && end ? `${start} 至 ${end}` : "";
    delete form[`${key}Start`];
    delete form[`${key}End`];
  });
}

function parseDateRange(value) {
  const parts = String(value || "").split("至").map((item) => item.trim());
  return [parts[0] || "", parts[1] || ""];
}

function openDrawer(row) {
  els.drawerKicker.textContent = "";
  els.drawerKicker.classList.add("hidden");
  els.drawerTitle.textContent = row.name || row.project || row.id;
  els.drawerBody.innerHTML = `
    <div class="detail-grid">${Object.entries(row).map(([key, value]) => `<div class="detail-item"><span>${labelMap[key] || key}</span><strong>${formatPlainValue(formatCell(key, value))}</strong></div>`).join("")}</div>
    ${["contract", "payment"].includes(state.active) ? "" : `<div class="timeline">
      <div class="panel-title">V1项目时间轴</div>
      ${["项目申请", "审批", "采购", "合同", "实施", "付款", "发票", "验收", "归档"].map((name, index) => `<div class="timeline-item"><div class="timeline-date">${index + 1}</div><div>${name}${index < 3 ? "已完成" : "待推进"}</div></div>`).join("")}
    </div>`}
  `;
  els.drawer.classList.remove("hidden");
}

function openApprovalDrawer(row) {
  const project = findProjectById(row.projectId) || row;
  els.drawerKicker.classList.remove("hidden");
  els.drawerKicker.textContent = "审批详情";
  els.drawerTitle.textContent = project.name || row.project || row.id;
  els.drawerBody.innerHTML = `
    <div class="approval-detail">
      <div class="detail-grid">${projectDetailEntries(project).map(({ key, label, value }) => `<div class="detail-item"><span>${label}</span><strong>${formatPlainValue(formatCell(key, value))}</strong></div>`).join("")}</div>
      <div class="approval-divider"></div>
      <div class="approval-section-head"><span>流程</span><b>⌄</b></div>
      ${renderApprovalFlow(row)}
    </div>
    <div class="approval-actions">
      <button class="outline-danger-btn" id="approvalReject" type="button">驳回</button>
      <button class="primary-btn" id="approvalAgree" type="button">同意</button>
    </div>
  `;
  els.drawer.classList.remove("hidden");
  [
    ["approvalReject", "驳回", "已驳回"],
    ["approvalAgree", "同意", "已通过"],
  ].forEach(([id, action, status]) => {
    document.getElementById(id).addEventListener("click", () => requestApprovalOpinion({
      title: `确认${action}`,
      message: "请确认审批意见，确认后将更新审批记录状态。",
      action,
      onConfirm: (opinion) => {
        row.status = status;
        row.opinion = opinion;
        els.drawer.classList.add("hidden");
        render();
        showToast(`审批已${action}`);
      },
    }));
  });
}

function findProjectById(projectId) {
  return (state.data.project?.项目管理 || []).find((item) => item.id === projectId);
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
  if (tab === "项目类型设置") return "新建项目类型";
  if (tab === "项目进度节点") return "新增节点";
  if (tab.includes("审批")) return "处理审批";
  if (tab.includes("归档")) return "确认归档";
  if (tab.includes("提醒")) return "处理提醒";
  return fallback;
}

function requestConfirm({ title, message, extra = "", onConfirm }) {
  state.confirm = onConfirm;
  els.confirmKicker.classList.add("hidden");
  els.confirmTitle.textContent = title;
  els.confirmMessage.textContent = message;
  els.confirmSummary.innerHTML = "";
  els.confirmSummary.classList.add("hidden");
  els.confirmExtra.innerHTML = extra;
  els.confirmExtra.classList.toggle("hidden", !extra);
  els.confirmMask.classList.remove("hidden");
}

function requestApprovalOpinion({ title, message, action, onConfirm }) {
  const fieldLabel = action === "提交验收审核" ? "验收意见" : "审批意见";
  requestConfirm({
    title,
    message,
    extra: `<div class="confirm-form approval-opinion-form"><label><span class="required-star">*</span>${fieldLabel}<textarea name="approvalOpinion" maxlength="200" placeholder="请输入${fieldLabel}，最多200字"></textarea></label></div>`,
    onConfirm: () => {
      const opinion = String(readConfirmExtraForm().approvalOpinion || "").trim();
      if (!opinion) {
        showToast(`请填写${fieldLabel}`);
        return false;
      }
      return onConfirm(opinion);
    },
  });
}

function commitConfirm() {
  const fn = state.confirm;
  if (fn && fn() === false) return;
  closeConfirm();
}

function closeConfirm() {
  state.confirm = null;
  els.confirmExtra.innerHTML = "";
  els.confirmExtra.classList.add("hidden");
  els.confirmMask.classList.add("hidden");
}

function openPrdModal() {
  const config = currentConfig();
  const tab = activeTab();
  const spec = getPrdSpec(state.active, tab, state.subPage);
  els.prdTitle.textContent = `${spec.pageName} PRD`;
  els.prdBody.innerHTML = buildPrd(config, tab);
  els.prdMask.classList.remove("hidden");
}

function buildPrd(config, tab) {
  const spec = getPrdSpec(state.active, tab, state.subPage);
  const rows = spec.features.map((item) => `<tr><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td><td>${item[3]}</td><td>${item[4]}</td></tr>`).join("");
  return `
    ${prdSection("1. 背景与目标", spec.background)}
    ${prdSection("2. 用户与使用场景", spec.users)}
    ${prdSection("3. 需求范围", spec.scope)}
    <h3>4. 功能需求列表</h3><table class="prd-table"><thead><tr><th>功能模块</th><th>功能点</th><th>需求描述</th><th>优先级（P0 / P1 / P2）</th><th>备注说明</th></tr></thead><tbody>${rows}</tbody></table>
    ${prdSection("5. 核心流程与交互说明", spec.flow)}
    ${prdSection("6. 异常场景与边界条件", spec.exceptions)}
    ${prdSection("7. 数据口径与埋点需求", spec.data)}
    ${prdSection("8. 风险、依赖与限制", spec.risks)}
    ${prdSection("9. 验收标准", spec.acceptance)}
  `;
}

function getPrdSpec(module, tab, subPage) {
  const common = {
    scope: ["In Scope：列表查询、筛选、详情、新增或编辑、附件模拟上传、必要状态流转、PRD 与流程图查看。", "Out of Scope：真实后端、真实权限校验、真实文件存储、消息推送、财务系统接口及真实导出。"],
    data: ["项目编号为项目全流程唯一标识；采购、合同、付款、发票、验收和归档数据均保留项目关联关系。", "埋点事件：页面访问、查询、重置、新增、编辑、查看详情、附件预览、关键动作确认、PRD 查看、流程图查看。"],
    risks: ["当前页面为静态交互原型，数据仅在当前浏览器会话内模拟。", "生产环境需依赖用户组织、流程引擎、附件服务、权限体系及财务支付接口。"],
  };
  const specs = {
    project: {
      pageName: tab === "项目审批" ? "项目管理 - 项目审批" : subPage === "projectTypes" ? "项目类型管理" : "项目管理",
      background: ["建设学校项目统一入口，形成项目创建、审批、采购、合同、付款、发票、验收和归档的 V1 闭环。", "项目管理页面负责展示项目当前主状态，并提供项目详情、项目进度表和项目类型维护入口。"],
      users: ["申请人创建项目并提交审批；项目负责人查看项目详情与进度；审批人处理待审批项目；管理员维护项目类型。"],
      features: tab === "项目审批" ? [
        ["项目审批", "待审列表", "展示项目编号、项目名称、负责人、状态与操作入口；不展示审批角色、顺序、记录等冗余列。", "P0", "仅展示可追溯的申请主数据。"],
        ["项目审批", "审批详情", "点击审批跳转审批子页面，上方展示与项目详情一致的基本信息，下方展示审批流程与同意、驳回操作。", "P0", "审批前展示申请资料和附件。"],
        ["项目审批", "审批处理", "同意或驳回必须填写审批意见并进行二次确认；操作完成后更新审批记录和项目状态。", "P0", "V1 不提供加签、转交和催办。"],
      ] : subPage === "projectTypes" ? [
        ["项目类型管理", "类型列表", "展示类型名称、类型说明、创建时间和创建人员；列表不展示选择框、编号、类型编码、状态及使用项目数。", "P0", "默认创建时间为首次打开应用时间，创建人员为 admin。"],
        ["项目类型管理", "新增与编辑", "支持新增、编辑类型名称与说明；已保存的类型可用于项目创建表单的下拉选项。", "P0", "必填字段仅在字段名前显示星号。"],
        ["项目类型管理", "删除限制", "未被项目使用的类型可删除；已使用类型点击删除时，在页面中上部提示“已使用项目类型不支持删除操作”。", "P0", "禁止删除已关联项目类型。"],
      ] : [
        ["项目管理", "项目列表", "展示项目编号、名称、类型、预算、负责人、当前状态和创建时间；项目类型与状态筛选使用下拉选择框。", "P0", "状态选项覆盖项目全生命周期，不包含草稿。"],
        ["项目管理", "创建项目", "创建弹窗包含项目名称、项目类型、项目目的、建设内容、预期目标、项目周期、预算、责任部门、负责人、备注和附件。", "P0", "项目周期为精确到日的日期范围。"],
        ["项目管理", "项目详情", "详情跳转子页面，展示项目基本信息、可预览的多个附件，以及可手动新增的进度表。", "P0", "进度表按系统设置的固定节点顺序展示。"],
        ["项目管理", "状态流转", "项目状态按待审批、已通过、待采购、采购中、采购完成、待签订、履约中、待付款、已付款、待验收、待整改、已验收、待提交、待审批、已归档等阶段流转。", "P0", "状态筛选展示完整状态集合。"],
      ],
      flow: tab === "项目审批" ? ["进入项目审批标签，点击列表中的“审批”进入子页面。", "审批子页面先展示项目基本信息与附件，再展示申请人、当前审批节点及流程记录。", "审批人选择同意或驳回，填写意见后进行二次确认；同意后项目进入下一业务阶段，驳回后项目状态更新为已驳回。"] : ["项目负责人创建项目并上传附件，保存后在项目列表显示项目编号。", "提交审批后审批人进入项目审批标签处理；审批通过后项目可关联采购记录。", "项目详情中的进度表从系统配置节点生成；未完成节点完成时间显示“-”，完成时记录完成时间和操作人。"],
      exceptions: ["项目名称、类型、项目周期、预算、责任部门和负责人为空时禁止保存。", "项目类型已被项目使用时禁止删除，并在页面中上部显示提示。", "项目附件最多上传 5 个，单个文件最大 15M，仅支持 PRD/PDF、Word、Excel、JPG/JPJ、PNG 格式。"],
      acceptance: ["项目管理与项目审批两个标签均可访问并显示数据。", "项目详情为独立子页面，附件支持多文件预览，进度表展示节点、完成时间和操作人。", "项目审批仅提供同意和驳回，操作前必须二次确认。"],
    },
    purchase: {
      pageName: "采购管理",
      background: ["采购管理承接审批通过的项目，记录采购登记、采购执行节点和采购完成结果，为合同登记提供供应商和实际采购金额。"],
      users: ["采购经办人新增采购、启动采购并完成采购；项目负责人查看采购详情及关联进度。"],
      features: [
        ["采购管理", "新增采购", "新增采购关联所属项目，填写采购名称、类型、预算金额、采购方式、采购时间及采购文件、报价单；登记阶段不填写供应商。", "P0", "列表不展示左侧选择框。"],
        ["采购管理", "开始采购", "待采购状态点击开始采购，填写招标公告发布时间、投标截止时间和实际采购金额后进入采购中。", "P0", "字段均为业务执行信息。"],
        ["采购管理", "完成采购", "采购中状态点击完成采购，填写中标单位确认时间、供应商名称和实际采购金额后进入采购完成。", "P0", "三个字段均必填。"],
        ["采购管理", "采购详情", "详情展示采购基本信息、招标公告发布时间、投标截止时间、中标单位确认时间、供应商、实际采购金额和附件预览。", "P0", "不展示开始采购时间和完成采购时间字段。"],
      ],
      flow: ["新增采购后状态为待采购。", "点击开始采购并保存招标公告发布时间、投标截止时间和实际采购金额后，状态更新为采购中。", "点击完成采购并填写中标单位确认时间、供应商名称和实际采购金额后，状态更新为采购完成，并同步作为合同登记的可关联采购。"],
      exceptions: ["开始采购和完成采购必填字段缺失时禁止提交。", "采购完成前不得登记关联合同。", "查询无结果时显示空状态，查询和重置按钮保持正常尺寸。"],
      acceptance: ["采购列表展示预算金额、实际采购金额、状态和业务操作。", "待采购、采购中、采购完成三个状态均可通过对应操作流转。", "详情页完整展示采购登记、开始采购和完成采购信息。"],
    },
    contract: {
      pageName: "合同管理",
      background: ["合同管理承接采购完成记录，登记合同并跟踪履约状态，为付款申请提供关联合同。"],
      users: ["合同经办人登记合同、签订合同、完成履约或终止合同；项目负责人查看合同详情。"],
      features: [
        ["合同管理", "合同登记", "登记时关联所属项目和所属采购，填写合同编号、合同金额、合作单位、签订日期、履约期限及合同附件。", "P0", "所属采购必须为采购完成记录。"],
        ["合同管理", "签订合同", "待签订记录点击签订合同后进入履约中状态。", "P0", "关键操作需二次确认。"],
        ["合同管理", "履约处理", "履约中记录可执行履约完成或终止合同，状态分别更新为已完成和已终止。", "P0", "已完成不展示终止合同操作。"],
        ["合同管理", "合同详情", "展示合同基本信息、关联合同采购、履约状态和附件预览。", "P1", "V1 不提供合同提醒。"],
      ],
      flow: ["采购完成后登记合同，初始状态为待签订。", "签订合同后状态变为履约中；履约完成后变为已完成。", "履约中可终止合同；已终止记录仅保留查看详情操作。"],
      exceptions: ["采购未完成或合同必填字段为空时禁止登记。", "已完成、已终止合同不允许再次变更履约状态。", "合同附件最多 5 个，单文件最大 15M。"],
      acceptance: ["待签订、履约中、已完成、已终止状态与操作规则一致。", "待签订仅显示签订合同；履约中显示履约完成和终止合同；已终止仅可查看详情。", "页面不展示合同提醒能力。"],
    },
    payment: {
      pageName: tab === "财务审核" ? "付款申请 - 财务审核" : "付款申请",
      background: ["付款申请独立承载合同付款与财务审核，形成合同、付款和发票之间的资金关联闭环。"],
      users: ["项目负责人发起付款申请；财务人员在财务审核标签审核、驳回并登记付款时间。"],
      features: [
        ["付款申请", "付款申请", "申请时选择所属项目名称和所属合同，填写付款金额、付款比例、付款说明及附件。", "P0", "所属项目展示项目名称，不展示项目编号。"],
        ["付款申请", "申请列表", "付款申请标签仅展示申请和查看操作，不展示财务审核操作。", "P0", "财务审核独立在审核标签处理。"],
        ["财务审核", "审核与付款", "财务审核标签对待审核记录执行通过或驳回；通过后登记付款时间，状态更新为已付款。", "P0", "所有审核动作需二次确认。"],
      ],
      flow: ["项目负责人选择履约中合同发起付款，状态为待审核。", "财务人员在财务审核标签同意或驳回；同意后登记付款时间并更新为已付款。", "已付款记录可在发票管理中被关联。"],
      exceptions: ["合同、付款金额、付款比例、付款说明缺失时禁止提交。", "付款金额不得大于合同可支付余额。", "驳回必须填写审核意见。"],
      acceptance: ["付款申请与财务审核分别在两个标签显示。", "所属项目字段和列表均展示项目名称。", "财务审核完成后可在发票登记中选择关联付款。"],
    },
    invoice: {
      pageName: "发票管理",
      background: ["发票管理记录项目、合同和付款对应的发票信息，支持核销并展示预算、合同、付款和发票的匹配关系。"],
      users: ["财务人员登记、查看和核销发票；项目负责人查询项目发票。"],
      features: [
        ["发票管理", "发票登记", "选择所属项目名称、所属合同和所属付款，填写发票号码、金额、日期并上传扫描件。", "P0", "所属付款仅可选择已付款记录。"],
        ["发票管理", "发票查询", "支持按项目名称、合同、发票号码和日期筛选发票记录。", "P0", "列表不展示项目编号。"],
        ["发票管理", "发票核销", "对已登记发票执行核销，状态更新为已核销。", "P0", "核销前必须二次确认。"],
        ["发票管理", "预算关联", "详情展示预算、合同、付款和发票金额，支持人工核对。", "P1", "不包含 OCR 自动识别。"],
      ],
      flow: ["财务人员选择已付款记录登记发票，状态为已登记。", "核对关联项目、合同、付款和金额后执行核销，状态更新为已核销。"],
      exceptions: ["项目、合同、付款、发票号码、金额、日期和扫描件缺失时禁止登记。", "同一合同下发票累计金额不得超过已付款金额。", "V1 不提供 OCR 识别和自动填充。"],
      acceptance: ["所属项目始终展示项目名称。", "发票可按项目、合同和日期查询。", "核销状态可二次确认后由已登记更新为已核销。"],
    },
    acceptance: {
      pageName: tab === "验收审核" ? "验收管理 - 验收审核" : "验收管理",
      background: ["验收管理记录项目验收申请、审核结果和整改过程；验收通过后将项目自动进入项目归档待提交列表。"],
      users: ["项目负责人提交验收和整改；验收人员在验收审核标签审核验收结果。"],
      features: [
        ["验收管理", "提交验收", "填写所属项目、验收时间、验收人员、验收材料和附件；提交阶段不填写验收意见和整改期限。", "P0", "初始状态为待验收。"],
        ["验收审核", "审核验收", "审核页面展示项目基本信息和申请附件，填写验收结果、整改期限和验收结果附件。", "P0", "验收结果为通过、整改或不通过。"],
        ["验收管理", "整改提交", "待整改记录仅展示详情和提交整改；整改说明最多 200 字并支持上传整改附件，提交后状态回到待验收。", "P0", "待整改状态不显示审核操作。"],
        ["验收管理", "验收流程", "验收流程展示申请附件、验收结果附件和整改附件。", "P1", "保留每次验收记录。"],
      ],
      flow: ["提交验收后状态为待验收。", "验收人员审核：结果为通过时状态更新为已验收；结果为整改或不通过时状态更新为待整改。", "项目负责人提交整改说明和附件后回到待验收；已验收项目自动出现于项目归档待提交列表。"],
      exceptions: ["验收时间、验收人员和验收材料为空时禁止提交验收。", "审核时必须选择验收结果；选择整改或不通过时必须填写整改期限。", "待整改状态不得直接审核或归档。"],
      acceptance: ["验收申请和验收审核使用独立标签。", "待验收、待整改、已验收三种状态及操作符合流程。", "验收通过后项目归档自动出现对应待提交记录。"],
    },
    closing: {
      pageName: "项目归档",
      background: ["项目归档承接已验收项目，统一保存项目申请、采购、合同、付款、发票、验收和归档资料，并完成归档审批。"],
      users: ["项目负责人提交归档资料；归档审批人查看全流程资料和归档审批流程。"],
      features: [
        ["项目归档", "归档列表", "仅展示验收状态为已验收的项目，归档状态仅包括待提交、待审批和已归档。", "P0", "列表不展示验收状态字段。"],
        ["项目归档", "提交归档", "待提交项目点击提交，填写归档说明并上传归档附件；确认后状态更新为待审批。", "P0", "归档说明和附件均必填。"],
        ["项目归档", "归档详情", "详情子页面顶部展示项目基本信息，下方可切换查看项目申请、采购、合同、付款、发票、验收和归档提交资料。", "P0", "底部展示归档审批流程、提交人员、文案和附件。"],
        ["项目归档", "归档限制", "未验收通过的项目不得进入归档列表或提交归档。", "P0", "满足 V1 自动校验要求。"],
      ],
      flow: ["项目验收审核通过后，系统自动生成归档状态为待提交的归档记录。", "项目负责人填写归档说明并上传附件，二次确认后状态更新为待审批。", "归档详情集中展示全流程关联资料和归档审批流程，审批通过后状态更新为已归档。"],
      exceptions: ["未通过验收或待整改项目禁止归档。", "归档说明或归档附件为空时禁止提交。", "无关联资料时对应详情标签展示空状态，不影响其他资料查看。"],
      acceptance: ["归档列表仅显示已验收项目，且不展示验收状态列。", "待提交项目可以提交，提交后状态变为待审批。", "详情子页面可切换查看申请、采购、合同、付款、发票、验收和归档资料。"],
    },
    system: {
      pageName: subPage === "flowEditor" ? "系统管理 - 流程配置" : tab === "项目进度节点" ? "系统管理 - 项目进度节点" : "系统管理",
      background: ["系统管理为 V1 提供必要的审批流程、基础角色和项目进度节点配置，避免将业务规则写死在项目页面。"],
      users: ["管理员维护流程配置、审批角色和项目进度节点；项目负责人使用已配置节点更新项目详情进度表。"],
      features: subPage === "flowEditor" ? [
        ["流程配置", "基础信息", "按四步流程配置表单名称、说明、可见范围、分组和管理员。", "P0", "步骤一。"],
        ["流程配置", "审批表单", "在审批表单步骤配置基础字段、附件、日期、单选和多选控件。", "P1", "静态原型模拟拖拽与属性设置。"],
        ["流程配置", "审批流程", "配置发起人、审批人和流程结束节点；审批人支持指定教职工、指定角色和直属主管。", "P0", "审批人为空时按配置自动通过或转交。"],
        ["流程配置", "高级设置", "配置提交人撤销、撤销期限、修改期限和修改次数。", "P1", "V1 仅模拟配置保存。"],
      ] : tab === "项目进度节点" ? [
        ["项目进度节点", "节点列表", "展示显示顺序、项目进度节点、备注、创建人员和操作；列表不展示左侧选择框。", "P0", "按显示顺序固定展示。"],
        ["项目进度节点", "新增与编辑", "支持新增、编辑节点名称、显示顺序和备注。", "P0", "显示顺序不可重复。"],
        ["项目进度节点", "删除节点", "支持删除未使用节点；已被项目进度表使用的节点不得删除。", "P1", "生产环境需做关联校验。"],
      ] : [
        ["系统管理", "流程配置", "维护项目审批、付款审核、验收和归档审批的基础流程及审批角色。", "P0", "点击配置进入四步流程编辑页面。"],
        ["系统管理", "项目进度节点", "维护项目详情进度表的固定节点和显示顺序。", "P0", "节点变更影响后续项目展示。"],
        ["系统管理", "基础权限", "配置申请人、审核人、负责人和管理员的基础操作范围。", "P1", "V1 不实现真实权限控制。"],
      ],
      flow: subPage === "flowEditor" ? ["管理员依次完成基础信息、审批表单、审批流程和高级设置。", "审批流程至少包含发起人、一个审批人和流程结束节点。", "保存后流程配置在列表中显示，可供项目审批等业务动作模拟使用。"] : tab === "项目进度节点" ? ["管理员维护进度节点和显示顺序。", "项目详情进度表按升序读取节点；项目负责人可记录节点完成时间和操作人。"] : ["管理员从流程配置进入四步编辑页面，保存审批规则。", "管理员从项目进度节点标签维护固定顺序，项目详情按此顺序展示。"],
      exceptions: ["流程名称、审批节点和必要审批人为空时禁止保存流程。", "项目进度节点名称和显示顺序为空或重复时禁止保存。", "当前为原型，保存仅更新前端模拟数据。"],
      acceptance: ["流程配置可按基础信息、审批表单、审批流程和高级设置四步切换。", "项目进度节点可新增、编辑、删除，并按显示顺序展示。", "项目详情进度表读取系统配置节点并显示完成时间与操作人。"],
    },
  };
  return { ...common, ...specs[module] };
}

function projectStatusPrdLines(config) {
  if (config.title !== "项目管理") return [];
  return [
    "项目状态范围：待审批、退回修改、已驳回、已通过、待采购、采购中、采购完成、待签合同、履约中、实施中、延期、待付款、付款审核中、已付款、发票已登记、待验收、待整改、已验收、待归档、已归档。",
    "主流程流转：待审批 -> 已通过 -> 待采购 -> 采购中 -> 采购完成 -> 待签合同 -> 履约中 -> 实施中 -> 待付款 -> 付款审核中 -> 已付款 -> 发票已登记 -> 待验收 -> 已验收 -> 待归档 -> 已归档。",
    "审批分支流转：待审批可同意或驳回；同意后进入已通过，驳回后进入已驳回。",
    "实施与验收分支流转：实施中可标记延期并填写延期原因；验收结果为整改或不通过时进入待整改，提交整改后回到待验收，通过后进入已验收。",
    "列表展示规则：项目管理列表状态字段展示项目当前主阶段，状态筛选使用下拉选择框，选项需与当前列表数据保持一致。",
  ];
}

function prdSection(title, lines) {
  return `<h3>${title}</h3><ul>${lines.map((line) => `<li>${line}</li>`).join("")}</ul>`;
}

function openFlowChartModal() {
  const diagrams = [
    { title: "项目全生命周期", stages: ["项目立项", "项目审批", "采购管理", "合同管理", "项目实施", "付款申请", "发票管理", "验收管理", "项目归档", "流程结束"], lanes: [["申请人 / 项目负责人", [[0, "1 新建项目"], [0, "2 提交项目资料"], [4, "7 更新实施进度"], [5, "8 发起付款申请"], [7, "11 提交验收资料"], [8, "13 提交归档资料"]]], ["项目审批人", [[1, "3 同意 / 退回 / 驳回", "decision"]]], ["采购经办人", [[2, "4 采购登记与结果确认"]]], ["合同管理员", [[3, "5 登记合同并履约"]]], ["财务人员", [[5, "9 财务审核与付款", "decision"], [6, "10 发票登记与核销"]]], ["验收 / 归档审批人", [[7, "12 验收通过 / 整改", "decision"], [8, "14 归档通过 / 退回", "decision"], [9, "15 项目已归档", "output"]]]] },
    { title: "项目管理", stages: ["创建项目", "资料填写", "提交审批", "审批处理", "修改补充", "项目通过"], lanes: [["申请人 / 项目负责人", [[0, "1 新建项目"], [1, "2 填写资料与附件"], [2, "3 提交审批"], [4, "5 按意见修改"]]], ["项目审批人", [[3, "4 同意 / 退回 / 驳回", "decision"]]], ["系统", [[1, "校验必填项"], [5, "6 生成项目编号", "output"]]]] },
    { title: "采购管理", stages: ["选择项目", "采购登记", "文件上传", "采购跟进", "确定供应商", "采购完成"], lanes: [["采购经办人", [[0, "1 选择已通过项目"], [1, "2 新增采购登记"], [2, "3 上传采购文件"], [3, "4 更新采购进度"], [4, "5 确定供应商"], [5, "6 采购完成", "output"]]], ["系统", [[1, "校验关联信息"], [3, "更新采购状态"]]]] },
    { title: "合同管理", stages: ["选择采购", "合同登记", "附件上传", "履约跟踪", "合同完成"], lanes: [["合同管理员", [[0, "1 选择采购完成记录"], [1, "2 登记合同"], [2, "3 上传合同附件"], [3, "4 履约跟踪"], [4, "5 合同完成", "output"]]], ["系统", [[1, "校验项目、采购、合同关联"], [3, "更新合同状态"]]]] },
    { title: "付款申请", stages: ["选择合同", "填写申请", "提交审核", "财务审核", "修改重提", "付款完成"], lanes: [["项目负责人", [[0, "1 选择履约中合同"], [1, "2 填写付款申请与附件"], [2, "3 提交付款申请"], [4, "5 按意见修改"]]], ["财务人员", [[3, "4 审核通过 / 驳回", "decision"]]], ["系统", [[2, "校验金额与附件"], [5, "6 登记付款时间", "output"]]]] },
    { title: "发票管理", stages: ["关联付款", "发票登记", "扫描件上传", "金额匹配", "发票核销"], lanes: [["财务人员", [[0, "1 选择已付款记录"], [1, "2 登记发票信息"], [2, "3 上传扫描件"], [4, "5 发票核销", "output"]]], ["系统", [[3, "4 校验关联与金额"]]]] },
    { title: "验收管理", stages: ["提交验收", "材料上传", "验收审核", "结果处理", "整改重验", "验收完成"], lanes: [["项目负责人", [[0, "1 提交验收申请"], [1, "2 上传验收材料"], [4, "5 提交整改说明"]]], ["验收人员", [[2, "3 填写验收意见"], [3, "4 通过 / 整改 / 不通过", "decision"]]], ["系统", [[5, "6 保存验收记录", "output"]]]] },
    { title: "项目归档", stages: ["资料准备", "提交归档", "完整性校验", "归档审批", "补充资料", "归档完成"], lanes: [["项目负责人", [[0, "1 填写项目总结"], [1, "2 上传成果与归档资料"], [4, "5 补充退回资料"]]], ["系统", [[2, "3 校验已验收与资料完整性"], [5, "6 更新已归档状态", "output"]]], ["归档审批人", [[3, "4 通过 / 退回补充", "decision"]]]] },
  ];
  els.flowBody.innerHTML = diagrams.map(renderSwimlaneDiagram).join("");
  els.flowMask.classList.remove("hidden");
}

function renderSwimlaneDiagram({ title, stages, lanes }) {
  const roleWidth = 156;
  const stageWidth = 148;
  const headerHeight = 48;
  const laneHeight = 82;
  const columns = `${roleWidth}px repeat(${stages.length}, ${stageWidth}px)`;
  const flowId = `flow-${Array.from(title).map((char) => char.charCodeAt(0)).join("-")}-${stages.length}`;
  const flowNodes = lanes.flatMap(([, tasks], laneIndex) => tasks.map((task) => ({ laneIndex, stageIndex: task[0], order: Number.parseInt(task[1], 10) || 0 }))).filter((node) => node.order > 0).sort((a, b) => a.order - b.order);
  const point = (node) => ({ x: roleWidth + node.stageIndex * stageWidth + stageWidth / 2, y: headerHeight + node.laneIndex * laneHeight + laneHeight / 2 });
  const connectors = flowNodes.slice(1).map((node, index) => {
    const from = point(flowNodes[index]);
    const to = point(node);
    if (from.x === to.x && from.y === to.y) return "";
    const startX = from.x + 38;
    const endX = to.x - 38;
    const middleX = Math.max(startX + 18, Math.min((startX + endX) / 2, endX - 18));
    return `<path d="M ${startX} ${from.y} H ${middleX} V ${to.y} H ${endX}" marker-end="url(#${flowId})"/>`;
  }).join("");
  const flowSvg = `<svg class="matrix-connectors" viewBox="0 0 ${roleWidth + stages.length * stageWidth} ${headerHeight + lanes.length * laneHeight}" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="${flowId}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M 0 0 L 8 4 L 0 8 z"/></marker></defs>${connectors}</svg>`;
  return `<section class="swimlane-diagram"><div class="flow-group-head"><h3>${title}操作泳道图</h3><span>横向阶段 / 纵向角色</span></div><div class="matrix-swimlane" style="--flow-columns: ${columns}">${flowSvg}<div class="matrix-stage-row"><div class="matrix-corner">责任角色 / 业务阶段</div>${stages.map((stage) => `<div class="matrix-stage">${escapeHtml(stage)}</div>`).join("")}</div>${lanes.map(([role, tasks]) => `<div class="matrix-lane-row"><div class="matrix-role">${escapeHtml(role)}</div>${stages.map((_, stageIndex) => { const tasksInStage = tasks.filter(([index]) => index === stageIndex); return `<div class="matrix-cell">${tasksInStage.map((task) => `<div class="matrix-task ${task[2] || ""}">${escapeHtml(task[1])}</div>`).join("")}</div>`; }).join("")}</div>`).join("")}</div></section>`;
}

function formatPlainValue(value) {
  return String(value).replace(/<[^>]+>/g, "");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function money(value) {
  return `¥${Number(value || 0).toLocaleString("zh-CN")}`;
}

function formatDateTime(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toDatetimeLocal(value) {
  return String(value || "").replace(" ", "T");
}

function fromDatetimeLocal(value) {
  return String(value || "").replace("T", " ");
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
