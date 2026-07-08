const navGroups = [];

const labelMap = {
  id: "编号",
  name: "名称",
  project: "所属项目",
  category: "类别",
  type: "类型",
  school: "所属学校",
  dept: "所属部门",
  owner: "负责人",
  phone: "联系电话",
  budget: "预算金额",
  amount: "金额",
  paid: "已支付",
  remain: "剩余金额",
  source: "资金来源",
  cycle: "实施周期",
  start: "开始时间",
  end: "结束时间",
  status: "状态",
  risk: "风险",
  node: "当前节点",
  next: "下一节点",
  method: "采购方式",
  supplier: "供应商",
  contact: "联系人",
  level: "等级",
  count: "合作次数",
  publish: "公告时间",
  deadline: "截止时间",
  winner: "中标单位",
  signDate: "签订日期",
  period: "履约期限",
  partner: "合作方",
  percent: "完成比例",
  milestone: "里程碑",
  date: "日期",
  stage: "节点",
  invoice: "发票",
  tax: "税额",
  code: "发票代码",
  number: "发票号码",
  time: "时间",
  place: "地点",
  members: "参与人员",
  opinion: "意见",
  rectification: "整改要求",
  docs: "资料",
  result: "结果",
  role: "角色",
  permission: "权限",
  condition: "条件",
  channel: "渠道",
  note: "说明",
};

const moduleConfigs = {
  workbench: {
    title: "业务工作台",
    addLabel: "新建项目",
    tabs: ["数据概览", "我的待办", "我的项目", "消息通知"],
    filters: ["关键字", "状态", "负责人", "日期"],
  },
  project: {
    title: "项目管理",
    addLabel: "新建项目",
    tabs: ["项目申请", "项目审批", "项目详情", "项目变更", "项目归档"],
    filters: ["项目名称", "项目类别", "所属学校", "状态"],
    form: [
      field("name", "项目名称", "text", true),
      field("category", "项目类别", "select", true, ["教育教学设备采购", "教学用具补充", "图书资料采购", "实验耗材补充"]),
      field("type", "项目类型", "select", true, ["新建", "改造", "补充", "维护"]),
      field("school", "所属学校", "select", true, ["第一实验学校", "城北中学", "青澜小学"]),
      field("dept", "所属部门", "text", true),
      field("owner", "项目负责人", "text", true),
      field("phone", "联系电话", "text"),
      field("budget", "项目预算", "number", true),
      field("source", "资金来源", "select", true, ["财政资金", "校内预算", "专项资金"]),
      field("start", "开始时间", "date", true),
      field("end", "结束时间", "date", true),
      field("note", "建设内容", "textarea", true),
      field("docs", "项目申请书/预算明细", "upload"),
    ],
  },
  purchase: {
    title: "采购管理",
    addLabel: "新建采购",
    tabs: ["采购申请", "采购审批", "招标管理", "供应商管理", "采购进度"],
    filters: ["采购名称", "采购方式", "供应商", "状态"],
    form: [
      field("name", "采购名称", "text", true),
      field("project", "所属项目", "select", true),
      field("category", "采购类别", "select", true, ["设备", "耗材", "图书", "服务"]),
      field("method", "采购方式", "select", true, ["公开招标", "询价", "竞争性谈判", "单一来源"]),
      field("budget", "采购预算", "number", true),
      field("owner", "采购负责人", "text", true),
      field("note", "采购说明", "textarea"),
      field("docs", "采购附件", "upload"),
    ],
  },
  contract: {
    title: "合同管理",
    addLabel: "登记合同",
    tabs: ["合同登记", "合同审批", "合同履约", "合同预警"],
    filters: ["合同名称", "所属项目", "供应商", "状态"],
    form: [
      field("name", "合同名称", "text", true),
      field("project", "所属项目", "select", true),
      field("supplier", "供应商", "select", true),
      field("amount", "合同金额", "number", true),
      field("signDate", "签订日期", "date", true),
      field("start", "开始日期", "date", true),
      field("end", "结束日期", "date", true),
      field("stage", "付款方式", "select", true, ["一次性支付", "分阶段支付", "验收后支付"]),
      field("docs", "合同附件", "upload", true),
    ],
  },
  implementation: {
    title: "实施管理",
    addLabel: "更新实施",
    tabs: ["实施计划", "进度更新", "项目日志", "项目延期"],
    filters: ["项目名称", "负责人", "里程碑", "风险状态"],
    form: [
      field("project", "项目名称", "select", true),
      field("owner", "负责人", "text", true),
      field("start", "开始时间", "date", true),
      field("end", "结束时间", "date", true),
      field("milestone", "里程碑", "text", true),
      field("percent", "完成比例", "number"),
      field("risk", "风险状态", "select", false, ["正常", "滞后", "风险", "已完成"]),
      field("note", "进度说明", "textarea", true),
      field("docs", "现场照片/附件", "upload"),
    ],
  },
  payment: {
    title: "付款管理",
    addLabel: "发起付款",
    tabs: ["付款申请", "财务审核", "支付记录", "付款统计"],
    filters: ["项目名称", "合同编号", "付款节点", "状态"],
    form: [
      field("project", "所属项目", "select", true),
      field("contract", "所属合同", "select", true),
      field("amount", "付款金额", "number", true),
      field("percent", "付款比例", "number", true),
      field("stage", "付款节点", "select", true, ["首付款", "进度款", "尾款"]),
      field("note", "付款说明", "textarea"),
      field("docs", "验收凭证/发票", "upload", true),
    ],
  },
  invoice: {
    title: "发票管理",
    addLabel: "登记发票",
    tabs: ["发票登记", "OCR识别", "发票查询", "发票统计"],
    filters: ["项目名称", "合同编号", "供应商", "开票日期"],
    form: [
      field("code", "发票代码", "text", true),
      field("number", "发票号码", "text", true),
      field("supplier", "开票单位", "select", true),
      field("tax", "税号", "text", true),
      field("amount", "金额", "number", true),
      field("date", "开票日期", "date", true),
      field("project", "所属项目", "select", true),
      field("contract", "所属合同", "select", true),
      field("docs", "发票扫描件", "upload", true),
    ],
  },
  acceptance: {
    title: "验收管理",
    addLabel: "提交验收",
    tabs: ["验收申请", "验收材料", "验收意见", "整改管理"],
    filters: ["项目名称", "验收类型", "验收意见", "整改状态"],
    form: [
      field("project", "项目名称", "select", true),
      field("type", "验收类型", "select", true, ["到货验收", "阶段验收", "最终验收"]),
      field("time", "验收时间", "date", true),
      field("place", "验收地点", "text", true),
      field("members", "参与人员", "text", true),
      field("opinion", "验收意见", "select", false, ["通过", "有条件通过", "不通过"]),
      field("rectification", "整改意见", "textarea"),
      field("docs", "验收报告/清单", "upload", true),
    ],
  },
  closing: {
    title: "结项管理",
    addLabel: "发起结项",
    tabs: ["结项申请", "结项审批", "自动校验", "项目归档"],
    filters: ["项目名称", "结项状态", "负责人", "归档日期"],
    form: [
      field("project", "项目名称", "select", true),
      field("owner", "负责人", "text", true),
      field("note", "结项说明", "textarea", true),
      field("result", "成果总结", "textarea", true),
      field("docs", "结项附件", "upload", true),
    ],
  },
  analytics: {
    title: "统计分析",
    addLabel: "导出报表",
    tabs: ["项目统计", "预算统计", "合同统计", "采购统计", "发票统计", "验收统计", "可视化大屏"],
    filters: ["统计周期", "所属学校", "项目类别", "资金来源"],
  },
  system: {
    title: "系统管理",
    addLabel: "新增配置",
    tabs: ["组织管理", "用户管理", "角色权限", "流程管理", "表单配置", "字典管理", "消息中心", "日志管理", "系统设置"],
    filters: ["名称", "类型", "状态", "更新时间"],
    form: [
      field("name", "配置名称", "text", true),
      field("type", "配置类型", "select", true, ["组织", "用户", "角色", "流程", "表单", "字典", "消息", "日志", "系统"]),
      field("condition", "适用条件", "text"),
      field("role", "关联角色", "select", false, ["申请人", "审核人", "负责人", "财务人员", "系统管理员"]),
      field("permission", "权限说明", "textarea", true),
    ],
  },
};

