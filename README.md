# 教学采购项目管理原型

这是一个可公开部署的静态网站项目，入口文件为 `index.html`，用于展示教学采购项目管理后台原型。页面包含项目立项、采购管理、合同管理、项目进度、付款申请、发票管理、验收管理、结项归档、系统管理、PRD 规则弹窗、业务流程图弹窗等交互内容。

仓库地址：[Jess-0411/github.io](https://github.com/Jess-0411/github.io)

## 项目结构

```text
.
├── index.html              # 静态站入口文件
├── styles.css              # 页面样式
├── app.js                  # 原型交互与模拟数据
├── vercel.json             # Vercel 静态部署配置
├── .nojekyll               # GitHub Pages 禁用 Jekyll 处理
├── build-standalone.js     # 可选：生成单文件 HTML
├── server.js               # 可选：本地预览服务
├── 采购项目管理原型.html       # 可选：单文件离线版本
├── 业务流程与架构图.md        # 业务流程与架构说明
└── design-qa.md            # 设计核验记录
```

## GitHub Pages 部署

1. 将本目录内容提交到 `Jess-0411/github.io` 仓库根目录。
2. 在 GitHub 仓库中进入 `Settings` → `Pages`。
3. Source 选择 `Deploy from a branch`。
4. Branch 选择 `main`，目录选择 `/ (root)`。
5. 保存后访问 `https://jess-0411.github.io/`。

## Vercel 部署

1. 在 Vercel 导入 `Jess-0411/github.io` 仓库。
2. Framework Preset 选择 `Other`。
3. Build Command 留空。
4. Output Directory 填写 `.`。
5. 部署完成后访问 Vercel 提供的域名。

## 本地预览

可直接打开 `index.html` 预览。也可以使用本地预览服务：

```bash
node server.js
```

默认访问地址为 `http://localhost:3000`。

## 维护说明

- 正式公开部署使用 `index.html`、`styles.css`、`app.js` 三个核心文件。
- `采购项目管理原型.html` 是单文件离线版本，不作为部署入口。
- 页面数据为前端模拟数据，不连接真实后端服务。
