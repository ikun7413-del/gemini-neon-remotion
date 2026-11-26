export const FPS = 30;
export const DURATION_IN_FRAMES = 420; // 14.0 seconds
export const WIDTH = 1080;
export const HEIGHT = 1080;

export const COLORS = {
  bg: '#F6F5EC',
  panel: '#FAF9F2',
  panelSoft: '#F1F0E7',
  trackBg: '#ECEBE2',
  ink: '#2C2A29',
  inkMuted: '#7E7B74',
  inkSoft: '#5A5751',
  yellow: '#F6D25B',
  yellowLight: '#FDF2D0',
  teal: '#67C3C1',
  tealLight: '#DDF4F0',
  mint: '#A7DFC5',
  mintDark: '#3E8E6E',
  purple: '#9A8BF5',
  purpleLight: '#E8E3FA',
  cyan: '#47C4E6',
  blue: '#4E92F8',
  blueNeon: '#2563EB',
  coral: '#E85D6E',
  phoneBezel: '#2B2A29',
  phoneInner: '#3E3C3A',
};

export const FONT_SANS =
  '"PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
export const FONT_MONO =
  '"JetBrains Mono", "SF Mono", "Cascadia Code", Consolas, monospace';

// Key choreography frame markers (at 30 fps)
export const BEATS = {
  // Phase 1: Pencil sketch-in (0 - 36)
  sketchEnd: 30,
  uiRevealEnd: 36,

  // Phase 2: Drag 4 clips onto timeline (36 - 102)
  clip1Drop: 44,
  clip2Drop: 60,
  clip3Drop: 76,
  clip4Drop: 92,
  audioAppear: 98,

  // Phase 3: Redundant thinking & trim (102 - 168)
  zzzStart: 108,
  trimCut: 138,
  stampPop: 142,

  // Phase 4: Transitions & Subtitle (168 - 228)
  fxTabSwitch: 170,
  trans1Drop: 180,
  trans2Drop: 192,
  subTabSwitch: 200,
  subDrop: 210,

  // Phase 5: Parameter sliders (228 - 282)
  slider1Start: 228,
  slider2Start: 240,
  slider3Start: 252,
  slider4Start: 264,
  sunglassesOn: 268,

  // Phase 6: Beat sync & Export (282 - 354)
  beatSyncStart: 284,
  exportClick: 312,
  exportDone: 348,

  // Phase 7: Finale showcase (354 - 420)
  finaleStart: 354,
};
