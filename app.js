const navItems = [
  { id: "dashboard", label: "业务看板" },
  { id: "projects", label: "项目立项" },
  { id: "purchase", label: "采购管理" },
  { id: "contracts", label: "合同管理" },
  { id: "progress", label: "项目进度" },
  { id: "payments", label: "付款申请" },
  { id: "invoices", label: "发票管理" },
  { id: "acceptance", label: "验收管理" },
  { id: "archive", label: "结项归档" },
  { id: "settings", label: "系统管理" },
];

const state = {
  active: "dashboard",
  modalModule: null,
  modalItemId: null,
  tabs: {},
  filters: {},
  projects: [
    {
      id: "P20260701001",
      name: "智慧教室多媒体设备采购",
      type: "教育教学设备采购",
      purpose: "提升公共教学楼互动授课能力",
      goal: "完成 18 间智慧教室设备更新",
      cycle: "2026-07 至 2026-11",
      budget: 480000,
      dept: "教务处",
      owner: "沈志彬",
      status: "待审核",
      risk: "正常",
      material: "立项论证表.pdf",
      approval: ["申请人提交", "教务处审核", "财务处预算审核", "分管校领导审批"],
    },
    {
      id: "P20260701002",
      name: "化学实验耗材补充项目",
      type: "教学用具补充",
      purpose: "保障秋季实验课程耗材供应",
      goal: "完成 32 类耗材采购入库",
      cycle: "2026-07 至 2026-08",
      budget: 86000,
      dept: "实验教学中心",
      owner: "杨剑兴",
      status: "进行中",
      risk: "滞后",
      material: "耗材清单.xlsx",
      approval: ["申请人提交", "实验中心审核", "资产处审核"],
    },
    {
      id: "P20260618003",
      name: "图书馆教学参考书采购",
      type: "教育教学设备采购",
      purpose: "补充专业课程参考资料",
      goal: "采购 2100 册图书并完成编目",
      cycle: "2026-06 至 2026-09",
      budget: 160000,
      dept: "图书馆",
      owner: "张俊源",
      status: "已通过",
      risk: "正常",
      material: "书目清单.xlsx",
      approval: ["申请人提交", "图书馆审核", "财务处审核"],
    },
  ],
  purchase: [
    {
      id: "CG202607001",
      project: "智慧教室多媒体设备采购",
      type: "公开招标",
      budget: 480000,
      method: "公开招标",
      planDate: "2026-07-12",
      announce: "2026-07-03",
      deadline: "2026-07-18",
      supplier: "待确定",
      status: "招标中",
    },
    {
      id: "CG202607002",
      project: "化学实验耗材补充项目",
      type: "询价",
      budget: 86000,
      method: "询价",
      planDate: "2026-07-05",
      announce: "2026-07-01",
      deadline: "2026-07-06",
      supplier: "青澜教学设备有限公司",
      status: "已定标",
    },
  ],
  contracts: [
    {
      id: "HT202607001",
      project: "化学实验耗材补充项目",
      partner: "青澜教学设备有限公司",
      amount: 82800,
      signDate: "2026-07-08",
      period: "2026-07-08 至 2026-08-20",
      status: "已生效",
      file: "耗材采购合同.pdf",
    },
    {
      id: "HT202606006",
      project: "图书馆教学参考书采购",
      partner: "华文书业集团",
      amount: 152400,
      signDate: "2026-06-25",
      period: "2026-06-25 至 2026-09-15",
      status: "已生效",
      file: "图书采购合同.pdf",
    },
  ],
  progress: [
    {
      id: "J202607001",
      project: "智慧教室多媒体设备采购",
      month: "2026-07",
      owner: "沈志彬",
      percent: "30%",
      update: "已发布招标公告，等待投标截止",
      risk: "正常",
      material: "招标公告截图.png",
    },
    {
      id: "J202607002",
      project: "化学实验耗材补充项目",
      month: "2026-07",
      owner: "杨剑兴",
      percent: "45%",
      update: "合同已签订，部分耗材待入库",
      risk: "滞后",
      material: "到货照片.zip",
    },
  ],
  payments: [
    {
      id: "FK202607001",
      project: "化学实验耗材补充项目",
      contract: "HT202607001",
      stage: "首付款",
      amount: 41400,
      voucher: "阶段验收单.pdf",
      invoice: "已上传",
      status: "财务审核中",
    },
  ],
  invoices: [
    {
      id: "FP202607001",
      code: "031002600711",
      number: "24568219",
      project: "化学实验耗材补充项目",
      contract: "HT202607001",
      amount: 41400,
      date: "2026-07-15",
      status: "已匹配",
      file: "发票扫描件.pdf",
    },
  ],
  acceptance: [
    {
      id: "YS202607001",
      project: "化学实验耗材补充项目",
      time: "2026-08-22",
      members: "实验中心、教务处、资产处",
      opinion: "有条件通过",
      rectification: "补齐 2 类耗材检测报告，2026-08-30 前完成",
      status: "待整改",
      file: "验收清单.xlsx",
    },
    {
      id: "YS202606006",
      project: "图书馆教学参考书采购",
      time: "2026-09-12",
      members: "图书馆、教务处、资产处",
      opinion: "通过",
      rectification: "无",
      status: "已通过",
      file: "验收报告.pdf",
    },
  ],
  archive: [
    {
      id: "GD202606006",
      project: "图书馆教学参考书采购",
      docs: "申请、审批、合同、发票、验收报告",
      result: "已结项",
      archiveDate: "2026-09-18",
      owner: "张俊源",
    },
  ],
  settings: [
    {
      id: "LC001",
      name: "小额教具采购流程",
      condition: "预算小于 100000",
      nodes: "部门负责人 / 资产处",
      role: "申请人、审核人、负责人",
      status: "启用",
    },
    {
      id: "LC002",
      name: "大额仪器采购流程",
      condition: "预算大于等于 100000",
      nodes: "部门负责人 / 财务处 / 分管校领导",
      role: "申请人、审核人、财务、管理员",
      status: "启用",
    },
  ],
};

const configs = {
  projects: {
    title: "项目立项",
    tabs: ["项目申请", "审批管理"],
    addLabel: "新建项目",
    filters: ["项目名称", "项目类型", "责任单位", "状态"],
    columns: [
      ["id", "项目编号"],
      ["name", "项目名称"],
      ["type", "项目类型"],
      ["budget", "预算金额"],
      ["dept", "责任单位"],
      ["owner", "负责人"],
      ["cycle", "项目周期"],
      ["status", "状态"],
      ["risk", "风险"],
    ],
  },
  purchase: {
    title: "采购管理",
    tabs: ["采购记录", "进程跟踪"],
    addLabel: "登记采购",
    filters: ["项目名称", "采购方式", "供应商", "状态"],
    columns: [
      ["id", "采购编号"],
      ["project", "采购项目"],
      ["method", "采购方式"],
      ["budget", "预算金额"],
      ["planDate", "计划采购时间"],
      ["announce", "公告发布时间"],
      ["deadline", "投标截止时间"],
      ["supplier", "供应商"],
      ["status", "状态"],
    ],
  },
  contracts: {
    title: "合同管理",
    tabs: ["合同台账", "履约提醒"],
    addLabel: "录入合同",
    filters: ["项目名称", "合作方", "合同状态", "签订日期"],
    columns: [
      ["id", "合同编号"],
      ["project", "关联项目"],
      ["partner", "合作方"],
      ["amount", "合同金额"],
      ["signDate", "签订日期"],
      ["period", "履约期限"],
      ["file", "扫描件"],
      ["status", "状态"],
    ],
  },
  progress: {
    title: "项目进度",
    tabs: ["月度更新", "变更管理"],
    addLabel: "更新进度",
    filters: ["项目名称", "负责人", "月份", "风险状态"],
    columns: [
      ["id", "记录编号"],
      ["project", "项目名称"],
      ["month", "更新月份"],
      ["owner", "负责人"],
      ["percent", "完成比例"],
      ["update", "进展说明"],
      ["material", "过程材料"],
      ["risk", "风险状态"],
    ],
  },
  payments: {
    title: "付款申请",
    tabs: ["付款申请", "财务审核"],
    addLabel: "发起付款",
    filters: ["项目名称", "合同编号", "付款阶段", "状态"],
    columns: [
      ["id", "付款编号"],
      ["project", "项目名称"],
      ["contract", "合同编号"],
      ["stage", "付款阶段"],
      ["amount", "申请金额"],
      ["voucher", "验收凭证"],
      ["invoice", "发票"],
      ["status", "状态"],
    ],
  },
  invoices: {
    title: "发票管理",
    tabs: ["发票明细", "预算匹配统计"],
    addLabel: "登记发票",
    filters: ["项目名称", "发票号码", "时间段", "匹配状态"],
    columns: [
      ["id", "登记编号"],
      ["code", "发票代码"],
      ["number", "发票号码"],
      ["project", "对应项目"],
      ["contract", "对应合同"],
      ["amount", "金额"],
      ["date", "开票日期"],
      ["status", "状态"],
    ],
  },
  acceptance: {
    title: "验收管理",
    tabs: ["验收申请", "意见收集"],
    addLabel: "提交验收",
    filters: ["项目名称", "验收意见", "整改状态", "验收时间"],
    columns: [
      ["id", "验收编号"],
      ["project", "项目名称"],
      ["time", "验收时间"],
      ["members", "参与人员"],
      ["opinion", "验收意见"],
      ["rectification", "整改要求"],
      ["file", "验收材料"],
      ["status", "状态"],
    ],
  },
  archive: {
    title: "结项归档",
    tabs: ["项目结项", "基础档案"],
    addLabel: "生成归档",
    filters: ["项目名称", "归档状态", "负责人", "归档日期"],
    columns: [
      ["id", "归档编号"],
      ["project", "项目名称"],
      ["docs", "归档资料"],
      ["result", "结项状态"],
      ["archiveDate", "归档日期"],
      ["owner", "负责人"],
    ],
  },
  settings: {
    title: "系统管理",
    tabs: ["角色权限", "流程配置", "申请模板"],
    addLabel: "新增流程",
    filters: ["流程名称", "金额条件", "审核角色", "状态"],
    columns: [
      ["id", "配置编号"],
      ["name", "配置名称"],
      ["condition", "适用条件"],
      ["nodes", "审批节点"],
      ["role", "角色权限"],
      ["status", "状态"],
    ],
  },
};