function field(key, label, type = "text", required = false, options = []) {
  return { key, label, type, required, options };
}

function pageId(module, tab) {
  return tab ? `${module}::${tab}` : module;
}

const pageConfigs = buildPageConfigs();
navGroups.push(...buildNavGroups());

function buildPageConfigs() {
  const pages = {
    workbench: {
      id: "workbench",
      module: "workbench",
      tab: "数据概览",
      title: "业务工作台",
      crumb: "工作台 / 业务工作台",
      addLabel: "新建项目",
      filters: moduleConfigs.workbench.filters,
      form: moduleConfigs.project.form,
      isWorkbench: true,
    },
  };
  Object.entries(moduleConfigs).forEach(([module, config]) => {
    if (module === "workbench") return;
    config.tabs.forEach((tab) => {
      const id = pageId(module, tab);
      pages[id] = {
        id,
        module,
        tab,
        title: tab,
        crumb: `${config.title} / ${tab}`,
        addLabel: actionLabelFor(module, tab, config.addLabel),
        filters: config.filters,
        form: config.form,
      };
    });
  });
  return pages;
}

function buildNavGroups() {
  return [
    { title: "工作台", children: [{ id: "workbench", label: "业务工作台" }] },
    ...Object.entries(moduleConfigs)
      .filter(([module]) => module !== "workbench")
      .map(([module, config]) => ({
        title: config.title,
        children: config.tabs.map((tab) => ({ id: pageId(module, tab), label: tab })),
      })),
  ];
}

function actionLabelFor(module, tab, fallback) {
  if (tab.includes("审批")) return "处理审批";
  if (tab.includes("详情")) return "查看详情";
  if (tab.includes("变更")) return "发起变更";
  if (tab.includes("归档")) return "生成归档";
  if (tab.includes("招标")) return "登记招标";
  if (tab.includes("供应商")) return "新增供应商";
  if (tab.includes("履约")) return "更新履约";
  if (tab.includes("预警")) return "处理预警";
  if (tab.includes("统计") || tab.includes("大屏")) return "导出报表";
  if (tab.includes("OCR")) return "上传识别";
  if (tab.includes("整改")) return "新增整改";
  if (tab.includes("校验")) return "重新校验";
  if (module === "system") return "新增配置";
  return fallback;
}

const state = {
  active: "workbench",
  expanded: Object.fromEntries(navGroups.map((group) => [group.title, true])),
  filters: {},
  modal: null,
  confirm: null,
  data: {},
};

