// 픽셀 크기 설정
const P = 2;       // 픽셀 한 칸 크기 (px)
const G = 0.5;     // 픽셀 간 갭
const C = P + G;   // 셀 스텝 = 2.5

// 5×7 픽셀 글자맵
const GLYPHS: Record<string, number[][]> = {
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  D: [
    [1, 1, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 0, 0],
  ],
  R: [
    [1, 1, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  G: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
};

const CHAR_W = 5 * C - G;  // 12px
const CHAR_H = 7 * C - G;  // 16.5px
const CHAR_GAP = 3;
const SPACE_W = 6;

const TEXT = "THE UNDERDOGS";

const TOTAL_W = (() => {
  let x = 0;
  for (const ch of TEXT) {
    x += ch === " " ? SPACE_W : CHAR_W + CHAR_GAP;
  }
  return x - CHAR_GAP;
})();

export default function PixelLogo({ className }: { className?: string }) {
  const rects: React.ReactNode[] = [];
  let x = 0;

  TEXT.split("").forEach((ch, ci) => {
    if (ch === " ") {
      x += SPACE_W;
      return;
    }
    const glyph = GLYPHS[ch];
    if (!glyph) {
      x += CHAR_W + CHAR_GAP;
      return;
    }

    glyph.forEach((row, ri) =>
      row.forEach((px, pi) => {
        if (px) {
          rects.push(
            <rect
              key={`${ci}-${ri}-${pi}`}
              x={x + pi * C}
              y={ri * C}
              width={P}
              height={P}
              fill="currentColor"
            />
          );
        }
      })
    );
    x += CHAR_W + CHAR_GAP;
  });

  return (
    <svg
      width={TOTAL_W}
      height={CHAR_H}
      viewBox={`0 0 ${TOTAL_W} ${CHAR_H}`}
      className={className}
      aria-label="The Underdogs"
      role="img"
    >
      {rects}
    </svg>
  );
}