const prdDocs = {
  dashboard: {
    title: "业务看板 PRD 产品开发规则",
    owner: "校级管理员 / 项目管理办公室",
    version: "V1.0",
    update: "2026-07-02",
    priority: "高",
    sections: [
      ["页面目标", ["汇总教学采购项目全生命周期关键指标，帮助管理人员快速识别待办、风险、付款与验收状态。", "首页必须在 3 秒内让用户判断当前待处理事项数量、滞后项目和资金风险。"]],
      ["核心数据规则", ["立项总数来自项目立项模块，待办审核来自项目状态为待审核和验收待整改的记录。", "采购进行中统计招标中、进行中、待定标的采购记录。", "付款待审核金额统计付款申请中处于财务审核中的申请金额。"]],
      ["交互规则", ["点击待办审核进入项目立项审批列表。", "点击查看进度进入项目进度模块。", "点击查看发票进入发票管理模块。", "所有看板数据使用模块数据实时刷新，不单独维护。"]],
      ["异常与权限", ["普通申请人仅能查看本人项目相关指标。", "管理员可查看全校统计，财务角色可查看付款和发票金额。", "若无数据，卡片显示 0 并保留说明文案，不隐藏模块。"]],
    ],
  },
  projects: {
    title: "项目立项 PRD 产品开发规则",
    owner: "申请人 / 审核人 / 管理员",
    version: "V1.0",
    update: "2026-07-02",
    priority: "高",
    sections: [
      ["页面目标", ["支持教学直接相关项目在线申请、材料上传、审批节点查看和审批处理。", "覆盖教育教学设备采购、教学用具补充、图书资料等基础项目类型。"]],
      ["字段规则", ["项目名称、项目类型、预算金额、责任单位、负责人、项目周期、项目目的、预期目标为必填。", "支撑材料为非必填，但预算大于等于 100000 时建议上传论证材料。", "预算金额必须为大于 0 的数字，项目周期不得早于申请日期。"]],
      ["流程规则", ["提交后状态为待审核，系统按项目类型和金额匹配审批流程。", "小额教具默认走责任单位、资产处审核；大额仪器默认走责任单位、财务处、分管校领导审核。", "审批通过后允许进入采购管理，不通过则退回申请人修改。"]],
      ["权限与异常", ["申请人可新增、编辑草稿、查看本人项目。", "审核人仅处理分配到本节点的项目。", "管理员可查看所有项目并调整审批节点。", "缺少必填项时禁止保存并显示字段级错误。"]],
    ],
  },
  purchase: {
    title: "采购管理 PRD 产品开发规则",
    owner: "采购负责人 / 资产处 / 管理员",
    version: "V1.0",
    update: "2026-07-02",
    priority: "高",
    sections: [
      ["页面目标", ["登记采购项目基础信息，跟踪公告、投标截止、定标等关键节点。", "采购状态需要同步影响关联项目进度。"]],
      ["字段规则", ["采购项目、采购方式、预算金额、计划采购时间为必填。", "供应商在定标前可为空或显示待确定，定标后必须填写中标单位。", "采购方式限定为公开招标、询价、竞争性谈判、单一来源等。"]],
      ["流程规则", ["新登记采购默认进入招标中或询价中。", "更新进程时可记录公告发布时间、投标截止时间、中标单位确定时间。", "采购完成后同步项目进度为采购已完成。"]],
      ["查询与追溯", ["支持按项目名称、采购时间、供应商、采购方式查询。", "所有采购状态变更应保留时间、操作人和说明。", "预算金额不得超过项目立项批准预算。"]],
    ],
  },
  contracts: {
    title: "合同管理 PRD 产品开发规则",
    owner: "合同管理员 / 项目负责人 / 财务",
    version: "V1.0",
    update: "2026-07-02",
    priority: "高",
    sections: [
      ["页面目标", ["维护合同编号、合作方、金额、签订日期、履约期限和扫描件。", "为付款、验收、结项提供合同依据。"]],
      ["字段规则", ["合同编号、关联项目、合作方、合同金额、签订日期、履约期限、合同扫描件为必填。", "合同金额不得大于关联项目预算。", "履约期限结束日期必须晚于签订日期。"]],
      ["状态规则", ["合同状态包括待签订、已生效、已终止。", "已生效合同可发起付款申请；已终止合同不可新增付款。", "履约到期前 15 天触发提醒。"]],
      ["权限与归档", ["合同管理员可录入和编辑合同。", "项目负责人可查看本项目合同。", "合同扫描件必须进入项目档案归档清单。"]],
    ],
  },
  progress: {
    title: "项目进度 PRD 产品开发规则",
    owner: "任务负责人 / 审核人 / 管理员",
    version: "V1.0",
    update: "2026-07-02",
    priority: "高",
    sections: [
      ["页面目标", ["支持负责人按月更新项目进展、上传过程材料、标记风险。", "滞后任务需要醒目标红并进入看板提醒。"]],
      ["字段规则", ["项目名称、更新月份、负责人、完成比例、进展说明为必填。", "过程材料为非必填，但关键节点如招标公告、到货验收建议上传。", "完成比例应为 0% 至 100%。"]],
      ["变更规则", ["范围、周期、预算调整属于项目变更。", "变更必须说明原因，并经原审批节点同意后更新计划。", "变更通过后保留原计划和新计划对比。"]],
      ["风险规则", ["当计划日期晚于当前进度超过 15 天时标记滞后。", "滞后记录在表格中使用红色状态，并同步业务看板。", "连续两个月滞后时提醒管理员介入。"]],
    ],
  },
  payments: {
    title: "付款申请 PRD 产品开发规则",
    owner: "项目负责人 / 财务审核人",
    version: "V1.0",
    update: "2026-07-02",
    priority: "高",
    sections: [
      ["页面目标", ["按项目进度发起付款申请，上传验收凭证和发票，财务在线审核支付。", "付款状态要与合同、发票、验收结果联动。"]],
      ["字段规则", ["项目名称、合同编号、付款阶段、申请金额、验收凭证、发票为必填。", "申请金额不得超过合同剩余可支付金额。", "付款阶段包括首付款、进度款、尾款。"]],
      ["审核规则", ["财务审核需核对合同状态、验收凭证、发票匹配结果。", "审核通过后状态变为已支付，并记录支付时间。", "审核驳回需填写驳回原因并退回申请人。"]],
      ["风控规则", ["未上传发票或验收凭证时禁止提交。", "验收不通过项目不得发起尾款。", "累计付款金额超过合同金额时系统必须阻断。"]],
    ],
  },
  invoices: {
    title: "发票管理 PRD 产品开发规则",
    owner: "财务 / 项目负责人",
    version: "V1.0",
    update: "2026-07-02",
    priority: "中高",
    sections: [
      ["页面目标", ["登记发票代码、号码、金额、开票日期、对应项目及合同，上传扫描件。", "提供按项目和时间段查询统计，校验发票金额与预算匹配情况。"]],
      ["字段规则", ["发票代码、发票号码、对应项目、对应合同、金额、开票日期、发票扫描件为必填。", "同一发票代码和号码不可重复登记。", "发票金额必须大于 0。"]],
      ["匹配规则", ["发票必须绑定有效合同。", "发票累计金额不得超过合同金额。", "发票项目必须与合同关联项目一致。"]],
      ["统计规则", ["支持按项目、时间段、匹配状态查询。", "统计项包括发票总金额、合同金额、预算金额、差额。", "超预算或未匹配发票需要高亮提醒。"]],
    ],
  },
  acceptance: {
    title: "验收管理 PRD 产品开发规则",
    owner: "验收组 / 项目负责人 / 管理员",
    version: "V1.0",
    update: "2026-07-02",
    priority: "高",
    sections: [
      ["页面目标", ["提交验收材料、记录验收时间和参与人员，收集验收意见。", "验收结果作为付款和结项归档依据。"]],
      ["字段规则", ["项目名称、验收时间、参与人员、验收意见、验收材料为必填。", "整改要求在有条件通过或不通过时必填。", "验收材料包括验收报告、验收清单、现场记录等。"]],
      ["意见规则", ["验收意见包括通过、有条件通过、不通过。", "有条件通过必须填写整改时限。", "不通过项目不可发起尾款和结项。"]],
      ["归档规则", ["验收通过后自动关联项目档案。", "验收报告、清单、意见记录必须进入结项资料。", "整改完成后需要保留整改前后说明。"]],
    ],
  },
  archive: {
    title: "结项归档 PRD 产品开发规则",
    owner: "项目管理办公室 / 档案管理员",
    version: "V1.0",
    update: "2026-07-02",
    priority: "中高",
    sections: [
      ["页面目标", ["在验收通过后完成项目结项和基础档案归档。", "统一归档申请、审批、合同、发票、验收报告等核心资料。"]],
      ["归档条件", ["项目验收状态必须为已通过。", "合同、发票、付款记录、验收材料齐全后才能标记已结项。", "存在整改未完成时禁止结项。"]],
      ["档案规则", ["档案清单至少包括立项申请、审批记录、合同、发票、验收报告。", "归档后资料不可直接删除，只允许追加补充材料。", "归档编号按年度和项目顺序生成。"]],
      ["查询规则", ["支持按项目名称、归档状态、负责人、归档日期查询。", "管理员可下载档案目录，普通负责人仅查看本人项目档案。"]],
    ],
  },
  settings: {
    title: "系统管理 PRD 产品开发规则",
    owner: "系统管理员",
    version: "V1.0",
    update: "2026-07-02",
    priority: "高",
    sections: [
      ["页面目标", ["维护基础角色权限、审批流程配置和申请模板字段。", "管理员可按项目类型或金额调整审批节点和审核角色。"]],
      ["角色规则", ["基础角色包括申请人、审核人、负责人、财务、管理员。", "申请人可提交和查看本人项目。", "审核人处理授权节点，管理员拥有全局配置权限。"]],
      ["流程规则", ["流程可按项目类型、预算金额区间配置。", "每个流程至少包含一个审核节点。", "流程启用后影响新提交申请，历史项目保留原流程。"]],
      ["模板规则", ["申请模板字段可配置显示、必填、默认值和说明。", "删除字段前需确认无进行中项目依赖。", "模板变更需要记录变更人、时间和原因。"]],
    ],
  },
};

