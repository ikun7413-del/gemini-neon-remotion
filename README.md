# Gemini Neon Remotion Editor Animation

A Remotion recreation of the illustrated NLE video editor motion graphic (**Gemini 4 · Neon**), rendered at `1080×1080`, `30fps`, `14.0s` (`420` frames).

## Highlights

- **Hand-drawn Neo-Brutalist Editor UI**: Warm paper palette, crisp ink outlines, live timecode header, tabbed media/effects/subtitle library, interactive phone preview, parameter sliders (`调参 ✨`), and multi-track timeline (`T` / `▶` / `♪`).
- **Animated Mascot ("小霓")**: Custom SVG character with multiple expressions, sunglasses, walking animation, and an elastic arm that drags clips onto the timeline, adjusts sliders, and clicks export.
- **Full 7-Act Choreography**:
  1. Pencil sketch-in reveal
  2. Dragging 4 illustrated clips (`代码重构.ts`, `深度推理.ai`, `1M上下文.doc`, `Neon高能.mp4`) onto the timeline
  3. Trimming redundant thinking (`冗长思考中..` / `太耗 Token zzz`) and stamping `省 60% Token`
  4. Dropping transitions (`旋转切`, `霓虹故障`) and comic subtitle (`XHigh 强推理!`)
  5. Tuning `Neon 引擎` sliders (`XHigh`, `99%`, `-60%`, `100%`)
  6. Rhythm beat-sync (`卡点!`) and export progress (`渲染 0% → 100% → 完成 ✓`)
  7. Finale showcase with lined sticky note (`14 秒极速搞定，Gemini 4 Neon`), feature pills, scaled short-video reel (`拿捏了!`), waving mascot, and confetti
- **Self-Contained Procedural Audio**: `scripts/generate-audio.mjs` synthesizes a 128 BPM lo-fi groove and synced UI sound effects into `public/bgm.wav`.

## Getting Started

```bash
npm install
```

### Preview in Remotion Studio

```bash
npm run dev
```

### Regenerate Procedural Audio (Optional)

```bash
npm run generate-audio
```

### Render Video (`1080×1080`, `30fps`, `14s`)

```bash
npm run render
```

The rendered MP4 will be written to `out/gemini-neon.mp4`.

### Typecheck

```bash
npm run typecheck
```