const els = {
  navList: document.getElementById("navList"),
  crumbText: document.getElementById("crumbText"),
  pageTitle: document.getElementById("pageTitle"),
  dashboard: document.getElementById("dashboard"),
  moduleView: document.getElementById("moduleView"),
  quickCreateBtn: document.getElementById("quickCreateBtn"),
  approvalBtn: document.getElementById("approvalBtn"),
  todoCount: document.getElementById("todoCount"),
  modalMask: document.getElementById("modalMask"),
  modalTitle: document.getElementById("modalTitle"),
  modalForm: document.getElementById("modalForm"),
  modalClose: document.getElementById("modalClose"),
  modalCancel: document.getElementById("modalCancel"),
  modalSave: document.getElementById("modalSave"),
  prdDotBtn: document.getElementById("prdDotBtn"),
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

const baseProjects = ["智慧教室多媒体设备采购", "化学实验耗材补充项目", "图书馆教学参考书采购", "体育馆教学器材更新"];
const suppliers = ["明德教育科技有限公司", "青澜教学设备有限公司", "华文书业集团", "启明工程服务有限公司"];

function seedData() {
  const projectApplications = [
    row("P20260701001", "智慧教室多媒体设备采购", "教育教学设备采购", 480000, "第一实验学校", "教务处", "沈志彬", "待审批", "正常"),
    row("P20260701002", "化学实验耗材补充项目", "教学用具补充", 86000, "城北中学", "实验教学中心", "杨剑兴", "进行中", "滞后"),
    row("P20260618003", "图书馆教学参考书采购", "图书资料采购", 160000, "第一实验学校", "图书馆", "张俪源", "已通过", "正常"),
  ];
  state.data.workbench = {
    "数据概览": [],
    "我的待办": makeRows("todo", ["待审批项目", "待处理采购", "待签合同", "待付款申请", "待验收项目", "待整改项目"]),
    "我的项目": makeRows("my", ["我负责的项目", "我参与的项目", "我申请的项目"]),
    "消息通知": makeRows("msg", ["审批提醒", "合同到期提醒", "项目延期提醒", "验收提醒", "付款提醒", "系统公告"]),
  };
  state.data.project = {
    "项目申请": projectApplications,
    "项目审批": approvalRows("项目", baseProjects),
    "项目详情": detailRows(projectApplications),
    "项目变更": changeRows(),
    "项目归档": archiveRows("项目"),
  };
  state.data.purchase = {
    "采购申请": purchaseRows("采购申请"),
    "采购审批": approvalRows("采购", baseProjects),
    "招标管理": tenderRows(),
    "供应商管理": supplierRows(),
    "采购进度": purchaseProgressRows(),
  };
  state.data.contract = {
    "合同登记": contractRows("合同登记"),
    "合同审批": approvalRows("合同", baseProjects),
    "合同履约": contractPerformanceRows(),
    "合同预警": warningRows("合同"),
  };
  state.data.implementation = {
    "实施计划": planRows(),
    "进度更新": progressRows(),
    "项目日志": logRows(),
    "项目延期": delayRows(),
  };
  state.data.payment = {
    "付款申请": paymentRows("付款申请"),
    "财务审核": paymentRows("财务审核"),
    "支付记录": payRecordRows(),
    "付款统计": statRows("付款"),
  };
  state.data.invoice = {
    "发票登记": invoiceRows("发票登记"),
    "OCR识别": invoiceRows("OCR识别"),
    "发票查询": invoiceRows("发票查询"),
    "发票统计": statRows("发票"),
  };
  state.data.acceptance = {
    "验收申请": acceptanceRows("验收申请"),
    "验收材料": acceptanceRows("验收材料"),
    "验收意见": acceptanceRows("验收意见"),
    "整改管理": rectificationRows(),
  };
  state.data.closing = {
    "结项申请": closingRows("结项申请"),
    "结项审批": approvalRows("结项", baseProjects),
    "自动校验": checkRows(),
    "项目归档": archiveRows("结项"),
  };
  state.data.analytics = Object.fromEntries(moduleConfigs.analytics.tabs.map((tab) => [tab, analyticsRows(tab)]));
  state.data.system = {
    "组织管理": systemRows("组织"),
    "用户管理": systemRows("用户"),
    "角色权限": systemRows("角色"),
    "流程管理": systemRows("流程"),
    "表单配置": systemRows("表单"),
    "字典管理": systemRows("字典"),
    "消息中心": systemRows("消息"),
    "日志管理": systemRows("日志"),
    "系统设置": systemRows("系统"),
  };
}

function row(id, name, category, budget, school, dept, owner, status, risk) {
  return {
    id,
    name,
    category,
    type: "新建",
    school,
    dept,
    owner,
    phone: "13800000000",
    budget,
    source: "财政资金",
    cycle: "2026-07 至 2026-12",
    start: "2026-07-01",
    end: "2026-12-31",
    status,
    risk,
    docs: "申请书、预算明细、可研报告",
  };
}

function makeRows(prefix, names) {
  return names.map((name, index) => ({
    id: `${prefix.toUpperCase()}${String(index + 1).padStart(3, "0")}`,
    name,
    project: baseProjects[index % baseProjects.length],
    owner: ["沈志彬", "杨剑兴", "张俪源", "吴嘉敏"][index % 4],
    date: `2026-07-${String(index + 7).padStart(2, "0")}`,
    status: ["待处理", "进行中", "已完成", "已提醒"][index % 4],
    note: `${name}需要在当前节点完成处理。`,
  }));
}

function approvalRows(type, projects) {
  return projects.map((project, index) => ({
    id: `${type.slice(0, 1)}SP2026070${index + 1}`,
    project,
    node: ["部门负责人审批", "财务审核", "分管校领导审批", "验收组会签"][index % 4],
    owner: ["陈立", "刘月朝", "舒志建", "吴嘉敏"][index % 4],
    status: ["待审批", "退回修改", "已通过", "加签中"][index % 4],
    note: "支持通过、驳回、退回修改、转交、加签、会签、催办。",
  }));
}

function detailRows(projects) {
  return projects.map((item, index) => ({
    ...item,
    contracts: index + 1,
    invoices: index + 2,
    paid: [120000, 41400, 152400][index],
    percent: ["40%", "55%", "100%"][index],
    opinion: ["未验收", "有条件通过", "通过"][index],
  }));
}

function changeRows() {
  return baseProjects.map((project, index) => ({
    id: `BG2026070${index + 1}`,
    project,
    type: ["预算调整", "周期调整", "负责人变更", "范围调整"][index],
    amount: [30000, 0, 0, 12000][index],
    owner: ["沈志彬", "杨剑兴", "张俪源", "吴嘉敏"][index],
    status: ["待审批", "已通过", "待提交", "退回修改"][index],
    note: "变更需经原审批节点同意后更新计划。",
  }));
}

function archiveRows(type) {
  return baseProjects.map((project, index) => ({
    id: `${type === "结项" ? "JX" : "GD"}2026070${index + 1}`,
    project,
    docs: "申请、审批、合同、发票、验收报告",
    result: ["待归档", "已归档", "资料缺失", "自动归档中"][index],
    owner: ["沈志彬", "杨剑兴", "张俪源", "吴嘉敏"][index],
    date: `2026-09-${String(index + 10).padStart(2, "0")}`,
    status: ["待处理", "已完成", "风险", "进行中"][index],
  }));
}

function purchaseRows(tab) {
  return baseProjects.map((project, index) => ({
    id: `CG2026070${index + 1}`,
    name: `${project}采购`,
    project,
    category: ["设备", "耗材", "图书", "服务"][index],
    method: ["公开招标", "询价", "竞争性谈判", "单一来源"][index],
    budget: [480000, 86000, 160000, 98000][index],
    owner: ["沈志彬", "杨剑兴", "张俪源", "吴嘉敏"][index],
    supplier: suppliers[index],
    status: tab === "采购审批" ? "待审批" : ["招标中", "已定标", "待公告", "已完成"][index],
  }));
}

function tenderRows() {
  return baseProjects.map((project, index) => ({
    id: `ZB2026070${index + 1}`,
    project,
    publish: `2026-07-${String(index + 3).padStart(2, "0")}`,
    deadline: `2026-07-${String(index + 13).padStart(2, "0")}`,
    count: 3 + index,
    winner: suppliers[index],
    amount: [468000, 82800, 152400, 94000][index],
    status: ["公告中", "评标中", "已中标", "待开标"][index],
  }));
}

function supplierRows() {
  return suppliers.map((supplier, index) => ({
    id: `GYS2026070${index + 1}`,
    name: supplier,
    contact: ["王倩", "李明", "周文", "赵启"][index],
    phone: `1390000000${index + 1}`,
    level: ["A", "A", "B", "A"][index],
    count: [8, 5, 12, 3][index],
    status: ["正常", "正常", "观察", "正常"][index],
    docs: "营业执照、开户信息",
  }));
}

function purchaseProgressRows() {
  return ["采购申请", "审批", "招标", "评标", "中标", "签约", "到货", "验收", "完成"].map((stage, index) => ({
    id: `CGJD${String(index + 1).padStart(3, "0")}`,
    project: baseProjects[index % baseProjects.length],
    stage,
    owner: ["沈志彬", "杨剑兴", "张俪源"][index % 3],
    date: `2026-07-${String(index + 1).padStart(2, "0")}`,
    status: index < 5 ? "已完成" : index === 5 ? "进行中" : "待处理",
    next: index < 8 ? ["采购申请", "审批", "招标", "评标", "中标", "签约", "到货", "验收", "完成"][index + 1] : "归档",
  }));
}

function contractRows(tab) {
  return baseProjects.map((project, index) => ({
    id: `HT2026070${index + 1}`,
    name: `${project}合同`,
    project,
    supplier: suppliers[index],
    partner: suppliers[index],
    amount: [468000, 82800, 152400, 94000][index],
    signDate: `2026-07-${String(index + 8).padStart(2, "0")}`,
    period: "2026-07 至 2026-12",
    status: tab === "合同审批" ? "待审批" : ["已生效", "待签订", "履约中", "即将到期"][index],
    docs: "合同扫描件.pdf",
  }));
}

function contractPerformanceRows() {
  return contractRows("合同履约").map((item, index) => ({
    ...item,
    stage: ["供货中", "部分到货", "已验收", "履约延期"][index],
    risk: ["正常", "正常", "正常", "风险"][index],
    note: "履约日志、履约照片、履约附件、违约记录均已关联。",
  }));
}

function warningRows() {
  return contractRows("合同预警").map((item, index) => ({
    ...item,
    status: ["即将到期", "已到期", "付款延期", "履约延期"][index],
    risk: ["风险", "风险", "滞后", "滞后"][index],
    next: "通知负责人处理",
  }));
}

function planRows() {
  return baseProjects.map((project, index) => ({
    id: `JH2026070${index + 1}`,
    project,
    owner: ["沈志彬", "杨剑兴", "张俪源", "吴嘉敏"][index],
    start: `2026-07-${String(index + 1).padStart(2, "0")}`,
    end: `2026-09-${String(index + 10).padStart(2, "0")}`,
    milestone: ["完成招标", "到货入库", "完成编目", "安装调试"][index],
    status: ["进行中", "滞后", "已完成", "待启动"][index],
  }));
}

function progressRows() {
  return baseProjects.map((project, index) => ({
    id: `JZ2026070${index + 1}`,
    project,
    owner: ["沈志彬", "杨剑兴", "张俪源", "吴嘉敏"][index],
    date: "2026-07",
    percent: ["40%", "55%", "100%", "20%"][index],
    risk: ["正常", "滞后", "已完成", "风险"][index],
    docs: "现场照片、施工视频、月报附件",
    note: "支持日报、周报、月报更新。",
  }));
}

function logRows() {
  return ["每日记录", "问题记录", "整改记录", "风险记录", "会议纪要"].map((type, index) => ({
    id: `RZ2026070${index + 1}`,
    type,
    project: baseProjects[index % baseProjects.length],
    owner: ["沈志彬", "杨剑兴", "张俪源"][index % 3],
    date: `2026-07-${String(index + 8).padStart(2, "0")}`,
    status: ["已记录", "待处理", "已整改", "风险", "已归档"][index],
    note: `${type}已进入项目全过程资料中心。`,
  }));
}

function delayRows() {
  return baseProjects.map((project, index) => ({
    id: `YQ2026070${index + 1}`,
    project,
    owner: ["沈志彬", "杨剑兴", "张俪源", "吴嘉敏"][index],
    date: `2026-07-${String(index + 12).padStart(2, "0")}`,
    count: [0, 12, 0, 7][index],
    risk: ["正常", "滞后", "正常", "风险"][index],
    status: ["无需延期", "延期审批中", "已关闭", "待提交"][index],
    note: "延期申请需说明原因、天数并上传附件。",
  }));
}

function paymentRows(tab) {
  return baseProjects.map((project, index) => ({
    id: `FK2026070${index + 1}`,
    project,
    contract: `HT2026070${index + 1}`,
    stage: ["首付款", "进度款", "尾款", "进度款"][index],
    amount: [140000, 41400, 76200, 30000][index],
    percent: [30, 50, 50, 30][index],
    invoice: ["已上传", "已上传", "待上传", "已上传"][index],
    status: tab === "财务审核" ? ["待审核", "退回", "已支付", "待审核"][index] : ["已提交", "财务审核中", "已支付", "草稿"][index],
  }));
}

function payRecordRows() {
  return paymentRows("支付记录").map((item, index) => ({
    ...item,
    date: `2026-07-${String(index + 18).padStart(2, "0")}`,
    account: "学校基本户",
    number: `LSH202607${String(index + 1).padStart(4, "0")}`,
    docs: "支付凭证.pdf",
    status: ["已支付", "已支付", "待支付", "已支付"][index],
  }));
}

function invoiceRows(tab) {
  return baseProjects.map((project, index) => ({
    id: `FP2026070${index + 1}`,
    code: `03100260071${index}`,
    number: `2456821${index}`,
    supplier: suppliers[index],
    tax: `91330000MA${index}X`,
    amount: [140000, 41400, 76200, 30000][index],
    date: `2026-07-${String(index + 14).padStart(2, "0")}`,
    project,
    contract: `HT2026070${index + 1}`,
    status: tab === "OCR识别" ? ["待识别", "已识别", "人工修改", "识别失败"][index] : ["已匹配", "已匹配", "待匹配", "已匹配"][index],
  }));
}

function acceptanceRows(tab) {
  return baseProjects.map((project, index) => ({
    id: `YS2026070${index + 1}`,
    project,
    type: ["到货验收", "阶段验收", "最终验收", "到货验收"][index],
    time: `2026-08-${String(index + 20).padStart(2, "0")}`,
    place: ["第一会议室", "实验楼", "图书馆", "体育馆"][index],
    members: "教务处、资产处、验收组",
    opinion: ["待填写", "有条件通过", "通过", "不通过"][index],
    rectification: ["无", "补齐检测报告", "无", "重新安装调试"][index],
    status: tab === "验收意见" ? ["待填写", "待整改", "已通过", "不通过"][index] : ["待验收", "材料待补", "已完成", "待验收"][index],
  }));
}

function rectificationRows() {
  return baseProjects.map((project, index) => ({
    id: `ZG2026070${index + 1}`,
    project,
    owner: ["沈志彬", "杨剑兴", "张俪源", "吴嘉敏"][index],
    date: `2026-08-${String(index + 24).padStart(2, "0")}`,
    rectification: ["无", "补齐耗材检测报告", "无", "提交复验申请"][index],
    result: ["无需整改", "整改中", "已完成", "待复验"][index],
    status: ["已关闭", "待整改", "已完成", "复验中"][index],
    docs: "整改照片、整改报告",
  }));
}

function closingRows(tab) {
  return baseProjects.map((project, index) => ({
    id: `JX2026070${index + 1}`,
    project,
    owner: ["沈志彬", "杨剑兴", "张俪源", "吴嘉敏"][index],
    note: "项目成果、总结、附件已汇总。",
    result: ["待提交", "审批中", "已结项", "资料待补"][index],
    docs: "成果总结、项目总结、附件包",
    status: tab === "结项审批" ? ["待审批", "会签中", "已通过", "退回修改"][index] : ["草稿", "审批中", "已结项", "待补齐"][index],
  }));
}

function checkRows() {
  return ["采购是否完成", "合同是否完成", "付款是否完成", "发票是否完整", "验收是否通过", "资料是否齐全"].map((name, index) => ({
    id: `JY${String(index + 1).padStart(3, "0")}`,
    name,
    project: baseProjects[index % baseProjects.length],
    result: ["通过", "通过", "待确认", "通过", "不通过", "资料缺失"][index],
    status: ["已通过", "已通过", "待处理", "已通过", "风险", "待补齐"][index],
    note: "自动校验结果用于判断是否允许结项归档。",
  }));
}

function statRows(type) {
  return ["累计金额", "剩余金额", "执行比例", "趋势"].map((name, index) => ({
    id: `${type}TJ${index + 1}`,
    name,
    amount: [836000, 324000, 72, 18][index],
    percent: [72, 28, 72, 18][index],
    status: ["正常", "正常", "达标", "上升"][index],
    note: `${type}统计用于预算执行驾驶舱。`,
  }));
}

function analyticsRows(tab) {
  return ["项目数量", "项目金额", "完成率", "延期率", "预算执行率", "供应商排行"].map((name, index) => ({
    id: `FX${String(index + 1).padStart(3, "0")}`,
    name,
    category: tab,
    amount: [38, 2860000, 76, 12, 68, 6][index],
    percent: [38, 86, 76, 12, 68, 42][index],
    status: ["正常", "正常", "达标", "预警", "正常", "正常"][index],
    note: `${tab}支持图表展示、导出和下钻。`,
  }));
}

function systemRows(type) {
  return ["基础配置", "权限配置", "流程规则", "预警规则"].map((name, index) => ({
    id: `${type}${String(index + 1).padStart(3, "0")}`,
    name: `${type}${name}`,
    type,
    role: ["管理员", "审核人", "财务人员", "申请人"][index],
    condition: ["全校", "部门内", "金额条件", "状态条件"][index],
    permission: ["菜单权限", "按钮权限", "数据权限", "字段权限"][index],
    status: ["启用", "启用", "启用", "停用"][index],
    note: `${type}模块配置项。`,
  }));
}

function renderNav() {
  els.navList.innerHTML = navGroups
    .map(
      (group) => `
      <div class="nav-group">
        <button class="nav-group-title" data-group="${group.title}">
          <span>${group.title}</span><span>${state.expanded[group.title] ? "⌃" : "⌄"}</span>
        </button>
        <div class="nav-children ${state.expanded[group.title] ? "" : "collapsed"}">
          ${group.children
            .map((item) => `<button class="nav-item ${state.active === item.id ? "active" : ""}" data-nav="${item.id}">${item.label}</button>`)
            .join("")}
        </div>
      </div>`
    )
    .join("");
  els.navList.querySelectorAll("[data-group]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.expanded[btn.dataset.group] = !state.expanded[btn.dataset.group];
      renderNav();
    });
  });
  els.navList.querySelectorAll("[data-nav]").forEach((btn) => btn.addEventListener("click", () => switchView(btn.dataset.nav)));
}