const flowChartDocs = {
  business: [
    {
      title: "全生命周期总流程",
      note: "覆盖从立项到采购、合同、进度、付款、发票、验收、结项归档的业务闭环。",
      nodes: [
        ["项目立项申请", "start"],
        ["审批管理", "decision"],
        ["采购管理", ""],
        ["合同管理", ""],
        ["项目进度更新", ""],
        ["付款申请 / 发票管理", ""],
        ["验收管理", "decision"],
        ["结项归档", "end"],
        ["项目档案", "end"],
      ],
    },
    {
      title: "项目立项与审批流程",
      note: "根据项目类型和预算金额自动匹配审批节点。",
      nodes: [["填写项目信息", "start"], ["上传支撑材料", ""], ["提交申请", ""], ["匹配审批流程", "decision"], ["责任单位审核", ""], ["财务/领导审批", ""], ["生成正式项目", "end"]],
    },
    {
      title: "采购管理流程",
      note: "跟踪公告、投标截止、定标、供应商确认等关键采购节点。",
      nodes: [["关联已通过项目", "start"], ["登记采购信息", ""], ["选择采购方式", "decision"], ["发布公告/询价", ""], ["投标截止", ""], ["确定中标/成交单位", ""], ["同步项目进度", "end"]],
    },
    {
      title: "合同管理流程",
      note: "合同生效后开放付款、发票和履约提醒。",
      nodes: [["选择采购项目", "start"], ["录入合同信息", ""], ["上传扫描件", ""], ["判断合同状态", "decision"], ["合同生效", ""], ["履约提醒", ""], ["开放付款申请", "end"]],
    },
    {
      title: "项目进度、变更与付款流程",
      note: "进度滞后触发预警，变更需回到原审批节点确认。",
      nodes: [["月度更新", "start"], ["上传过程材料", ""], ["判断是否滞后", "decision"], ["变更审批", "decision"], ["发起付款", ""], ["财务审核", ""], ["支付完成", "end"]],
    },
    {
      title: "发票管理流程",
      note: "发票登记后校验重复、金额、项目合同一致性。",
      nodes: [["录入发票信息", "start"], ["关联项目合同", ""], ["上传扫描件", ""], ["系统校验", "decision"], ["预算匹配统计", ""], ["供付款审核调用", "end"]],
    },
    {
      title: "验收与结项流程",
      note: "验收通过后作为付款和结项依据，有条件通过进入整改复验。",
      nodes: [["提交验收申请", "start"], ["上传验收材料", ""], ["验收组填写意见", "decision"], ["整改反馈", "risk"], ["验收通过", ""], ["基础档案归档", ""], ["项目结项", "end"]],
    },
    {
      title: "系统管理流程",
      note: "配置角色权限、流程节点、申请模板，并影响新提交业务。",
      nodes: [["进入系统管理", "start"], ["选择配置类型", "decision"], ["角色权限", ""], ["流程配置", ""], ["申请模板", ""], ["保存启用", ""], ["影响新业务", "end"]],
    },
  ],
  operations: [
    { title: "新增业务记录操作流程", steps: ["点击新增", "填写必填字段", "选择日期/单选项", "上传材料", "保存", "刷新列表"] },
    { title: "查询筛选操作流程", steps: ["输入查询条件", "点击查询", "查看列表", "重置条件", "导出报表"] },
    { title: "详情查看操作流程", steps: ["点击详情", "打开右侧抽屉", "查看基础信息", "查看流程记录", "执行关联操作"] },
    { title: "审批处理操作流程", steps: ["进入审批页签", "查看待审记录", "点击审核", "状态通过", "同步待办数量"] },
    { title: "采购进程操作流程", steps: ["进入进程跟踪", "点击更新进程", "维护供应商", "状态定标", "进入合同管理"] },
    { title: "付款审核操作流程", steps: ["进入财务审核", "核对合同", "核对发票", "核对验收凭证", "通过支付"] },
    { title: "验收整改操作流程", steps: ["进入意见收集", "查看整改要求", "点击通过", "归档验收结果", "进入结项"] },
    { title: "PRD 查看操作流程", steps: ["点击右上角绿点", "查看当前页 PRD", "滚动阅读规则", "关闭弹窗"] },
  ],
};

