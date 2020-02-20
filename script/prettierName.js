const glob = require("glob");
const path = require("path");
const { moveSync, removeSync } = require("fs-extra");

const svgPath = glob.sync(`${path.resolve(process.cwd(), "svg")}/**/*.svg`);
let successNum = 0;
let failNum = 0;
const replacer = (match, p1, p2) =>
  `${p1}${p2
    .replace(/\s+$/, "")
    .replace(/\s+/, "_")
    .replace(/&/, "_and_")}.svg`;

svgPath.forEach(o => {
  const p = o.replace(/(.*\/)*([^.]+).*/gi, replacer);

  if (o !== p) {
    try {
      moveSync(o, p);
      removeSync(o);
      successNum++;
    } catch (error) {
      failNum++;
    }
  }
});

console.log(`prettier svg name:`);
console.log(
  `  total: ${svgPath.length} success: ${successNum} fail: ${failNum}`
);
