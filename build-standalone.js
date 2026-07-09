const fs = require("fs");
const path = require("path");

const root = __dirname;
const indexPath = path.join(root, "index.html");
const cssPath = path.join(root, "styles.css");
const jsPath = path.join(root, "app.js");
const outputPath = path.join(root, "采购项目管理原型.html");

const html = fs.readFileSync(indexPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const js = fs.readFileSync(jsPath, "utf8");

const standalone = html
  .replace(/<link rel="stylesheet" href="styles\.css[^"]*" \/>/, `<style>\n${css}\n</style>`)
  .replace(/<script src="app\.js[^"]*"><\/script>/, `<script>\n${js.replace(/<\/script>/gi, "<\\/script>")}\n</script>`);

fs.writeFileSync(outputPath, standalone, "utf8");
console.log(outputPath);