Object.assign(prdDocs, {
  dashboard: {
    title: "业务看板 PRD 产品开发规则",
    owner: "校级管理员 / 项目管理办公室 / 财务负责人",
    version: "V1.1",
    update: "2026-07-06",
    priority: "高",
    sections: [
      ["1. 页面定位", ["作为系统默认首页，集中呈现教学采购项目从立项、采购、合同、进度、付款、发票、验收到归档的全生命周期概况。", "用于帮助管理层快速识别待办审批、进度滞后、付款审核、发票匹配和验收整改等高优先级事项。"]],
      ["2. 用户角色", ["校级管理员可查看全量项目统计和所有风险提醒。", "项目负责人仅查看本人负责项目的进度、付款、验收和归档状态。", "财务人员可查看付款待审、发票匹配、合同金额和预算风险。"]],
      ["3. 核心指标", ["立项总数统计项目主档中所有有效项目，排除删除、作废记录。", "待办审核统计项目待审核、付款财务审核中、验收待整改等需要人工处理的事项。", "采购进行中统计采购状态为招标中、询价中、待定标、合同待签的项目。", "付款待审核金额统计付款申请中处于财务审核中的申请金额总和。"]],
      ["4. 数据联动", ["项目立项审批通过后同步增加项目总数和采购入口数据。", "进度记录标记为滞后后同步进入业务看板风险提醒。", "验收有条件通过或待整改时进入待处理事项。", "发票金额与合同或预算不匹配时进入财务风险提醒。"]],
      ["5. 交互规则", ["点击待办审核进入项目立项或相关待办模块。", "点击查看进度进入项目进度模块并保留当前筛选上下文。", "点击查看发票进入发票管理模块。", "点击右上角绿色小点打开当前页面 PRD 规则弹窗。"]],
      ["6. 权限规则", ["非管理员用户只可看到授权范围内的项目统计。", "金额类指标对无财务权限用户隐藏或脱敏展示。", "PRD 规则弹窗所有角色可查看，但系统管理配置说明仅管理员可执行。"]],
      ["7. 异常规则", ["无数据时卡片展示 0，保留模块入口，不显示空白页面。", "统计数据加载失败时保留上一次成功数据并提示刷新。", "跨模块数据不一致时以项目主档和审批记录为准。"]],
      ["8. 验收标准", ["首页 3 秒内可识别项目总量、待办数、风险数和付款金额。", "看板任一入口点击后必须跳转到对应业务模块。", "刷新页面后模拟数据可重新渲染且无脚本错误。"]],
    ],
  },
  projects: {
    title: "项目立项 PRD 产品开发规则",
    owner: "申请人 / 审核人 / 项目负责人 / 管理员",
    version: "V1.1",
    update: "2026-07-06",
    priority: "高",
    sections: [
      ["1. 页面定位", ["支持教学直接相关项目在线申请、支撑材料上传、审批流程查看、审批处理和项目主档生成。", "适用项目包括教育教学设备采购、实验仪器、图书资料、教具学具耗材补充等。"]],
      ["2. 用户角色", ["申请人可新增项目申请、编辑草稿、查看本人提交记录。", "审核人可查看并处理分配到当前审批节点的项目。", "管理员可查看所有项目、调整审批节点、维护模板和流程。", "项目负责人可查看项目审批进度和后续业务状态。"]],
      ["3. 字段规则", ["必填字段：项目名称、项目类型、预算金额、责任单位、负责人、项目周期、项目目的、预期目标。", "非必填字段：支撑材料；但预算大于等于 100000 时应提示建议上传论证材料。", "预算金额必须为大于 0 的数字；项目周期结束日期不得早于开始日期。", "必填标识只在字段名前显示红色星号，不展示“必填/非必填”文字标签。"]],
      ["4. 流程规则", ["申请提交后状态进入待审核。", "系统根据项目类型和金额匹配审批流程。", "小额教具或耗材默认经过责任单位、资产处审核。", "大额仪器或设备默认经过责任单位、财务处、分管校领导审核。", "审批通过后生成正式项目并开放采购登记。"]],
      ["5. 状态规则", ["草稿：申请人可编辑和删除。", "待审核：申请人不可修改核心字段，审核人可处理。", "已通过：进入采购管理，可作为采购记录关联对象。", "已驳回：申请人可修改后重新提交。", "已归档：只读查看。"]],
      ["6. 校验规则", ["提交或保存时必须校验所有必填字段。", "缺少必填项时保留弹窗并显示字段级错误。", "预算金额超过流程阈值时自动切换大额流程。", "项目名称在同一责任单位内建议唯一，重复时给出提醒。"]],
      ["7. 权限规则", ["申请人只能编辑本人草稿或驳回记录。", "审核人只能处理当前节点授权项目。", "管理员可代查看、配置流程，不默认代审批。"]],
      ["8. 数据联动", ["审批通过后写入项目主档并同步业务看板。", "项目预算作为采购、合同、付款和发票校验上限。", "审批记录进入项目档案，作为结项归档材料。"]],
      ["9. 验收标准", ["新增、编辑、详情、流程查看、审核动作均可点击。", "任一新增弹窗的必填项只显示星号，无“必填/非必填”文字。", "审批通过后项目状态和待办数量同步变化。"]],
    ],
  },
  purchase: {
    title: "采购管理 PRD 产品开发规则",
    owner: "采购负责人 / 资产处 / 项目负责人 / 管理员",
    version: "V1.1",
    update: "2026-07-06",
    priority: "高",
    sections: [
      ["1. 页面定位", ["登记采购项目基础信息，跟踪公告、投标截止、定标、供应商确认等采购节点。", "采购记录必须关联已通过立项项目，作为合同录入前置依据。"]],
      ["2. 用户角色", ["采购负责人可新增采购记录、更新采购进程、维护供应商信息。", "项目负责人可查看本项目采购状态。", "管理员可查看全部采购记录并修正异常数据。"]],
      ["3. 字段规则", ["必填字段：采购项目、采购方式、预算金额、计划采购时间。", "条件必填字段：中标/成交供应商在定标后必填；公告时间在公开招标时必填。", "采购方式包括公开招标、询价、竞争性谈判、单一来源等。", "预算金额不得超过立项批准预算。"]],
      ["4. 流程规则", ["选择已通过项目后登记采购基础信息。", "按采购方式记录公告、询价或采购依据。", "维护投标截止时间和中标单位确定时间。", "定标后采购状态更新为已定标，并允许进入合同管理。"]],
      ["5. 状态规则", ["待采购：已登记但未发布公告或询价。", "招标中/询价中：已进入采购执行。", "已定标：已确认供应商。", "已取消：采购终止，不允许生成合同。"]],
      ["6. 校验规则", ["采购项目必须来自已通过项目主档。", "计划采购时间不得早于项目审批通过时间。", "公开招标必须维护公告发布时间和投标截止时间。", "定标时必须填写供应商。"]],
      ["7. 查询规则", ["支持按项目名称、采购时间、供应商、采购方式、状态查询。", "查询结果可导出，导出内容包含进程节点和供应商。"]],
      ["8. 数据联动", ["采购进度更新后同步项目进度模块。", "已定标记录可作为合同管理的来源数据。", "采购预算参与合同金额和发票金额校验。"]],
      ["9. 验收标准", ["采购记录、进程跟踪页签均可切换。", "详情、编辑、更新进程、追踪动作均可点击。", "采购状态更新后表格与详情抽屉同步刷新。"]],
    ],
  },
  contracts: {
    title: "合同管理 PRD 产品开发规则",
    owner: "合同管理员 / 项目负责人 / 财务人员 / 管理员",
    version: "V1.1",
    update: "2026-07-06",
    priority: "高",
    sections: [
      ["1. 页面定位", ["维护采购合同核心信息、扫描件、履约期限和合同状态。", "合同数据作为付款申请、发票匹配、验收结项的关键依据。"]],
      ["2. 用户角色", ["合同管理员可录入和编辑合同。", "项目负责人可查看本项目合同履约情况。", "财务人员可查看合同金额、付款节点和发票匹配信息。", "管理员可查看全量合同并处理异常状态。"]],
      ["3. 字段规则", ["必填字段：合同编号、关联项目、合作方、合同金额、签订日期、履约期限、合同扫描件。", "合同金额必须大于 0 且不得超过项目预算。", "履约期限结束日期必须晚于签订日期。", "合同编号应全局唯一。"]],
      ["4. 流程规则", ["采购已定标后可录入合同。", "合同扫描件上传后可标记已生效。", "已生效合同允许发起付款申请和发票登记。", "合同终止后禁止新增付款。"]],
      ["5. 状态规则", ["待签订：合同信息未完整或未上传扫描件。", "已生效：可用于付款、发票、验收和归档。", "已终止：只读保留，不允许新增关联业务。"]],
      ["6. 校验规则", ["未关联采购记录时不得录入合同。", "合同金额超过项目预算时阻断保存。", "缺少扫描件时不得标记已生效。", "已产生付款记录的合同不可直接删除。"]],
      ["7. 履约提醒", ["履约到期前 15 天提醒负责人。", "履约期超期且项目未验收时进入风险提醒。", "合同终止需填写终止原因和附件依据。"]],
      ["8. 数据联动", ["合同金额作为付款和发票累计金额上限。", "合同扫描件进入结项归档材料。", "履约期限同步项目进度提醒。"]],
      ["9. 验收标准", ["合同台账和履约提醒页签可切换。", "详情、编辑、履约动作均可查看。", "合同状态在详情抽屉中可读且与表格一致。"]],
    ],
  },
  progress: {
    title: "项目进度 PRD 产品开发规则",
    owner: "项目负责人 / 审核人 / 管理员",
    version: "V1.1",
    update: "2026-07-06",
    priority: "高",
    sections: [
      ["1. 页面定位", ["支持项目负责人按月更新进展、上传过程材料、记录完成比例和风险状态。", "支持项目范围、周期等变更申请，并经原审批节点确认。"]],
      ["2. 用户角色", ["项目负责人可新增月度进度、提交变更。", "审核人可处理变更审批。", "管理员可查看全部进度和风险记录。"]],
      ["3. 字段规则", ["必填字段：项目名称、更新月份、负责人、完成比例、进展说明。", "非必填字段：过程材料；关键节点建议上传公告、到货、会议纪要、现场照片等。", "完成比例范围为 0% 至 100%。"]],
      ["4. 月度更新流程", ["选择项目并填写本月进展。", "上传关键过程材料。", "系统根据计划周期和完成比例判断风险。", "保存后同步业务看板和项目详情。"]],
      ["5. 变更流程", ["项目范围、周期、预算变化时发起变更申请。", "变更原因、变更前后内容、影响说明必须填写。", "变更需经原审批节点同意后生效。", "驳回后保留原计划。"]],
      ["6. 状态规则", ["正常：按计划推进。", "滞后：进度晚于计划或负责人手动标记。", "变更中：已提交变更待审批。", "已完成：完成比例达到 100% 且验收通过。"]],
      ["7. 校验规则", ["同一项目同一月份只能有一条有效进度记录。", "完成比例不能低于上月已确认比例，除非走变更流程。", "滞后记录必须填写原因或整改计划。"]],
      ["8. 数据联动", ["滞后状态进入业务看板风险提醒。", "进度达到付款节点后可发起付款申请。", "进度材料进入项目档案。"]],
      ["9. 验收标准", ["月度更新和变更管理页签可切换。", "详情、编辑、变更动作可点击。", "滞后状态在表格中明确标红。"]],
    ],
  },
  payments: {
    title: "付款申请 PRD 产品开发规则",
    owner: "项目负责人 / 财务审核人 / 管理员",
    version: "V1.1",
    update: "2026-07-06",
    priority: "高",
    sections: [
      ["1. 页面定位", ["支持按项目进度和合同约定发起付款申请，上传验收凭证和发票，交由财务在线审核。", "付款申请必须与项目、合同、发票、验收材料保持一致。"]],
      ["2. 用户角色", ["项目负责人可发起付款和查看审核结果。", "财务审核人可审核、通过或驳回付款申请。", "管理员可查看所有付款记录和异常。"]],
      ["3. 字段规则", ["必填字段：项目名称、合同编号、付款阶段、申请金额、验收凭证、发票。", "付款阶段包括首付款、进度款、尾款。", "申请金额必须大于 0。"]],
      ["4. 流程规则", ["项目负责人选择已生效合同发起付款。", "系统校验合同金额、累计付款、发票和验收材料。", "财务审核通过后状态变为已支付。", "财务驳回后申请人可修改后重新提交。"]],
      ["5. 状态规则", ["待提交：申请未完成。", "财务审核中：等待财务处理。", "已支付：审核通过并完成支付。", "已驳回：需补充或修正材料。"]],
      ["6. 校验规则", ["合同状态必须为已生效。", "累计付款金额不得超过合同金额。", "尾款付款必须满足验收通过。", "未上传验收凭证或发票时禁止提交。"]],
      ["7. 财务规则", ["财务需核对项目、合同、发票、验收凭证的一致性。", "驳回必须填写原因。", "支付完成后记录支付时间和审核人。"]],
      ["8. 数据联动", ["付款状态同步业务看板待办和合同详情。", "付款申请引用发票匹配结果。", "付款记录进入结项归档清单。"]],
      ["9. 验收标准", ["付款申请和财务审核页签可切换。", "详情、编辑、财务审核、材料查看动作可点击。", "审核通过后状态刷新为已支付。"]],
    ],
  },
  invoices: {
    title: "发票管理 PRD 产品开发规则",
    owner: "财务人员 / 项目负责人 / 管理员",
    version: "V1.1",
    update: "2026-07-06",
    priority: "中高",
    sections: [
      ["1. 页面定位", ["登记发票代码、号码、金额、开票日期、对应项目和合同，上传发票扫描件。", "提供发票查询统计和预算匹配校验，为付款审核提供依据。"]],
      ["2. 用户角色", ["财务人员可登记、审核和匹配发票。", "项目负责人可查看本项目发票。", "管理员可查看全量发票和异常匹配记录。"]],
      ["3. 字段规则", ["必填字段：发票代码、发票号码、对应项目、对应合同、金额、开票日期、发票扫描件。", "发票金额必须大于 0。", "发票代码和发票号码组合必须唯一。"]],
      ["4. 流程规则", ["录入发票基础信息。", "关联项目和合同。", "上传发票扫描件。", "系统执行重复、金额、项目合同一致性校验。", "校验通过后进入可匹配状态。"]],
      ["5. 状态规则", ["待匹配：已登记但未完成预算或合同匹配。", "已匹配：发票与项目、合同一致。", "异常：重复、金额超限或项目合同不一致。"]],
      ["6. 校验规则", ["重复发票必须阻断保存。", "发票累计金额不得超过合同金额。", "发票对应项目必须与合同关联项目一致。", "开票日期不得早于合同签订日期。"]],
      ["7. 统计规则", ["支持按项目、时间段、合同、匹配状态查询。", "统计发票总金额、合同金额、预算金额和差额。", "超预算或未匹配记录需要高亮提醒。"]],
      ["8. 数据联动", ["已匹配发票可供付款申请引用。", "发票扫描件进入项目档案。", "发票金额参与付款和预算风险判断。"]],
      ["9. 验收标准", ["发票明细和预算匹配统计页签可切换。", "详情、编辑、匹配动作可点击。", "异常发票应明确展示原因。"]],
    ],
  },
  acceptance: {
    title: "验收管理 PRD 产品开发规则",
    owner: "验收组 / 项目负责人 / 管理员",
    version: "V1.1",
    update: "2026-07-06",
    priority: "高",
    sections: [
      ["1. 页面定位", ["支持提交验收申请、上传验收报告和清单、记录验收时间和参与人员。", "支持验收组在线填写意见，并将结果作为付款和结项依据。"]],
      ["2. 用户角色", ["项目负责人可提交验收申请和整改材料。", "验收组可填写验收意见。", "管理员可查看所有验收记录和整改进度。"]],
      ["3. 字段规则", ["必填字段：项目名称、验收时间、参与人员、验收意见、验收材料。", "条件必填字段：验收意见为有条件通过或不通过时，整改要求和整改时限必填。", "验收材料包括验收报告、验收清单、现场记录等。"]],
      ["4. 流程规则", ["项目负责人提交验收申请。", "验收组在线填写通过、有条件通过或不通过。", "有条件通过进入整改流程。", "整改完成后重新提交验收意见。", "通过后进入结项归档。"]],
      ["5. 状态规则", ["待验收：申请已提交。", "待整改：有条件通过或不通过后需整改。", "已通过：可作为付款和结项依据。", "不通过：不得结项和支付尾款。"]],
      ["6. 校验规则", ["未上传验收材料时禁止提交。", "验收时间不得早于合同签订日期。", "不通过或有条件通过必须填写整改要求。", "待整改记录不可直接归档。"]],
      ["7. 整改规则", ["整改要求必须明确问题、责任人和完成时限。", "整改材料需作为附件保留。", "逾期未整改进入业务看板待办提醒。"]],
      ["8. 数据联动", ["验收通过后开放尾款申请和结项归档。", "验收报告进入项目档案。", "待整改状态同步业务看板提醒。"]],
      ["9. 验收标准", ["验收申请和意见收集页签可切换。", "详情、编辑、通过、意见动作可点击。", "有条件通过和待整改状态展示清晰。"]],
    ],
  },
  archive: {
    title: "结项归档 PRD 产品开发规则",
    owner: "项目管理办公室 / 档案管理员 / 管理员",
    version: "V1.1",
    update: "2026-07-06",
    priority: "中高",
    sections: [
      ["1. 页面定位", ["在项目验收通过后完成结项处理和基础档案归档。", "统一归档申请、审批、合同、发票、付款、验收报告等核心资料。"]],
      ["2. 用户角色", ["档案管理员可生成归档记录和维护档案清单。", "项目负责人可查看本人项目档案。", "管理员可查看全部归档项目并导出目录。"]],
      ["3. 字段规则", ["必填字段：项目名称、归档资料、归档日期、负责人。", "归档资料至少包含申请、审批、合同、发票、验收报告。", "归档编号按年度和项目顺序生成。"]],
      ["4. 流程规则", ["验收通过后系统生成结项待办。", "档案管理员核对核心资料完整性。", "资料齐全后标记已结项。", "归档后只允许追加补充材料，不允许删除核心材料。"]],
      ["5. 状态规则", ["待归档：验收通过但资料未核齐。", "已结项：资料完整并完成归档。", "需补充：缺少合同、发票、付款或验收材料。"]],
      ["6. 校验规则", ["验收未通过时禁止结项。", "存在待整改事项时禁止结项。", "合同、发票、验收报告缺失时禁止标记已结项。"]],
      ["7. 档案规则", ["档案材料需按业务阶段归类。", "归档后保留操作人、归档时间和材料清单。", "下载目录应包含项目编号、项目名称、资料类型、文件名称。"]],
      ["8. 数据联动", ["项目结项状态同步项目主档。", "归档资料来自立项、审批、合同、付款、发票、验收模块。", "结项后相关业务记录进入只读状态。"]],
      ["9. 验收标准", ["项目结项和基础档案页签可切换。", "详情、编辑、档案动作可点击。", "已结项项目展示完整档案清单。"]],
    ],
  },
  settings: {
    title: "系统管理 PRD 产品开发规则",
    owner: "系统管理员 / 流程管理员",
    version: "V1.1",
    update: "2026-07-06",
    priority: "高",
    sections: [
      ["1. 页面定位", ["维护系统基础角色权限、审批流程配置和申请模板字段。", "确保各业务模块按照统一权限、流程和字段规则运行。"]],
      ["2. 用户角色", ["系统管理员可维护角色、流程、模板和全局配置。", "流程管理员可维护审批节点和金额条件。", "普通用户不可进入配置编辑，只能按授权使用业务功能。"]],
      ["3. 角色规则", ["基础角色包括申请人、审核人、项目负责人、财务人员、系统管理员。", "角色权限需覆盖查看、新增、编辑、审核、导出、配置等操作。", "同一用户可拥有多个角色，权限取并集。"]],
      ["4. 流程规则", ["流程可按项目类型、预算金额区间配置。", "每条流程至少包含一个审批节点。", "节点需配置审核角色、顺序、是否可驳回。", "流程启用后仅影响新提交业务，历史项目保留原流程。"]],
      ["5. 模板规则", ["申请模板字段可配置显示、必填、默认值、提示说明。", "必填规则应同步影响前端表单校验。", "删除字段前需确认无进行中业务依赖。", "字段展示规则中，必填字段只显示字段名前红色星号。"]],
      ["6. 状态规则", ["启用：配置参与新业务匹配。", "停用：不再参与新业务，但历史业务仍可查看。", "草稿：配置未生效，可继续编辑。"]],
      ["7. 校验规则", ["金额区间不可交叉冲突。", "流程节点不可为空。", "模板必填字段不可被隐藏。", "角色删除前需检查是否仍被流程节点引用。"]],
      ["8. 数据联动", ["流程配置影响项目立项审批路径。", "模板配置影响新增/编辑弹窗字段和校验。", "角色权限影响导航、按钮和数据范围。"]],
      ["9. 验收标准", ["角色权限、流程配置、申请模板页签可切换。", "详情、编辑、配置动作可点击。", "保存配置后应有明确反馈，不影响历史业务规则。"]],
    ],
  },
});