function switchView(id) {
  state.active = id;
  renderNav();
  render();
}

function render() {
  const page = currentPage();
  els.crumbText.textContent = page.crumb;
  els.pageTitle.textContent = page.title;
  els.dashboard.classList.toggle("hidden", !page.isWorkbench);
  els.moduleView.classList.toggle("hidden", page.isWorkbench);
  els.quickCreateBtn.textContent = page.addLabel;
  if (page.isWorkbench) renderWorkbench();
  else renderModule();
  updateTodo();
}

function renderWorkbench() {
  const totals = dashboardTotals();
  els.dashboard.innerHTML = `
    <div class="dashboard-grid">
      ${statCard("项目总数", totals.projects, "本月新增 6 个")}
      ${statCard("在建项目数", totals.active, "跨 3 所学校")}
      ${statCard("已完成项目数", totals.done, "本月完成 4 个")}
      ${statCard("已延期项目数", totals.delay, "需重点跟进")}
      ${statCard("项目总预算", money(totals.budget), "年度预算口径")}
      ${statCard("已支付金额", money(totals.paid), "付款执行")}
      ${statCard("剩余预算", money(totals.budget - totals.paid), "预算余额")}
      ${statCard("本月完成项目", totals.monthDone, "验收通过归档")}
    </div>
    <div class="workbench-layout">
      <section class="panel">
        <div class="panel-head"><h3>我的待办</h3><button class="text-btn" data-jump="project">查看审批</button></div>
        ${renderTodoList(state.data.workbench["我的待办"])}
      </section>
      <section class="panel">
        <div class="panel-head"><h3>预算执行驾驶舱</h3><button class="text-btn" data-jump="analytics">查看统计</button></div>
        ${renderBudgetCockpit()}
      </section>
      <section class="panel">
        <div class="panel-head"><h3>我的项目</h3><button class="text-btn" data-jump="project">进入项目</button></div>
        ${renderMiniTable(state.data.workbench["我的项目"])}
      </section>
      <section class="panel">
        <div class="panel-head"><h3>消息通知</h3><button class="text-btn" data-jump="system">消息设置</button></div>
        ${renderTodoList(state.data.workbench["消息通知"])}
      </section>
    </div>
  `;
  els.dashboard.querySelectorAll("[data-jump]").forEach((btn) => btn.addEventListener("click", () => switchView(btn.dataset.jump)));
}

