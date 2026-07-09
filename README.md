# 教学采购项目管理原型

这是一个可公开部署的 GitHub Pages 静态网站项目，入口文件为 `index.html`。当前版本为 **V1 轻量级项目全过程管理原型**，重点跑通学校项目管理的基础业务闭环。

线上访问地址：

[https://jess-0411.github.io/github.io/](https://jess-0411.github.io/github.io/)

GitHub 仓库：

[https://github.com/Jess-0411/github.io](https://github.com/Jess-0411/github.io)

## V1 业务范围

V1 保留 9 个左侧菜单：

- 项目立项
- 采购管理
- 合同管理
- 项目进度
- 付款申请
- 发票管理
- 验收管理
- 项目结项
- 系统管理

核心流程：

```text
项目申请 → 审批 → 采购 → 合同 → 项目实施 → 付款申请 → 发票登记 → 验收 → 结项
```

## 项目结构

```text
.
├── index.html              # GitHub Pages 入口文件
├── styles.css              # 页面样式
├── app.js                  # 原型交互与模拟数据
├── build-standalone.js     # 生成单文件离线 HTML
├── server.js               # 本地预览服务
├── 采购项目管理原型.html   # 单文件离线版本
├── 业务流程与架构图.md     # V1 业务流程与架构说明
├── design-qa.md            # 设计与交互验证记录
├── .nojekyll               # GitHub Pages 禁用 Jekyll 处理
└── vercel.json             # Vercel 静态部署配置
```

## 本地预览

可以直接打开 `index.html`，也可以启动本地预览服务：

```bash
node server.js
```

默认访问地址：

```text
http://localhost:3000
```

## 生成离线版

```bash
npm run build:standalone
```

生成文件：

```text
采购项目管理原型.html
```

## 发布到 GitHub Pages

每次页面修改完成后执行：

```bash
git status
git add .
git commit -m "update website"
git push origin main
```

推送成功后，GitHub Pages 会自动部署到：

[https://jess-0411.github.io/github.io/](https://jess-0411.github.io/github.io/)

## 维护说明

- 正式公开部署入口固定为 `index.html`。
- 当前项目为静态交互原型，数据使用前端模拟数据，不连接真实后端。
- `采购项目管理原型.html` 为离线演示版本，不作为 GitHub Pages 入口。
- PRD 弹窗内容遵循 PRD-V1 九段结构。