const els = {
  navList: document.getElementById("navList"),
  dashboard: document.getElementById("dashboard"),
  moduleView: document.getElementById("moduleView"),
  pageTitle: document.getElementById("pageTitle"),
  crumbText: document.getElementById("crumbText"),
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
  quickCreateBtn: document.getElementById("quickCreateBtn"),
  approvalBtn: document.getElementById("approvalBtn"),
  todoCount: document.getElementById("todoCount"),
  modalMask: document.getElementById("modalMask"),
  modalTitle: document.getElementById("modalTitle"),
  modalForm: document.getElementById("modalForm"),
  modalClose: document.getElementById("modalClose"),
  modalCancel: document.getElementById("modalCancel"),
  modalSave: document.getElementById("modalSave"),
  drawer: document.getElementById("drawer"),
  drawerTitle: document.getElementById("drawerTitle"),
  drawerKicker: document.getElementById("drawerKicker"),
  drawerBody: document.getElementById("drawerBody"),
  drawerClose: document.getElementById("drawerClose"),
  toast: document.getElementById("toast"),
};

function money(value) {
  if (typeof value !== "number") return value;
  return `¥${value.toLocaleString("zh-CN")}`;
}

function statusClass(value) {
  if (["已通过", "已生效", "已匹配", "已结项", "启用", "已定标", "已支付"].includes(value)) return "done";
  if (["进行中", "招标中", "财务审核中"].includes(value)) return "active";
  if (["滞后", "待整改", "不通过"].includes(value)) return "danger";
  if (["待审核", "待签订"].includes(value)) return "pending";
  return "gray";
}

function statusTag(value) {
  return `<span class="status ${statusClass(value)}">${value}</span>`;
}

function showToast(text) {
  els.toast.textContent = text;
  els.toast.classList.remove("hidden");
  window.setTimeout(() => els.toast.classList.add("hidden"), 1800);
}

let pendingConfirmAction = null;

function requestConfirm({ title = "确认操作", message = "请确认是否继续执行该操作。", summary = "", onConfirm }) {
  pendingConfirmAction = onConfirm;
  els.confirmTitle.textContent = title;
  els.confirmMessage.textContent = message;
  els.confirmSummary.innerHTML = summary || "该操作会更新当前业务状态。";
  els.confirmMask.classList.remove("hidden");
}

function closeConfirmModal() {
  pendingConfirmAction = null;
  els.confirmMask.classList.add("hidden");
}

function commitConfirmAction() {
  const action = pendingConfirmAction;
  pendingConfirmAction = null;
  els.confirmMask.classList.add("hidden");
  if (typeof action === "function") action();
}

function init() {
  renderNav();
  renderDashboard();
  updateTodo();
  bindGlobalEvents();
}

function renderNav() {
  els.navList.innerHTML = navItems
    .map(
      (item) => `
      <button class="nav-item ${item.id === state.active ? "active" : ""}" data-nav="${item.id}">
        <span class="nav-dot"></span>
        <span>${item.label}</span>
      </button>
    `
    )
    .join("");

  els.navList.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => switchView(btn.dataset.nav));
  });
}

function switchView(id) {
  state.active = id;
  renderNav();
  const label = navItems.find((item) => item.id === id).label;
  els.pageTitle.textContent = label;
  els.crumbText.textContent = label;
  if (id === "dashboard") {
    els.dashboard.classList.remove("hidden");
    els.moduleView.classList.add("hidden");
    renderDashboard();
  } else {
    els.dashboard.classList.add("hidden");
    els.moduleView.classList.remove("hidden");
    renderModule(id);
  }
}

function renderDashboard() {
  const pending = state.projects.filter((item) => item.status === "待审核").length;
  const active = state.projects.filter((item) => item.status === "进行中").length;
  const late = state.progress.filter((item) => item.risk === "滞后").length;
  const payment = state.payments.reduce((sum, item) => sum + item.amount, 0);
  els.dashboard.innerHTML = `
    <div class="dashboard-grid">
      ${metric("立项总数", state.projects.length, "本月新增 2 个教学相关项目")}
      ${metric("待办审核", pending, "按金额与类型自动匹配流程")}
      ${metric("采购进行中", active + state.purchase.filter((p) => p.status === "招标中").length, "招标、询价、定标同步跟踪")}
      ${metric("付款待审核", money(payment), "发票与验收凭证已关联")}
    </div>
    <div class="board-row">
      <div class="panel">
        <div class="panel-head">
          <span class="panel-title">项目进度概览</span>
          <button class="ghost-btn" data-jump="progress">查看进度</button>
        </div>
        ${renderMiniTable(state.progress, [["project", "项目名称"], ["percent", "完成比例"], ["risk", "风险"], ["update", "最近进展"]])}
      </div>
      <div class="panel">
        <div class="panel-head">
          <span class="panel-title">待处理事项</span>
          <button class="ghost-btn" id="handleAllBtn">批量处理</button>
        </div>
        <div class="todo-list">
          ${todoItem("项目审批", "智慧教室多媒体设备采购待财务处预算审核", "待审核")}
          ${todoItem("进度预警", "化学实验耗材补充项目进度滞后", "滞后")}
          ${todoItem("验收整改", "补齐 2 类耗材检测报告", "待整改")}
        </div>
      </div>
    </div>
    <div class="panel" style="margin-top:14px;">
      <div class="panel-head">
        <span class="panel-title">合同与发票匹配</span>
        <button class="ghost-btn" data-jump="invoices">查看发票</button>
      </div>
      ${renderMiniTable(state.invoices, [["project", "项目"], ["contract", "合同编号"], ["amount", "发票金额"], ["date", "开票日期"], ["status", "匹配状态"]])}
    </div>
  `;

  els.dashboard.querySelectorAll("[data-jump]").forEach((btn) => {
    btn.addEventListener("click", () => switchView(btn.dataset.jump));
  });
  const handleAll = document.getElementById("handleAllBtn");
  if (handleAll) handleAll.addEventListener("click", () => switchView("projects"));
}

function metric(label, value, note) {
  return `
    <div class="metric-card">
      <div class="metric-label">${label}</div>
      <div class="metric-value">${value}</div>
      <div class="metric-note">${note}</div>
    </div>
  `;
}

function todoItem(type, text, status) {
  return `
    <div class="timeline-item">
      <div class="timeline-date">${type}</div>
      <div>${text} ${statusTag(status)}</div>
    </div>
  `;
}

