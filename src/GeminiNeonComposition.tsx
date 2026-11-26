import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { BEATS, COLORS, FONT_SANS, FPS } from './theme';
import { TopBar } from './components/TopBar';
import { LeftPanel, LeftTab } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { PhonePreview } from './components/PhonePreview';
import { Timeline } from './components/Timeline';
import { ElasticArm, Mascot, MascotExpression } from './components/Mascot';
import { ClipKind } from './components/ClipArt';
import { FinaleOverlay } from './components/FinaleOverlay';

function smoothStep(frame: number, start: number, end: number, from = 0, to = 1): number {
  return interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
}

export const GeminiNeonComposition: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Sketch-in & UI reveal (0..36)
  const borderProgress = interpolate(frame, [0, 26], [0, 1], { extrapolateRight: 'clamp' });
  const uiOpacity = interpolate(frame, [18, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const showPencil = frame < 30;
  const pencilX = interpolate(frame, [0, 26], [40, 320], { extrapolateRight: 'clamp' });
  const pencilY = interpolate(frame, [0, 14, 26], [96, 82, 92], { extrapolateRight: 'clamp' });

  // 2. Clips & Audio presence
  const clipsVisible =
    frame >= BEATS.clip4Drop
      ? 4
      : frame >= BEATS.clip3Drop
        ? 3
        : frame >= BEATS.clip2Drop
          ? 2
          : frame >= BEATS.clip1Drop
            ? 1
            : 0;
  const audioVisible = frame >= BEATS.audioAppear;

  // 3. Left Panel active tab
  const leftTab: LeftTab =
    frame >= BEATS.subTabSwitch ? 'sub' : frame >= BEATS.fxTabSwitch ? 'fx' : 'media';

  const highlightedClip: ClipKind | null =
    frame >= 36 && frame < BEATS.clip1Drop + 6
      ? 'code'
      : frame >= BEATS.clip1Drop + 6 && frame < BEATS.clip2Drop + 6
        ? 'reason'
        : frame >= BEATS.clip2Drop + 6 && frame < BEATS.clip3Drop + 6
          ? 'context'
          : frame >= BEATS.clip3Drop + 6 && frame < BEATS.clip4Drop + 12
            ? 'neon'
            : null;

  // 4. Trim & "省 60% Token" stamp
  const zzzVisible = frame >= BEATS.zzzStart && frame < BEATS.trimCut + 12;
  const trimProgress = smoothStep(frame, BEATS.trimCut, BEATS.trimCut + 12);
  const stampSpring =
    frame >= BEATS.stampPop && frame < BEATS.fxTabSwitch + 8
      ? spring({ frame: frame - BEATS.stampPop, fps: FPS, config: { damping: 12, stiffness: 180 } })
      : 0;
  const stampFadeOut = interpolate(frame, [BEATS.fxTabSwitch - 4, BEATS.fxTabSwitch + 6], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const stampScale = stampSpring * stampFadeOut;

  // 5. Transitions & Subtitle
  const trans1Scale =
    frame >= BEATS.trans1Drop
      ? spring({ frame: frame - BEATS.trans1Drop, fps: FPS, config: { damping: 12, stiffness: 180 } })
      : 0;
  const trans2Scale =
    frame >= BEATS.trans2Drop
      ? spring({ frame: frame - BEATS.trans2Drop, fps: FPS, config: { damping: 12, stiffness: 180 } })
      : 0;
  const subScale =
    frame >= BEATS.subDrop
      ? spring({ frame: frame - BEATS.subDrop, fps: FPS, config: { damping: 12, stiffness: 170 } })
      : 0;

  // 6. Right Panel sliders
  const depthProgress = smoothStep(frame, BEATS.slider1Start, BEATS.slider1Start + 10);
  const accuracyProgress = smoothStep(frame, BEATS.slider2Start, BEATS.slider2Start + 10);
  const tokenProgress = smoothStep(frame, BEATS.slider3Start, BEATS.slider3Start + 10);
  const neonProgress = smoothStep(frame, BEATS.slider4Start, BEATS.slider4Start + 10);

  // 7. Beat Sync & Export
  const beatSyncProgress = smoothStep(frame, BEATS.beatSyncStart, BEATS.beatSyncStart + 24);
  const exportProgress =
    frame < BEATS.exportClick
      ? -1
      : frame < BEATS.exportDone
        ? interpolate(frame, [BEATS.exportClick, BEATS.exportDone], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        : 1.1;

  // 8. Playhead position across timeline (0..1)
  const playheadRatio = interpolate(
    frame,
    [
      0,
      36,
      BEATS.clip2Drop,
      BEATS.clip4Drop,
      BEATS.zzzStart,
      BEATS.trimCut,
      BEATS.fxTabSwitch,
      BEATS.subDrop,
      BEATS.slider1Start,
      BEATS.beatSyncStart,
      BEATS.exportDone,
    ],
    [0.04, 0.05, 0.25, 0.52, 0.41, 0.45, 0.62, 0.66, 0.72, 0.82, 0.94],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  // 9. Active clip inside Phone Preview
  const activeClip: ClipKind =
    frame < BEATS.clip2Drop
      ? 'code'
      : frame < BEATS.clip3Drop
        ? 'reason'
        : frame < BEATS.clip4Drop
          ? 'context'
          : frame < BEATS.zzzStart
            ? 'neon'
            : frame < BEATS.fxTabSwitch
              ? 'reason'
              : frame < BEATS.slider1Start + 8
                ? 'context'
                : 'neon';

  const showZzzOverlay = frame >= BEATS.zzzStart && frame < BEATS.trimCut;
  const showSubtitleOnPhone = frame >= BEATS.subDrop && frame < BEATS.slider1Start + 28;
  const sunglasses = frame >= BEATS.sunglassesOn;

  // 10. Camera Zoom & Pan choreography
  let camScale = 1;
  let camX = 0;
  let camY = 0;

  if (frame >= 38 && frame < 104) {
    const t = smoothStep(frame, 38, 52) * (1 - smoothStep(frame, 96, 104) * 0.2);
    camScale = 1 + t * 0.1;
    camX = t * 18;
    camY = -t * 18;
  } else if (frame >= 104 && frame < 168) {
    camScale = 1.08 + smoothStep(frame, 104, 120) * 0.04;
    camX = 14 - smoothStep(frame, 104, 120) * 14;
    camY = -16 - smoothStep(frame, 104, 120) * 12;
  } else if (frame >= 168 && frame < 226) {
    camScale = 1.12 - smoothStep(frame, 168, 184) * 0.04;
    camX = smoothStep(frame, 168, 184) * 26;
    camY = -20 + smoothStep(frame, 168, 184) * 12;
  } else if (frame >= 226 && frame < 284) {
    const enter = smoothStep(frame, 226, 240);
    const exit = smoothStep(frame, 274, 284);
    const k = enter * (1 - exit);
    camScale = 1 + k * 0.12 + (1 - enter) * 0.08;
    camX = (1 - enter) * 26 - k * 58;
    camY = (1 - enter) * -8 + k * 10;
  } else if (frame >= 284) {
    camScale = 1;
    camX = 0;
    camY = 0;
  }

  // 11. Mascot Position, Expression, and Elastic Arm target
  const mascotOpacity = interpolate(frame, [26, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const mascotX = interpolate(
    frame,
    [
      30,
      BEATS.clip4Drop,
      BEATS.zzzStart,
      BEATS.trimCut,
      BEATS.fxTabSwitch,
      BEATS.subDrop,
      BEATS.slider1Start,
      BEATS.slider4Start,
      BEATS.beatSyncStart,
      BEATS.exportClick,
    ],
    [138, 148, 250, 265, 160, 120, 560, 620, 650, 820],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const mascotY =
    frame >= BEATS.beatSyncStart && frame < BEATS.exportClick
      ? 654 - Math.abs(Math.sin(frame * 0.55)) * 16
      : 660 - Math.abs(Math.sin(frame * 0.25)) * 4;

  const mascotExpression: MascotExpression =
    frame >= BEATS.zzzStart && frame < BEATS.trimCut
      ? 'annoyed'
      : frame >= BEATS.trimCut && frame < BEATS.fxTabSwitch
        ? 'determined'
        : frame >= BEATS.clip1Drop - 6 && frame < BEATS.clip4Drop + 6
          ? 'wink'
          : frame >= BEATS.sunglassesOn
            ? 'excited'
            : 'happy';

  // Elastic arm reach targets
  let armTarget: { x: number; y: number; curve?: number } | null = null;
  if (frame >= 38 && frame < BEATS.clip1Drop + 4) {
    const t = smoothStep(frame, 38, BEATS.clip1Drop);
    armTarget = { x: interpolate(t, [0, 1], [110, 210]), y: interpolate(t, [0, 1], [230, 792]) };
  } else if (frame >= 54 && frame < BEATS.clip2Drop + 4) {
    const t = smoothStep(frame, 54, BEATS.clip2Drop);
    armTarget = { x: interpolate(t, [0, 1], [218, 410]), y: interpolate(t, [0, 1], [230, 792]) };
  } else if (frame >= 70 && frame < BEATS.clip3Drop + 4) {
    const t = smoothStep(frame, 70, BEATS.clip3Drop);
    armTarget = { x: interpolate(t, [0, 1], [110, 660]), y: interpolate(t, [0, 1], [390, 792]) };
  } else if (frame >= 86 && frame < BEATS.clip4Drop + 4) {
    const t = smoothStep(frame, 86, BEATS.clip4Drop);
    armTarget = { x: interpolate(t, [0, 1], [218, 860]), y: interpolate(t, [0, 1], [390, 792]) };
  } else if (frame >= BEATS.slider1Start && frame < BEATS.slider1Start + 10) {
    armTarget = { x: 880 + depthProgress * 124, y: 204, curve: -20 };
  } else if (frame >= BEATS.slider2Start && frame < BEATS.slider2Start + 10) {
    armTarget = { x: 944 + accuracyProgress * 66, y: 284, curve: -18 };
  } else if (frame >= BEATS.slider3Start && frame < BEATS.slider3Start + 10) {
    armTarget = { x: 980 - tokenProgress * 130, y: 364, curve: -18 };
  } else if (frame >= BEATS.slider4Start && frame < BEATS.slider4Start + 10) {
    armTarget = { x: 870 + neonProgress * 142, y: 444, curve: -18 };
  } else if (frame >= BEATS.exportClick - 4 && frame < BEATS.exportClick + 26) {
    armTarget = { x: 964, y: 54, curve: -12 };
  }

  // 12. Finale Transition
  const isFinale = frame >= BEATS.finaleStart;
  const finaleFrame = Math.max(0, frame - BEATS.finaleStart);
  const editorDimOpacity = isFinale
    ? interpolate(finaleFrame, [0, 14], [1, 0.3], { extrapolateRight: 'clamp' })
    : 1;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        overflow: 'hidden',
        fontFamily: FONT_SANS,
      }}
    >
      {/* Synchronized Procedural BGM + SFX */}
      <Audio src={staticFile('bgm.wav')} volume={0.9} />

      {/* Main Editor Canvas with Camera Transform */}
      <div
        style={{
          width: 1080,
          height: 1080,
          padding: 14,
          boxSizing: 'border-box',
          transform: `translate(${camX}px, ${camY}px) scale(${camScale})`,
          transformOrigin: 'center center',
          opacity: editorDimOpacity,
          position: 'relative',
        }}
      >
        {/* Outer Hand-Drawn Frame */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 22,
            border: `2.8px solid ${COLORS.ink}`,
            background: COLORS.bg,
            padding: 12,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            clipPath:
              borderProgress < 1
                ? `inset(0 ${Math.max(0, (1 - borderProgress) * 100)}% 0 0)`
                : undefined,
          }}
        >
          {/* UI Content fades in smoothly after pencil sketch */}
          <div
            style={{
              opacity: uiOpacity,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              flex: 1,
            }}
          >
            {/* Top Bar */}
            <TopBar frame={frame} exportProgress={exportProgress} />

            {/* Middle Workspace */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              <LeftPanel
                frame={frame}
                activeTab={leftTab}
                highlightedClip={highlightedClip}
              />

              <PhonePreview
                frame={frame}
                activeClip={activeClip}
                isPlaying={frame >= 36 && !isFinale}
                showZzzOverlay={showZzzOverlay}
                showSubtitle={showSubtitleOnPhone}
                sunglasses={sunglasses}
                neonBoost={neonProgress}
              />

              <RightPanel
                depthProgress={depthProgress}
                accuracyProgress={accuracyProgress}
                tokenProgress={tokenProgress}
                neonProgress={neonProgress}
              />
            </div>

            {/* Bottom Timeline */}
            <Timeline
              frame={frame}
              clipsVisible={clipsVisible}
              audioVisible={audioVisible}
              zzzVisible={zzzVisible}
              trimProgress={trimProgress}
              stampScale={stampScale}
              trans1Scale={trans1Scale}
              trans2Scale={trans2Scale}
              subScale={subScale}
              beatSyncProgress={beatSyncProgress}
              playheadRatio={playheadRatio}
            />
          </div>
        </div>

        {/* Mascot "小霓" on the Timeline (hidden during finale since FinaleOverlay has waving mascot) */}
        {!isFinale && mascotOpacity > 0.01 && (
          <div
            style={{
              position: 'absolute',
              left: mascotX,
              top: mascotY,
              opacity: mascotOpacity,
              zIndex: 42,
            }}
          >
            <Mascot
              size={98}
              expression={mascotExpression}
              sunglasses={sunglasses}
              raiseArms={frame >= BEATS.sunglassesOn && !armTarget}
              hideRightArm={Boolean(armTarget)}
              walkPhase={frame * 0.35}
            />

            {/* Speech Bubble: "太耗 Token zzz" */}
            {showZzzOverlay && (
              <div
                style={{
                  position: 'absolute',
                  left: 84,
                  top: -22,
                  background: '#FFFFFF',
                  border: `2.5px solid ${COLORS.ink}`,
                  borderRadius: 12,
                  padding: '6px 16px',
                  fontFamily: FONT_SANS,
                  fontSize: 18,
                  fontWeight: 800,
                  color: COLORS.ink,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                }}
              >
                太耗 Token zzz
              </div>
            )}
          </div>
        )}

        {/* Comic Text "卡点!" during Beat Sync */}
        {frame >= BEATS.beatSyncStart + 4 && frame < BEATS.exportClick - 4 && (
          <div
            style={{
              position: 'absolute',
              left: 146,
              top: 660,
              transform: `rotate(-8deg) scale(${spring({
                frame: frame - (BEATS.beatSyncStart + 4),
                fps: FPS,
                config: { damping: 10, stiffness: 190 },
              })})`,
              zIndex: 44,
              fontFamily: FONT_SANS,
              fontSize: 38,
              fontWeight: 900,
              color: '#4E92F8',
              WebkitTextStroke: '5px #2C2A29',
              paintOrder: 'stroke fill',
              letterSpacing: 1,
            }}
          >
            卡点!
          </div>
        )}

        {/* Stretched Elastic Arm Overlay */}
        {!isFinale && armTarget && (
          <ElasticArm
            fromX={mascotX + 86}
            fromY={mascotY + 46}
            toX={armTarget.x}
            toY={armTarget.y}
            curveOffset={armTarget.curve ?? -32}
          />
        )}

        {/* Opening Illustrated Yellow Pencil */}
        {showPencil && (
          <svg
            width="58"
            height="42"
            viewBox="0 0 60 44"
            style={{
              position: 'absolute',
              left: pencilX,
              top: pencilY,
              zIndex: 55,
              transform: 'rotate(-24deg)',
            }}
          >
            <polygon points="2,22 14,15 14,29" fill="#F5DFC2" stroke={COLORS.ink} strokeWidth="2.2" />
            <polygon points="2,22 7,19 7,25" fill={COLORS.ink} />
            <rect x="14" y="15" width="32" height="14" fill="#F7C948" stroke={COLORS.ink} strokeWidth="2.2" />
            <rect x="46" y="15" width="9" height="14" rx="2" fill="#F296A4" stroke={COLORS.ink} strokeWidth="2.2" />
          </svg>
        )}
      </div>

      {/* Grand Finale Overlay (frames 354..420) */}
      {isFinale && <FinaleOverlay frame={frame} finaleFrame={finaleFrame} />}
    </AbsoluteFill>
  );
};