function dashboardTotals() {
  const projects = state.data.project["项目申请"];
  const budget = projects.reduce((sum, item) => sum + Number(item.budget || 0), 0);
  const paid = state.data.payment["支付记录"].reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return {
    projects: projects.length,
    active: projects.filter((item) => item.status.includes("进行") || item.status.includes("审批")).length,
    done: projects.filter((item) => item.status.includes("通过") || item.status.includes("完成")).length,
    delay: projects.filter((item) => item.risk === "滞后" || item.risk === "风险").length,
    budget,
    paid,
    monthDone: 4,
  };
}

function statCard(label, value, sub) {
  return `<div class="stat-card"><span>${label}</span><strong>${value}</strong><em>${sub}</em></div>`;
}

function renderTodoList(rows) {
  return `<div class="todo-list">${rows
    .map(
      (row) => `<button class="todo-item" data-detail="${row.id}">
        <span>${row.name}</span><strong>${row.status}</strong><em>${row.project}</em>
      </button>`
    )
    .join("")}</div>`;
}

function renderBudgetCockpit() {
  const items = [
    ["预算执行率", 68],
    ["合同签订率", 74],
    ["付款完成率", 52],
    ["发票匹配率", 81],
  ];
  return `<div class="bars">${items
    .map(([name, value]) => `<div class="bar-row"><span>${name}</span><div class="bar"><i style="width:${value}%"></i></div><strong>${value}%</strong></div>`)
    .join("")}</div>`;
}