function renderMiniTable(rows, columns) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${columns.map((col) => `<th>${col[1]}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows
            .map(
              (row) =>
                `<tr>${columns
                  .map((col) => `<td>${formatCell(row[col[0]])}</td>`)
                  .join("")}</tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderModule(module) {
  const config = configs[module];
  const activeTab = state.tabs[module] || config.tabs[0];
  const view = getTabView(module, activeTab);
  const rows = getFilteredRows(module, view.rows);
  els.moduleView.innerHTML = `
    <div class="module-tabs">
      ${config.tabs.map((tab) => `<button class="tab-btn ${tab === activeTab ? "active" : ""}" data-tab="${tab}">${tab}</button>`).join("")}
    </div>
    <div class="filters">
      ${config.filters
        .map(
          (label) => `
        <div class="field">
          <label>${label}:</label>
          <input data-filter="${label}" placeholder="请输入" />
        </div>`
        )
        .join("")}
      <div class="toolbar">
        <button class="primary-btn" id="queryBtn">查询</button>
        <button class="ghost-btn" id="resetBtn">重置</button>
      </div>
    </div>
    <div class="panel-head" style="border-bottom:0;padding:14px 0 10px;">
      <span class="panel-title">${view.title}</span>
      <div class="toolbar">
        <button class="ghost-btn" id="exportBtn">导出</button>
        <button class="primary-btn" id="addBtn">${config.addLabel}</button>
      </div>
    </div>
    ${renderDataTable(module, rows, view.columns)}
    <div class="pagination">
      <span>共 ${rows.length || view.rows.length} 条</span>
      <button class="page-box active">1</button>
      <button class="page-box">2</button>
      <button class="page-box">3</button>
      <span>...</span>
      <button class="page-box">10</button>
      <select><option>10 条/页</option><option>20 条/页</option></select>
      <span>跳至</span>
      <input style="width:44px;height:28px;border:1px solid var(--line-strong);border-radius:4px;" />
      <span>页</span>
    </div>
  `;
  bindModuleEvents(module);
}

function renderDataTable(module, rows, columns = configs[module].columns) {
  if (!rows.length) return `<div class="empty">暂无匹配数据，请调整查询条件</div>`;
  return `
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width:42px;"><input type="checkbox" /></th>
            ${columns.map((col) => `<th>${col[1]}</th>`).join("")}
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row, index) => `
            <tr>
              <td><input type="checkbox" /></td>
              ${columns.map((col) => `<td>${formatCell(row[col[0]])}</td>`).join("")}
              <td>
                <div class="table-actions">
                  <button class="link-btn" data-detail="${module}" data-id="${row.id}">详情</button>
                  <button class="link-btn" data-edit="${module}" data-id="${row.id}">编辑</button>
                  ${actionButton(module, row)}
                </div>
              </td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function getTabView(module, tab) {
  const base = {
    title: `${configs[module].title}列表`,
    columns: configs[module].columns,
    rows: state[module],
    workflow: lifecycleWorkflow(module),
  };
  const views = {
    projects: {
      审批管理: {
        title: "审批管理列表",
        columns: [["id", "项目编号"], ["name", "项目名称"], ["type", "项目类型"], ["budget", "预算金额"], ["node", "当前节点"], ["approver", "审核角色"], ["status", "状态"], ["next", "下一步"]],
        rows: state.projects.map((item) => ({
          ...item,
          node: item.status === "待审核" ? "财务预算审核" : "审批完成",
          approver: item.budget >= 100000 ? "财务处 / 分管校领导" : "责任单位 / 资产处",
          next: item.status === "待审核" ? "通过后生成正式项目" : "进入采购管理",
        })),
        workflow: ["填写申请", "上传材料", "匹配流程", "责任单位审核", "财务/领导审批", "生成项目"],
      },
    },
    purchase: {
      进程跟踪: {
        title: "采购进程跟踪列表",
        columns: [["id", "采购编号"], ["project", "项目名称"], ["method", "采购方式"], ["announce", "公告时间"], ["deadline", "截止时间"], ["supplier", "中标/成交单位"], ["status", "状态"], ["next", "下一节点"]],
        rows: state.purchase.map((item) => ({ ...item, next: item.status === "已定标" ? "进入合同管理" : "确定中标/成交单位" })),
        workflow: ["关联项目", "登记采购", "发布公告/询价", "投标截止", "确认供应商", "同步进度"],
      },
    },
    contracts: {
      履约提醒: {
        title: "合同履约提醒列表",
        columns: [["id", "合同编号"], ["project", "关联项目"], ["partner", "合作方"], ["amount", "合同金额"], ["period", "履约期限"], ["remind", "提醒规则"], ["status", "状态"]],
        rows: state.contracts.map((item) => ({ ...item, remind: item.status === "已生效" ? "到期前 15 天提醒" : "待合同生效后提醒" })),
        workflow: ["选择采购项目", "录入合同", "上传扫描件", "标记生效", "履约提醒", "同步付款"],
      },
    },
    progress: {
      变更管理: {
        title: "项目变更管理列表",
        columns: [["id", "记录编号"], ["project", "项目名称"], ["owner", "负责人"], ["changeType", "变更类型"], ["reason", "变更原因"], ["risk", "审批状态"], ["next", "下一步"]],
        rows: state.progress.map((item) => ({ ...item, changeType: item.risk === "滞后" ? "周期调整" : "暂无变更", reason: item.risk === "滞后" ? "进度滞后需调整计划" : "按计划推进", next: item.risk === "滞后" ? "提交原审批节点" : "继续月度更新" })),
        workflow: ["月度更新", "判断滞后", "发起变更", "原节点审核", "更新计划", "同步看板"],
      },
    },
    payments: {
      财务审核: {
        title: "财务审核列表",
        columns: [["id", "付款编号"], ["project", "项目名称"], ["contract", "合同编号"], ["stage", "付款阶段"], ["amount", "申请金额"], ["voucher", "验收凭证"], ["invoice", "发票"], ["status", "审核状态"]],
        rows: state.payments,
        workflow: ["发起付款", "上传凭证", "关联发票", "财务审核", "支付完成", "归档记录"],
      },
    },
    invoices: {
      预算匹配统计: {
        title: "预算匹配统计列表",
        columns: [["id", "登记编号"], ["project", "项目名称"], ["contract", "合同编号"], ["amount", "发票金额"], ["budget", "项目预算"], ["diff", "预算差额"], ["status", "匹配状态"]],
        rows: state.invoices.map((item) => {
          const project = state.projects.find((p) => p.name === item.project);
          const budget = project?.budget || 0;
          return { ...item, budget, diff: budget ? budget - item.amount : "-" };
        }),
        workflow: ["录入发票", "关联合同", "上传扫描件", "系统校验", "预算匹配", "供付款调用"],
      },
    },
    acceptance: {
      意见收集: {
        title: "验收意见收集列表",
        columns: [["id", "验收编号"], ["project", "项目名称"], ["time", "验收时间"], ["members", "参与人员"], ["opinion", "验收意见"], ["rectification", "整改要求"], ["status", "状态"]],
        rows: state.acceptance,
        workflow: ["提交申请", "上传材料", "验收组评审", "填写意见", "整改复验", "归档结果"],
      },
    },
    archive: {
      基础档案: {
        title: "基础档案列表",
        columns: [["id", "归档编号"], ["project", "项目名称"], ["docs", "档案清单"], ["owner", "负责人"], ["archiveDate", "归档日期"], ["result", "结项状态"]],
        rows: state.archive,
        workflow: ["验收通过", "核对材料", "生成目录", "归档锁定", "项目结项"],
      },
    },
    settings: {
      流程配置: {
        title: "流程配置列表",
        columns: [["id", "配置编号"], ["name", "流程名称"], ["condition", "适用条件"], ["nodes", "审批节点"], ["status", "状态"]],
        rows: state.settings,
        workflow: ["选择配置类型", "设置金额条件", "配置审批节点", "保存启用", "影响新业务"],
      },
      申请模板: {
        title: "申请模板字段列表",
        columns: [["id", "字段编号"], ["name", "字段名称"], ["condition", "字段规则"], ["nodes", "控件类型"], ["role", "适用角色"], ["status", "状态"]],
        rows: [
          { id: "ZD001", name: "项目名称", condition: "必填", nodes: "文本输入", role: "申请人", status: "启用" },
          { id: "ZD002", name: "预算金额", condition: "必填 / 数字", nodes: "数字输入", role: "申请人", status: "启用" },
          { id: "ZD003", name: "项目类型", condition: "必填 / 单选", nodes: "下拉选择", role: "申请人", status: "启用" },
        ],
        workflow: ["维护字段", "设置必填", "设置控件", "保存模板", "同步新增弹窗"],
      },
    },
  };
  return views[module]?.[tab] || base;
}

function lifecycleWorkflow(module) {
  const map = {
    projects: ["填写申请", "上传材料", "提交审批", "生成项目"],
    purchase: ["关联项目", "登记采购", "确定供应商", "同步进度"],
    contracts: ["录入合同", "上传扫描件", "履约提醒", "开放付款"],
    progress: ["月度更新", "风险判断", "变更审批", "同步看板"],
    payments: ["发起付款", "财务审核", "支付完成", "归档"],
    invoices: ["登记发票", "系统校验", "预算匹配", "付款调用"],
    acceptance: ["提交验收", "填写意见", "整改复验", "结果归档"],
    archive: ["验收通过", "档案核对", "结项归档"],
    settings: ["角色权限", "流程配置", "模板规则", "配置生效"],
  };
  return map[module] || [];
}

function actionButton(module, row) {
  if (module === "projects") {
    const approve = row.status === "待审核" ? `<button class="link-btn" data-approve="${row.id}">审核</button>` : "";
    return `${approve}<button class="link-btn" data-flow="${module}" data-id="${row.id}">流程</button>`;
  }
  if (module === "purchase") {
    return `<button class="link-btn" data-progress-purchase="${row.id}">更新进程</button><button class="link-btn" data-flow="${module}" data-id="${row.id}">追踪</button>`;
  }
  if (module === "contracts") {
    return `<button class="link-btn" data-flow="${module}" data-id="${row.id}">履约</button>`;
  }
  if (module === "progress") {
    return `<button class="link-btn" data-flow="${module}" data-id="${row.id}">变更</button>`;
  }
  if (module === "acceptance") {
    const pass = row.status === "待整改" ? `<button class="link-btn" data-pass-acceptance="${row.id}">通过</button>` : "";
    return `${pass}<button class="link-btn" data-flow="${module}" data-id="${row.id}">意见</button>`;
  }
  if (module === "payments") {
    return `<button class="link-btn" data-pay="${row.id}">财务审核</button><button class="link-btn" data-flow="${module}" data-id="${row.id}">材料</button>`;
  }
  if (module === "invoices") {
    return `<button class="link-btn" data-flow="${module}" data-id="${row.id}">匹配</button>`;
  }
  if (module === "archive") {
    return `<button class="link-btn" data-flow="${module}" data-id="${row.id}">档案</button>`;
  }
  if (module === "settings") {
    return `<button class="link-btn" data-flow="${module}" data-id="${row.id}">配置</button>`;
  }
  return "";
}

function formatCell(value) {
  if (typeof value === "number") return money(value);
  if (["待审核", "进行中", "已通过", "滞后", "正常", "已生效", "已终止", "待签订", "招标中", "已定标", "财务审核中", "已支付", "已匹配", "待整改", "已结项", "启用"].includes(value)) {
    return statusTag(value);
  }
  return value || "-";
}

function tabNote(module, tab) {
  const notes = {
    projects: {
      项目申请: "管理教学设备、教具耗材、图书资料等项目立项申请。",
      审批管理: "查看项目类型与金额匹配后的审批节点和当前审核状态。",
    },
    purchase: {
      采购记录: "登记采购方式、预算、计划时间和供应商信息。",
      进程跟踪: "跟踪公告、投标截止、定标等关键采购节点。",
    },
    contracts: {
      合同台账: "记录合同编号、金额、合作方和扫描件。",
      履约提醒: "按履约期限和项目进度提醒合同节点。",
    },
    progress: {
      月度更新: "负责人按月提交进展、过程材料和风险状态。",
      变更管理: "项目范围、周期调整需经原审批节点确认。",
    },
    payments: {
      付款申请: "按项目进度发起付款并关联验收凭证与发票。",
      财务审核: "财务在线审核付款材料并同步支付状态。",
    },
    invoices: {
      发票明细: "登记发票代码、号码、金额、日期和扫描件。",
      预算匹配统计: "按项目统计发票金额与预算匹配情况。",
    },
    acceptance: {
      验收申请: "提交验收报告、清单、时间和参与人员。",
      意见收集: "验收组填写通过、有条件通过、不通过及整改时限。",
    },
    archive: {
      项目结项: "验收通过后生成结项结果，作为付款和归档依据。",
      基础档案: "归档申请、审批、合同、发票、验收报告等资料。",
    },
    settings: {
      角色权限: "设置申请人、审核人、负责人、财务等基础权限。",
      流程配置: "按项目类型或金额调整审批节点和审核角色。",
      申请模板: "维护基础申请模板字段和必填规则。",
    },
  };
  return notes[module]?.[tab] || "当前页签支持查看和维护相关业务数据。";
}

function openPrdModal() {
  const doc = prdDocs[state.active] || prdDocs.dashboard;
  els.prdTitle.textContent = doc.title;
  els.prdBody.innerHTML = `
    <div class="prd-meta">
      <div class="prd-meta-item"><span>适用角色</span><strong>${doc.owner}</strong></div>
      <div class="prd-meta-item"><span>文档版本</span><strong>${doc.version}</strong></div>
      <div class="prd-meta-item"><span>更新日期</span><strong>${doc.update}</strong></div>
      <div class="prd-meta-item"><span>优先级</span><strong>${doc.priority}</strong></div>
    </div>
    ${doc.sections
      .map(
        ([title, rules]) => `
      <section class="prd-section">
        <h3>${title}</h3>
        <ul>${rules.map((rule) => `<li>${rule}</li>`).join("")}</ul>
      </section>`
      )
      .join("")}
  `;
  els.prdMask.classList.remove("hidden");
}

function closePrdModal() {
  els.prdMask.classList.add("hidden");
}

function openFlowChartModal() {
  els.flowBody.innerHTML = `
    <div class="flow-group">
      <div class="flow-group-head">
        <h3>业务流程图</h3>
        <span>展示系统业务从立项到结项的完整流转</span>
      </div>
      ${flowChartDocs.business.map(renderFlowGroup).join("")}
    </div>
    <div class="flow-group">
      <div class="flow-group-head">
        <h3>操作流程图</h3>
        <span>展示用户在页面中的主要操作路径</span>
      </div>
      <div class="operation-grid">
        ${flowChartDocs.operations
          .map(
            (item) => `
          <div class="operation-card">
            <h4>${item.title}</h4>
            <div class="operation-steps">
              ${item.steps.map((step, index) => `${index ? '<span class="flow-arrow">→</span>' : ""}<span class="operation-step">${step}</span>`).join("")}
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>
  `;
  els.flowMask.classList.remove("hidden");
}

function renderFlowGroup(group) {
  return `
    <section class="flow-group">
      <div class="flow-group-head">
        <h3>${group.title}</h3>
        <span>${group.note}</span>
      </div>
      <div class="flow-track">
        ${group.nodes
          .map(([label, type], index) => `${index ? '<span class="flow-arrow">→</span>' : ""}<div class="flow-node ${type}">${label}</div>`)
          .join("")}
      </div>
    </section>
  `;
}

function closeFlowChartModal() {
  els.flowMask.classList.add("hidden");
}

function bindModuleEvents(module) {
  els.moduleView.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.tabs[module] = btn.dataset.tab;
      renderModule(module);
      showToast(`已切换到${btn.dataset.tab}`);
    });
  });
  document.getElementById("queryBtn").addEventListener("click", () => {
    state.filters[module] = {};
    els.moduleView.querySelectorAll("[data-filter]").forEach((input) => {
      state.filters[module][input.dataset.filter] = input.value.trim();
    });
    renderModule(module);
    showToast("查询条件已应用");
  });
  document.getElementById("resetBtn").addEventListener("click", () => {
    state.filters[module] = {};
    renderModule(module);
    showToast("筛选条件已重置");
  });
  document.getElementById("exportBtn").addEventListener("click", () => showToast("已生成模拟导出报表"));
  document.getElementById("addBtn").addEventListener("click", () => openModal(module));

  els.moduleView.querySelectorAll("[data-detail]").forEach((btn) => {
    btn.addEventListener("click", () => openDrawer(module, findRow(module, btn.dataset.id)));
  });
  els.moduleView.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(module, findRow(module, btn.dataset.id)));
  });
  els.moduleView.querySelectorAll("[data-approve]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = findRow("projects", btn.dataset.approve);
      requestConfirm({
        title: "确认审批通过",
        message: "该操作会将项目审批状态更新为已通过，并同步后续采购入口。",
        summary: `项目名称：${item.name}<br>当前状态：${item.status}<br>下一步：进入采购管理`,
        onConfirm: () => {
          item.status = "已通过";
          updateTodo();
          renderModule(module);
          showToast("审批已通过，项目状态已同步更新");
        },
      });
    });
  });
  els.moduleView.querySelectorAll("[data-progress-purchase]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = findRow("purchase", btn.dataset.progressPurchase);
      const nextStatus = item.status === "招标中" ? "已定标" : "招标中";
      requestConfirm({
        title: "确认更新采购进程",
        message: "该操作会更新采购状态，并同步项目进度节点。",
        summary: `采购项目：${item.project}<br>当前状态：${item.status}<br>更新后状态：${nextStatus}`,
        onConfirm: () => {
          item.status = nextStatus;
          item.supplier = "明德教育科技有限公司";
          renderModule(module);
          showToast("采购进程已更新");
        },
      });
    });
  });
  els.moduleView.querySelectorAll("[data-pass-acceptance]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = findRow("acceptance", btn.dataset.passAcceptance);
      requestConfirm({
        title: "确认验收通过",
        message: "该操作会将验收结果更新为通过，并作为付款和结项依据。",
        summary: `项目名称：${item.project}<br>当前意见：${item.opinion}<br>更新后：通过`,
        onConfirm: () => {
          item.status = "已通过";
          item.opinion = "通过";
          renderModule(module);
          showToast("验收已通过，可作为付款和结项依据");
        },
      });
    });
  });
  els.moduleView.querySelectorAll("[data-pay]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = findRow("payments", btn.dataset.pay);
      requestConfirm({
        title: "确认财务审核通过",
        message: "该操作会将付款申请标记为已支付，并同步付款状态。",
        summary: `项目名称：${item.project}<br>付款阶段：${item.stage}<br>申请金额：${money(item.amount)}`,
        onConfirm: () => {
          item.status = "已支付";
          renderModule(module);
          showToast("财务审核通过，付款状态已更新");
        },
      });
    });
  });
  els.moduleView.querySelectorAll("[data-flow]").forEach((btn) => {
    btn.addEventListener("click", () => openDrawer(module, findRow(module, btn.dataset.id), btn.textContent.trim()));
  });
}

function findRow(module, id) {
  const activeTab = state.tabs[module] || configs[module].tabs[0];
  const view = getTabView(module, activeTab);
  return view.rows.find((row) => row.id === id) || state[module].find((row) => row.id === id);
}

function getFilteredRows(module, sourceRows = state[module]) {
  const filter = state.filters[module];
  if (!filter) return sourceRows;
  const keyword = Object.values(filter).filter(Boolean).join(" ");
  if (!keyword) return sourceRows;
  return sourceRows.filter((row) => JSON.stringify(row).includes(keyword));
}

function openModal(module, item = null) {
  state.modalModule = module;
  state.modalItemId = item?.id || null;
  const config = configs[module];
  els.modalTitle.textContent = item ? `编辑${config.title}` : config.addLabel;
  els.modalForm.innerHTML = buildForm(module, item);
  bindUploadBoxes();
  els.modalMask.classList.remove("hidden");
}

const requiredFields = {
  projects: ["name", "type", "budget", "dept", "owner", "cycle", "purpose", "goal"],
  purchase: ["project", "method", "budget", "planDate"],
  contracts: ["id", "project", "partner", "amount", "signDate", "period", "file"],
  progress: ["project", "month", "owner", "percent", "update"],
  payments: ["project", "contract", "stage", "amount", "voucher", "invoice"],
  invoices: ["code", "number", "project", "contract", "amount", "date", "file"],
  acceptance: ["project", "time", "members", "opinion", "file"],
  archive: ["project", "docs", "archiveDate", "owner"],
  settings: ["name", "condition", "nodes", "role"],
};

function buildForm(module, item) {
  const presets = {
    projects: [
      ["name", "项目名称", "请输入项目名称"],
      ["type", "项目类型", "请选择项目类型", "select", ["教育教学设备采购", "教学用具补充", "图书资料采购", "实验耗材补充"]],
      ["budget", "预算金额", "请输入预算金额", "number"],
      ["dept", "责任单位", "请输入责任单位"],
      ["owner", "负责人", "请输入负责人"],
      ["cycle", "项目周期", "请输入项目周期，如 2026-08 至 2026-12"],
      ["purpose", "项目目的", "请输入项目目的", "textarea"],
      ["goal", "预期目标", "请输入预期目标", "textarea"],
      ["material", "支撑材料", "点击上传立项材料", "upload"],
    ],
    purchase: [
      ["project", "采购项目", "请选择采购项目", "select", state.projects.map((project) => project.name)],
      ["method", "采购方式", "请选择采购方式", "select", ["公开招标", "询价", "竞争性谈判", "单一来源"]],
      ["budget", "预算金额", "请输入预算金额", "number"],
      ["planDate", "计划采购时间", "请选择计划采购时间", "date"],
      ["announce", "公告发布时间", "请选择公告发布时间", "date"],
      ["deadline", "投标截止时间", "请选择投标截止时间", "date"],
      ["supplier", "供应商", "请输入供应商"],
    ],
    contracts: [
      ["id", "合同编号", "请输入合同编号"],
      ["project", "关联项目", "请选择关联项目", "select", state.projects.map((project) => project.name)],
      ["partner", "合作方", "请输入合作方"],
      ["amount", "合同金额", "请输入合同金额", "number"],
      ["signDate", "签订日期", "请选择签订日期", "date"],
      ["period", "履约期限", "请输入履约期限，如 2026-08-28 至 2026-12-10"],
      ["file", "合同扫描件", "点击上传合同扫描件", "upload"],
    ],
    progress: [
      ["project", "项目名称", "请选择项目名称", "select", state.projects.map((project) => project.name)],
      ["month", "更新月份", "请选择更新月份", "month"],
      ["owner", "负责人", "请输入负责人"],
      ["percent", "完成比例", "请输入完成比例，如 20%"],
      ["update", "进展说明", "请输入进展说明", "textarea"],
      ["material", "过程材料", "点击上传过程材料", "upload"],
    ],
    payments: [
      ["project", "项目名称", "请选择项目名称", "select", state.projects.map((project) => project.name)],
      ["contract", "合同编号", "请选择合同编号", "select", state.contracts.map((contract) => contract.id)],
      ["stage", "付款阶段", "请选择付款阶段", "select", ["首付款", "进度款", "尾款"]],
      ["amount", "申请金额", "请输入申请金额", "number"],
      ["voucher", "验收凭证", "点击上传验收凭证", "upload"],
      ["invoice", "发票", "点击上传发票", "upload"],
    ],
    invoices: [
      ["code", "发票代码", "请输入发票代码"],
      ["number", "发票号码", "请输入发票号码"],
      ["project", "对应项目", "请选择对应项目", "select", state.projects.map((project) => project.name)],
      ["contract", "对应合同", "请选择对应合同", "select", state.contracts.map((contract) => contract.id)],
      ["amount", "金额", "请输入金额", "number"],
      ["date", "开票日期", "请选择开票日期", "date"],
      ["file", "发票扫描件", "点击上传发票扫描件", "upload"],
    ],
    acceptance: [
      ["project", "项目名称", "请选择项目名称", "select", state.projects.map((project) => project.name)],
      ["time", "验收时间", "请选择验收时间", "date"],
      ["members", "参与人员", "请输入参与人员"],
      ["opinion", "验收意见", "请选择验收意见", "select", ["通过", "有条件通过", "不通过"]],
      ["rectification", "整改要求", "请输入整改要求", "textarea"],
      ["file", "验收材料", "点击上传验收报告和清单", "upload"],
    ],
    archive: [
      ["project", "项目名称", "请选择项目名称", "select", state.projects.map((project) => project.name)],
      ["docs", "归档资料", "请输入归档资料"],
      ["archiveDate", "归档日期", "请选择归档日期", "date"],
      ["owner", "负责人", "请输入负责人"],
    ],
    settings: [
      ["name", "配置名称", "请输入配置名称"],
      ["condition", "适用条件", "请输入适用条件"],
      ["nodes", "审批节点", "请输入审批节点"],
      ["role", "角色权限", "请选择角色权限", "select", ["申请人、审核人、负责人", "申请人、审核人、财务、管理员", "系统管理员"]],
    ],
  };
  const required = requiredFields[module] || [];
  return presets[module]
    .map(([key, label, placeholder, type, options = []]) => {
      const value = item?.[key] ?? "";
      const isRequired = required.includes(key);
      const labelHtml = `<label>${isRequired ? '<span class="required-star">*</span>' : ""}${label}</label>`;
      if (type === "textarea") {
        return `<div class="field wide" data-field="${key}">${labelHtml}<textarea name="${key}" data-required="${isRequired}" placeholder="${placeholder}">${value}</textarea><div class="field-error">请填写${label}</div></div>`;
      }
      if (type === "upload") {
        return `<div class="field wide" data-field="${key}">${labelHtml}<input type="hidden" name="${key}" data-required="${isRequired}" value="${value}" /><div class="upload-box ${value ? "has-file" : ""}" data-upload="${key}" data-label="${label}" data-placeholder="${placeholder}">${value || placeholder}</div><div class="field-error">请上传${label}</div></div>`;
      }
      if (type === "select") {
        const optionList = [...new Set(options.filter(Boolean))];
        return `<div class="field" data-field="${key}">${labelHtml}<select name="${key}" data-required="${isRequired}"><option value="">${placeholder}</option>${optionList
          .map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`)
          .join("")}</select><div class="field-error">请选择${label}</div></div>`;
      }
      if (type === "date" || type === "month" || type === "number") {
        return `<div class="field" data-field="${key}">${labelHtml}<input type="${type}" name="${key}" data-required="${isRequired}" value="${value}" placeholder="${placeholder}" /><div class="field-error">请填写${label}</div></div>`;
      }
      return `<div class="field" data-field="${key}">${labelHtml}<input name="${key}" data-required="${isRequired}" value="${value}" placeholder="${placeholder}" /><div class="field-error">请填写${label}</div></div>`;
    })
    .join("");
}

function bindUploadBoxes() {
  els.modalForm.querySelectorAll("[data-upload]").forEach((box) => {
    box.addEventListener("click", () => {
      const key = box.dataset.upload;
      const input = els.modalForm.querySelector(`input[name="${key}"]`);
      const fileName = `模拟上传-${box.dataset.label}.pdf`;
      input.value = fileName;
      box.textContent = fileName;
      box.classList.add("has-file");
      box.closest(".field").classList.remove("invalid");
      showToast(`${box.dataset.label}已模拟上传`);
    });
  });
}

function validateModal(module) {
  let valid = true;
  const required = requiredFields[module] || [];
  required.forEach((key) => {
    const control = els.modalForm.querySelector(`[name="${key}"]`);
    const wrapper = els.modalForm.querySelector(`[data-field="${key}"]`);
    const empty = !String(control?.value || "").trim();
    wrapper?.classList.toggle("invalid", empty);
    if (empty) valid = false;
  });
  if (!valid) showToast("请先补全必填项");
  return valid;
}

function saveModal() {
  const module = state.modalModule;
  if (!validateModal(module)) return;
  const form = new FormData(els.modalForm);
  const item = Object.fromEntries(form.entries());
  const existingIndex = state.modalItemId ? state[module].findIndex((row) => row.id === state.modalItemId) : -1;
  if (existingIndex >= 0) {
    const original = state[module][existingIndex];
    const next = { ...original, ...item };
    if (next.amount) next.amount = Number(next.amount);
    if (next.budget) next.budget = Number(next.budget);
    state[module][existingIndex] = next;
  } else if (module === "projects") {
    item.id = `P${Date.now().toString().slice(-8)}`;
    item.status = "待审核";
    item.risk = "正常";
    item.approval = ["申请人提交", "责任单位审核", "财务处审核"];
    item.budget = Number(item.budget || 0);
  } else if (module === "settings") {
    item.id = `LC${state.settings.length + 1}`.padStart(5, "0");
    item.status = "启用";
  } else {
    item.id = `${module.slice(0, 2).toUpperCase()}${Date.now().toString().slice(-6)}`;
    item.status = defaultStatus(module);
    if (item.amount) item.amount = Number(item.amount);
    if (item.budget) item.budget = Number(item.budget);
  }
  state[module].unshift(item);
  if (existingIndex >= 0) {
    state[module].splice(0, 1);
  }
  els.modalMask.classList.add("hidden");
  state.modalItemId = null;
  updateTodo();
  switchView(module);
  showToast(existingIndex >= 0 ? "已保存编辑内容" : "已保存，模拟数据已更新");
}

function defaultStatus(module) {
  return {
    purchase: "招标中",
    contracts: "待签订",
    progress: "正常",
    payments: "财务审核中",
    invoices: "已匹配",
    acceptance: "待整改",
    archive: "已结项",
  }[module] || "进行中";
}

function openDrawer(module, item, actionContext = "详情") {
  if (!item) {
    showToast("当前记录不存在，请刷新后重试");
    return;
  }
  els.drawerKicker.textContent = configs[module].title;
  els.drawerTitle.textContent = item.name || item.project || item.id;
  els.drawerBody.innerHTML = `
    <div class="detail-grid">
      ${Object.entries(item)
        .filter(([key]) => !Array.isArray(item[key]))
        .map(
          ([key, value]) => `
        <div class="detail-item">
          <span>${labelFor(module, key)}</span>
          <strong>${formatCell(value)}</strong>
        </div>`
        )
        .join("")}
    </div>
    ${renderDetailTimeline(module, item)}
    ${renderActionPanel(module, item, actionContext)}
    <div class="timeline">
      <div class="panel-title">关联附件</div>
      <div class="timeline-item"><div class="timeline-date">材料</div><div>${item.material || item.file || item.voucher || "核心资料已归档"}</div></div>
      <div class="timeline-item"><div class="timeline-date">操作</div><div><button class="primary-btn" id="drawerAction">${drawerActionText(module, actionContext)}</button></div></div>
    </div>
  `;
  els.drawer.classList.remove("hidden");
  const action = document.getElementById("drawerAction");
  action.addEventListener("click", () => {
    const actionText = drawerActionText(module, actionContext);
    requestConfirm({
      title: `确认${actionText}`,
      message: "该操作会更新当前记录的关联业务状态，请确认后继续。",
      summary: `业务模块：${configs[module].title}<br>记录名称：${item.name || item.project || item.id}<br>操作内容：${actionText}`,
      onConfirm: () => showToast(`${actionText}已完成模拟操作`),
    });
  });
}

function renderActionPanel(module, item, actionContext) {
  const panels = {
    projects: [
      ["审批类型", item.budget >= 100000 ? "大额仪器/设备流程" : "小额教具流程"],
      ["当前动作", actionContext === "流程" ? "查看审批节点与角色" : "查看项目申请详情"],
      ["下一节点", item.status === "待审核" ? "财务处预算审核" : "归档项目立项材料"],
    ],
    purchase: [
      ["公告发布", item.announce || "待登记"],
      ["投标截止", item.deadline || "待登记"],
      ["中标单位", item.supplier || "待确定"],
    ],
    contracts: [
      ["履约提醒", "到期前 15 天提醒负责人"],
      ["履约节点", item.period || "未设置"],
      ["关联合同扫描件", item.file || "未上传"],
    ],
    progress: [
      ["变更类型", "范围/周期/预算调整"],
      ["审批要求", "经原审批节点同意后更新计划"],
      ["当前风险", item.risk || "正常"],
    ],
    payments: [
      ["审核材料", `${item.voucher || "验收凭证"} / ${item.invoice || "发票"}`],
      ["审核口径", "进度、验收、发票三项一致后支付"],
      ["支付状态", item.status],
    ],
    invoices: [
      ["预算匹配", "发票累计金额未超合同金额"],
      ["对应合同", item.contract],
      ["扫描件", item.file || "未上传"],
    ],
    acceptance: [
      ["验收意见", item.opinion],
      ["整改时限", item.rectification || "无"],
      ["归档依据", "通过后关联项目档案和付款申请"],
    ],
    archive: [
      ["档案清单", item.docs],
      ["结项状态", item.result],
      ["归档日期", item.archiveDate],
    ],
    settings: [
      ["配置类型", actionContext === "配置" ? "流程与权限配置" : "系统配置详情"],
      ["适用条件", item.condition],
      ["审批节点", item.nodes],
    ],
  };
  return `
    <div class="timeline">
      <div class="panel-title">${actionContext}</div>
      ${(panels[module] || [])
        .map(([label, value]) => `<div class="timeline-item"><div class="timeline-date">${label}</div><div>${formatCell(value)}</div></div>`)
        .join("")}
    </div>
  `;
}

function drawerActionText(module, actionContext) {
  const map = {
    projects: actionContext === "流程" ? "确认审批节点" : "同步立项状态",
    purchase: "同步采购进度",
    contracts: "生成履约提醒",
    progress: "提交变更审批",
    payments: "确认付款材料",
    invoices: "重新匹配预算",
    acceptance: "归档验收结果",
    archive: "下载档案目录",
    settings: "保存配置预览",
  };
  return map[module] || "同步项目进度";
}

function renderDetailTimeline(module, item) {
  const steps = item.approval || ["提交申请", "业务审核", "财务复核", "结果归档"];
  return `
    <div class="timeline">
      <div class="panel-title">流程记录</div>
      ${steps
        .map(
          (step, index) => `
        <div class="timeline-item">
          <div class="timeline-date">节点 ${index + 1}</div>
          <div>${step} ${index === steps.length - 1 ? statusTag(item.status || "进行中") : statusTag("已通过")}</div>
        </div>`
        )
        .join("")}
    </div>
  `;
}

function labelFor(module, key) {
  const config = configs[module];
  const found = config.columns.find((col) => col[0] === key);
  const map = {
    purpose: "项目目的",
    goal: "预期目标",
    approval: "审批节点",
    risk: "风险状态",
    material: "支撑材料",
  };
  return found?.[1] || map[key] || key;
}

function updateTodo() {
  const count = state.projects.filter((item) => item.status === "待审核").length + state.acceptance.filter((item) => item.status === "待整改").length;
  els.todoCount.textContent = count;
}

function bindGlobalEvents() {
  els.quickCreateBtn.addEventListener("click", () => openModal("projects"));
  els.approvalBtn.addEventListener("click", () => switchView("projects"));
  els.prdDotBtn.addEventListener("click", openPrdModal);
  els.prdClose.addEventListener("click", closePrdModal);
  els.prdConfirm.addEventListener("click", closePrdModal);
  els.flowChartBtn.addEventListener("click", openFlowChartModal);
  els.flowClose.addEventListener("click", closeFlowChartModal);
  els.flowConfirm.addEventListener("click", closeFlowChartModal);
  els.confirmClose.addEventListener("click", closeConfirmModal);
  els.confirmCancel.addEventListener("click", closeConfirmModal);
  els.confirmOk.addEventListener("click", commitConfirmAction);
  els.modalClose.addEventListener("click", () => els.modalMask.classList.add("hidden"));
  els.modalCancel.addEventListener("click", () => els.modalMask.classList.add("hidden"));
  els.modalSave.addEventListener("click", saveModal);
  els.drawerClose.addEventListener("click", () => els.drawer.classList.add("hidden"));
  els.modalMask.addEventListener("click", (event) => {
    if (event.target === els.modalMask) els.modalMask.classList.add("hidden");
  });
  els.prdMask.addEventListener("click", (event) => {
    if (event.target === els.prdMask) closePrdModal();
  });
  els.flowMask.addEventListener("click", (event) => {
    if (event.target === els.flowMask) closeFlowChartModal();
  });
  els.confirmMask.addEventListener("click", (event) => {
    if (event.target === els.confirmMask) closeConfirmModal();
  });
}

init();
