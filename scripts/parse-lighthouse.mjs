import fs from "fs";
const r = JSON.parse(fs.readFileSync("./lighthouse-report-4.json", "utf8"));
const c = r.categories;

console.log("=== 3차 Lighthouse 결과 ===");
console.log("Performance:", Math.round(c.performance.score * 100));
console.log("SEO:", Math.round(c.seo.score * 100));
console.log("Accessibility:", Math.round(c.accessibility.score * 100));
console.log("Best Practices:", Math.round(c["best-practices"].score * 100));

console.log("\n=== 실패 항목 ===");
const a = r.audits;
Object.keys(a)
  .filter((k) => a[k].score !== null && a[k].score !== undefined && a[k].score < 1)
  .forEach((k) => {
    const audit = a[k];
    console.log(`[FAIL] ${k} | score: ${audit.score} | ${audit.displayValue || ""}`);
    if (audit.details && audit.details.items && audit.details.items.length > 0) {
      audit.details.items.slice(0, 3).forEach((item) => {
        const desc = item.node?.snippet || item.url || item.source?.url || JSON.stringify(item).slice(0, 100);
        console.log("       →", desc);
      });
    }
  });