function renderModule() {
  const page = currentPage();
  const rows = filteredRows(page);
  els.moduleView.innerHTML = `
    ${renderFilters(page.filters)}
    ${page.module === "analytics" ? renderAnalyticsHeader(page.tab) : ""}
    <div class="table-toolbar">
      <h3>${page.title}列表</h3>
      <div class="table-actions">
        <button class="ghost-btn" data-export>导出</button>
        <button class="primary-btn" data-add>${page.addLabel}</button>
      </div>
    </div>
    ${renderTable(rows, columnsFor(rows))}
    ${renderPager(rows.length)}
  `;
  bindModuleEvents();
}

function currentPage() {
  return pageConfigs[state.active] || pageConfigs.workbench;
}

function renderFilters(filters) {
  return `<div class="filter-bar">${filters
    .map((name, index) => `<label>${name}：<input data-filter="${index}" placeholder="${filterPlaceholder(name)}" value="${state.filters[state.active]?.[index] || ""}" /></label>`)
    .join("")}<button class="primary-btn" data-query>查询</button><button class="ghost-btn" data-reset>重置</button></div>`;
}

function filterPlaceholder(name) {
  if (name.includes("日期") || name.includes("周期")) return "请选择";
  if (name.includes("状态") || name.includes("类型") || name.includes("类别")) return "请选择";
  return "请输入";
}

function renderAnalyticsHeader(tab) {
  if (tab !== "可视化大屏") return "";
  return `<div class="screen-grid">
    ${["项目状态分布", "年度资金执行情况", "月度新增趋势", "项目类型占比", "合同到期预警", "项目地图"].map((name, index) => `
      <div class="screen-card"><h4>${name}</h4><div class="mock-chart chart-${index + 1}">${[42, 68, 35, 76, 54].map((v) => `<i style="height:${v}%"></i>`).join("")}</div></div>
    `).join("")}
  </div>`;
}

function filteredRows(page) {
  const rows = state.data[page.module]?.[page.tab] || [];
  const filter = state.filters[state.active] || {};
  const keyword = Object.values(filter).filter(Boolean).join(" ");
  if (!keyword) return rows;
  return rows.filter((row) => JSON.stringify(row).includes(keyword));
}

function columnsFor(rows) {
  const preferred = ["id", "name", "project", "category", "type", "method", "supplier", "budget", "amount", "owner", "date", "status", "risk", "next"];
  const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  return preferred.filter((key) => keys.includes(key)).slice(0, 8);
}

function renderTable(rows, columns) {
  if (!rows.length) return `<div class="empty">暂无数据，请调整筛选条件或新增记录。</div>`;
  return `<div class="table-wrap"><table class="data-table">
    <thead><tr><th><input type="checkbox" /></th>${columns.map((key) => `<th>${labelMap[key] || key}</th>`).join("")}<th>操作</th></tr></thead>
    <tbody>${rows
      .map(
        (row) => `<tr>
          <td><input type="checkbox" /></td>
          ${columns.map((key) => `<td>${formatCell(key, row[key])}</td>`).join("")}
          <td class="op-cell">${rowActions(row).map((action) => `<button class="link-btn" data-action="${action}" data-id="${row.id}">${action}</button>`).join("")}</td>
        </tr>`
      )
      .join("")}</tbody>
  </table></div>`;
}

function formatCell(key, value) {
  if (value === undefined || value === null || value === "") return "--";
  if (["budget", "amount", "paid", "remain"].includes(key)) return money(value);
  if (key === "status" || key === "risk" || key === "result") return `<span class="status ${statusClass(value)}">${value}</span>`;
  return value;
}

function statusClass(value) {
  const text = String(value);
  if (text.includes("风险") || text.includes("滞后") || text.includes("到期") || text.includes("不通过") || text.includes("失败") || text.includes("缺失")) return "danger";
  if (text.includes("待") || text.includes("审批") || text.includes("退回") || text.includes("补")) return "pending";
  if (text.includes("完成") || text.includes("通过") || text.includes("支付") || text.includes("归档") || text.includes("正常")) return "done";
  return "active";
}

function rowActions() {
  const tab = currentPage().tab;
  const actions = ["详情", "编辑"];
  if (tab.includes("审批")) actions.push("审批通过", "驳回", "催办");
  if (tab.includes("进度")) actions.push("更新进度");
  if (tab.includes("履约")) actions.push("更新履约");
  if (tab.includes("预警")) actions.push("处理预警");
  if (tab.includes("财务审核")) actions.push("审核通过");
  if (tab.includes("OCR")) actions.push("OCR识别");
  if (tab.includes("验收意见")) actions.push("填写意见");
  if (tab.includes("整改")) actions.push("整改完成");
  if (tab.includes("归档")) actions.push("确认归档");
  if (tab.includes("校验")) actions.push("重新校验");
  return actions;
}

function renderMiniTable(rows) {
  return `<div class="mini-table">${rows
    .map((row) => `<div><span>${row.project}</span><strong>${row.status}</strong><em>${row.owner}</em></div>`)
    .join("")}</div>`;
}

function renderPager(total) {
  return `<div class="pager">
    <span class="pager-total">共 ${total} 条</span>
    <button class="pager-btn" disabled>‹</button>
    <button class="pager-btn active">1</button>
    <button class="pager-btn">2</button>
    <button class="pager-btn">3</button>
    <span class="pager-ellipsis">...</span>
    <button class="pager-btn">10</button>
    <button class="pager-btn">›</button>
    <select class="pager-size"><option>10 条/页</option><option>20 条/页</option><option>50 条/页</option></select>
    <span class="pager-jump">跳至</span>
    <input class="pager-input" />
    <span class="pager-jump">页</span>
  </div>`;
}

