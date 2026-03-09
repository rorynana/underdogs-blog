/**
 * PNG/JPG → WebP 일괄 변환 스크립트
 * 실행: node scripts/convert-images.mjs
 * 필요: pnpm add -D sharp
 *
 * - 썸네일 (thumbnail.png, thumbnail.jpg): 1200×630 리사이즈
 * - 일반 포스트 이미지: width 1200px 이하로 리사이즈
 * - 원본 파일 유지 (Next.js 자동 변환 폴백용)
 * - 이미 .webp 존재하면 스킵
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "../public/images/posts");
const QUALITY = 80;
const MAX_WIDTH = 1200;
const THUMBNAIL_WIDTH = 1200;
const THUMBNAIL_HEIGHT = 630;

function isThumbnail(filename) {
  return filename.toLowerCase().includes("thumbnail");
}

async function convertFile(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return;

  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, ".webp");

  if (fs.existsSync(outputPath)) {
    console.log(`  SKIP (already exists): ${path.basename(outputPath)}`);
    return;
  }

  const filename = path.basename(inputPath);
  const originalSize = fs.statSync(inputPath).size;

  try {
    let pipeline = sharp(inputPath);

    if (isThumbnail(filename)) {
      pipeline = pipeline.resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, {
        fit: "cover",
        position: "center",
      });
    } else {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    await pipeline.webp({ quality: QUALITY }).toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const saved = Math.round((1 - newSize / originalSize) * 100);
    console.log(
      `  ✓ ${filename} → ${path.basename(outputPath)} (${Math.round(originalSize / 1024)}KB → ${Math.round(newSize / 1024)}KB, -${saved}%)`
    );
  } catch (err) {
    console.error(`  ✗ Failed: ${filename}`, err.message);
  }
}

async function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else {
      await convertFile(fullPath);
    }
  }
}

console.log("🖼  Converting images to WebP...\n");
await walkDir(IMAGES_DIR);
console.log("\n✅ Done.");