function bindModuleEvents() {
  els.moduleView.querySelector("[data-add]")?.addEventListener("click", () => openModal());
  els.moduleView.querySelector("[data-export]")?.addEventListener("click", () => showToast("已生成模拟导出任务"));
  els.moduleView.querySelector("[data-query]")?.addEventListener("click", () => {
    state.filters[state.active] = Object.fromEntries([...els.moduleView.querySelectorAll("[data-filter]")].map((input) => [input.dataset.filter, input.value]));
    renderModule();
  });
  els.moduleView.querySelector("[data-reset]")?.addEventListener("click", () => {
    state.filters[state.active] = {};
    renderModule();
  });
  els.moduleView.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => handleAction(btn.dataset.action, btn.dataset.id));
  });
}

function handleAction(action, id) {
  const row = findRow(id);
  if (!row) return showToast("当前记录不存在");
  if (action === "详情") return openDrawer(row);
  if (action === "编辑") return openModal(row);
  const map = {
    审批通过: "已通过",
    驳回: "已驳回",
    催办: "已催办",
    更新进度: "进行中",
    更新履约: "履约中",
    处理预警: "已处理",
    审核通过: "已支付",
    OCR识别: "已识别",
    填写意见: "通过",
    整改完成: "已完成",
    确认归档: "已归档",
    重新校验: "已通过",
  };
  requestConfirm({
    title: `确认${action}`,
    message: "该操作会更新当前记录状态，并同步刷新看板与列表数据。",
    summary: `业务页面：${currentPage().crumb}<br>当前记录：${row.name || row.project || row.id}<br>操作内容：${action}`,
    onConfirm: () => {
      row.status = map[action] || row.status;
      if (action === "填写意见") row.opinion = "通过";
      if (action === "整改完成") row.result = "已完成";
      render();
      showToast(`${action}已完成`);
    },
  });
}

function findRow(id) {
  const page = currentPage();
  const rows = state.data[page.module]?.[page.tab] || [];
  return rows.find((row) => row.id === id);
}

function openModal(row = null) {
  const page = currentPage();
  const module = page.isWorkbench ? "project" : page.module;
  const tab = page.isWorkbench ? "项目申请" : page.tab;
  const config = moduleConfigs[module];
  const addLabel = page.isWorkbench ? "新建项目" : page.addLabel;
  state.modal = { module, tab, row };
  els.modalTitle.textContent = row ? `编辑${page.isWorkbench ? config.title : page.title}` : addLabel;
  els.modalForm.innerHTML = buildForm(config.form || genericForm(), row);
  bindUploadBoxes();
  els.modalMask.classList.remove("hidden");
}

function genericForm() {
  return [
    field("name", "名称", "text", true),
    field("type", "类型", "select", true, ["项目", "预算", "合同", "采购", "发票", "验收", "系统"]),
    field("owner", "负责人", "text"),
    field("note", "说明", "textarea"),
  ];
}

function buildForm(fields, row) {
  return fields
    .map((item) => {
      const value = row ? row[item.key] || "" : "";
      const label = `<label>${item.required ? '<span class="required-star">*</span>' : ""}${item.label}</label>`;
      if (item.type === "textarea") {
        return `<div class="field wide" data-field="${item.key}">${label}<textarea name="${item.key}" data-required="${item.required}" placeholder="请输入${item.label}">${value}</textarea><div class="field-error">请填写${item.label}</div></div>`;
      }
      if (item.type === "select") {
        const options = optionsFor(item);
        return `<div class="field" data-field="${item.key}">${label}<select name="${item.key}" data-required="${item.required}"><option value="">请选择${item.label}</option>${options
          .map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`)
          .join("")}</select><div class="field-error">请选择${item.label}</div></div>`;
      }
      if (item.type === "upload") {
        return `<div class="field wide" data-field="${item.key}">${label}<input type="hidden" name="${item.key}" data-required="${item.required}" value="${value}" /><div class="upload-box ${value ? "has-file" : ""}" data-upload="${item.key}" data-label="${item.label}">${value || `点击上传${item.label}`}</div><div class="field-error">请上传${item.label}</div></div>`;
      }
      return `<div class="field" data-field="${item.key}">${label}<input type="${item.type}" name="${item.key}" data-required="${item.required}" value="${value}" placeholder="请输入${item.label}" /><div class="field-error">请填写${item.label}</div></div>`;
    })
    .join("");
}

function optionsFor(item) {
  if (item.options?.length) return item.options;
  if (item.key === "project") return baseProjects;
  if (item.key === "supplier") return suppliers;
  if (item.key === "contract") return ["HT20260701", "HT20260702", "HT20260703", "HT20260704"];
  return ["启用", "停用", "待审批", "已通过"];
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
  if (!state.modal) return;
  if (!validateForm()) return;
  const form = Object.fromEntries(new FormData(els.modalForm).entries());
  const module = state.modal.module;
  const tab = state.modal.tab;
  const rows = state.data[module][tab];
  if (state.modal.row) {
    Object.assign(state.modal.row, form);
  } else {
    rows.unshift({
      id: `${module.slice(0, 2).toUpperCase()}${Date.now().toString().slice(-6)}`,
      ...form,
      status: "待处理",
    });
  }
  els.modalMask.classList.add("hidden");
  state.modal = null;
  render();
  showToast("已保存，模拟数据已更新");
}

function validateForm() {
  let valid = true;
  els.modalForm.querySelectorAll("[data-required='true']").forEach((control) => {
    const wrapper = control.closest(".field");
    const empty = !String(control.value || "").trim();
    wrapper.classList.toggle("invalid", empty);
    if (empty) valid = false;
  });
  if (!valid) showToast("请先补全必填项");
  return valid;
}

function openDrawer(row) {
  const page = currentPage();
  els.drawerKicker.textContent = page.crumb;
  els.drawerTitle.textContent = row.name || row.project || row.id;
  els.drawerBody.innerHTML = `
    <div class="detail-grid">${Object.entries(row)
      .map(([key, value]) => `<div class="detail-item"><span>${labelMap[key] || key}</span><strong>${formatCell(key, value)}</strong></div>`)
      .join("")}</div>
    <div class="timeline">
      <div class="panel-title">项目时间轴</div>
      ${["立项申请", "审批流转", "采购合同", "付款发票", "验收结项"].map((name, index) => `<div class="timeline-item"><div class="timeline-date">2026-07-${10 + index}</div><div>${name}：${index < 2 ? "已完成" : "进行中"}</div></div>`).join("")}
    </div>
    <div class="timeline">
      <div class="panel-title">全过程资料中心</div>
      <div class="timeline-item"><div class="timeline-date">附件</div><div>${row.docs || "申请、审批、合同、发票、验收资料已关联"}</div></div>
      <div class="timeline-item"><div class="timeline-date">操作</div><div><button class="primary-btn" id="drawerAction">执行当前节点</button></div></div>
    </div>
  `;
  els.drawer.classList.remove("hidden");
  document.getElementById("drawerAction").addEventListener("click", () => {
    requestConfirm({
      title: "确认执行当前节点",
      message: "该操作会模拟推进当前业务节点。",
      summary: `当前记录：${row.name || row.project || row.id}`,
      onConfirm: () => showToast("当前节点已模拟完成"),
    });
  });
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
  const page = currentPage();
  const doc = buildPrd(page.module, page.tab);
  els.prdTitle.textContent = `${page.title} PRD`;
  els.prdBody.innerHTML = doc;
  els.prdMask.classList.remove("hidden");
}

function buildPrd(module, tab) {
  const config = moduleConfigs[module];
  const functions = config.tabs.map((name) => `<tr><td>${config.title}</td><td>${name}</td><td>支持${name}的数据登记、查询、详情查看、状态流转和资料关联。</td><td>${name === tab ? "P0" : "P1"}</td><td>原型使用前端模拟数据。</td></tr>`).join("");
  return `
    ${prdSection("1. 背景与目标", [`建设${config.title}能力，支撑教育行业项目全过程管理。`, `当前页面聚焦${tab}，用于覆盖申请、审批、执行、统计和归档闭环。`])}
    ${prdSection("2. 用户与使用场景", ["申请人提交业务资料，审核人处理审批节点，负责人更新进度，财务人员审核付款与发票，管理员维护流程和权限。"])}
    ${prdSection("3. 需求范围", ["In Scope：页面查询、新增、详情、状态流转、二次确认、附件模拟上传、PRD 与流程图查看。", "Out of Scope：真实后端、真实 OCR、真实短信邮件发送、真实 PDF/ZIP 文件生成。"])}
    <h3>4. 功能需求列表</h3><table class="prd-table"><thead><tr><th>功能模块</th><th>功能点</th><th>需求描述</th><th>优先级（P0 / P1 / P2）</th><th>备注说明</th></tr></thead><tbody>${functions}</tbody></table>
    ${prdSection("5. 核心流程与交互说明", [`用户进入${config.title}后，先通过标签页定位${tab}，再使用筛选、查看详情、新增或业务操作。`, "涉及审批、审核、更新、归档等关键动作时，必须弹出二次确认后才更新状态。"])}
    ${prdSection("6. 异常场景与边界条件", ["必填字段为空时阻止保存并高亮字段。", "筛选无结果时展示空状态，不隐藏页面结构。", "资料上传仅做模拟展示，不读取本地文件。"])}
    ${prdSection("7. 数据口径与埋点需求", ["看板统计来自前端模拟业务表。", "建议埋点：页面访问、查询、重置、新增、详情、审批确认、导出、PRD 查看、流程图查看。"])}
    ${prdSection("8. 风险、依赖与限制", ["当前为静态原型，不具备真实权限、数据持久化和接口联调能力。", "后续生产化依赖组织用户、流程引擎、附件服务、消息服务和财务接口。"])}
    ${prdSection("9. 验收标准", [`${config.title}下所有标签页可点击并显示业务数据。`, "新增弹窗必填标识仅在字段名前显示星号。", "关键动作均需二次确认并能看到状态变化。"])}
  `;
}

function prdSection(title, lines) {
  return `<h3>${title}</h3><ul>${lines.map((line) => `<li>${line}</li>`).join("")}</ul>`;
}

function openFlowChartModal() {
  const groups = [
    ["项目全过程", ["项目申请", "项目审批", "采购申请", "合同登记", "实施更新", "付款申请", "发票登记", "验收整改", "结项归档"]],
    ["审批操作流程", ["提交", "部门审核", "财务审核", "转交/加签/会签", "通过或驳回", "记录时间轴"]],
    ["采购业务流程", ["采购申请", "采购审批", "发布公告", "供应商报名", "开标评标", "确定中标", "签约", "到货验收"]],
    ["合同与付款流程", ["合同登记", "合同审批", "履约跟踪", "付款申请", "财务审核", "支付记录", "发票匹配"]],
    ["验收结项流程", ["验收申请", "材料提交", "验收意见", "整改复验", "自动校验", "项目归档", "PDF/ZIP导出"]],
    ["系统配置流程", ["组织用户", "角色权限", "流程节点", "表单字段", "字典规则", "消息模板", "日志审计"]],
  ];
  els.flowBody.innerHTML = groups.map(([title, steps]) => renderFlowGroup(title, steps)).join("");
  els.flowMask.classList.remove("hidden");
}

function renderFlowGroup(title, steps) {
  return `<section class="flow-group"><div class="flow-group-head"><h3>${title}</h3><span>${steps.length} 个节点</span></div><div class="flow-track">${steps
    .map((step, index) => `<div class="flow-node ${index === 0 ? "start" : index === steps.length - 1 ? "end" : index % 3 === 0 ? "decision" : ""}"><b>${index + 1}</b><span>${step}</span></div>${index < steps.length - 1 ? '<i class="flow-arrow">→</i>' : ""}`)
    .join("")}</div></section>`;
}

function money(value) {
  return `¥${Number(value || 0).toLocaleString("zh-CN")}`;
}

function updateTodo() {
  const count = Object.values(state.data)
    .flatMap((tabs) => Object.values(tabs))
    .flat()
    .filter((row) => String(row.status || "").includes("待") || String(row.status || "").includes("审批")).length;
  els.todoCount.textContent = count;
}

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  toastTimer = setTimeout(() => els.toast.classList.add("hidden"), 2200);
}

function bindGlobalEvents() {
  els.quickCreateBtn.addEventListener("click", () => openModal());
  els.approvalBtn.addEventListener("click", () => {
    switchView(pageId("project", "项目审批"));
  });
  els.modalClose.addEventListener("click", () => els.modalMask.classList.add("hidden"));
  els.modalCancel.addEventListener("click", () => els.modalMask.classList.add("hidden"));
  els.modalSave.addEventListener("click", saveModal);
  els.prdDotBtn.addEventListener("click", openPrdModal);
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
switchView("workbench");
