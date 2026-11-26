import React from 'react';
import { interpolate, spring } from 'remotion';
import { COLORS, FONT_SANS, FPS } from '../theme';
import { Mascot } from './Mascot';
import { PhonePreview } from './PhonePreview';
import { ClipKind } from './ClipArt';

interface FinaleOverlayProps {
  frame: number;
  finaleFrame: number; // frames since finaleStart (0..66)
}

const CONFETTI = Array.from({ length: 34 }, (_, i) => {
  const seed = (i * 137.5) % 100;
  const colors = ['#F6D25B', '#49D2F5', '#9A8BF5', '#FF8EB6', '#58E0B4', '#E85D6E'];
  return {
    x: 40 + ((i * 97) % 1000),
    yStart: 30 + ((i * 53) % 280),
    speedY: 1.8 + (seed % 3.2),
    driftX: Math.sin(i * 1.4) * 1.4,
    rot: (i * 42) % 360,
    rotSpeed: (i % 2 === 0 ? 1 : -1) * (4 + (i % 6)),
    color: colors[i % colors.length],
    w: i % 3 === 0 ? 10 : 7,
    h: i % 3 === 0 ? 10 : 14,
    circle: i % 4 === 0,
  };
});

export const FinaleOverlay: React.FC<FinaleOverlayProps> = ({ frame, finaleFrame }) => {
  const enterSpring = spring({
    frame: finaleFrame,
    fps: FPS,
    config: { damping: 14, stiffness: 120 },
  });

  const noteScale = interpolate(enterSpring, [0, 1], [0.85, 1]);
  const noteOpacity = interpolate(finaleFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  const phoneSpring = spring({
    frame: Math.max(0, finaleFrame - 3),
    fps: FPS,
    config: { damping: 14, stiffness: 110 },
  });

  // Rapid montage inside the finale phone: code (0..12) -> context (12..24) -> neon + "拿捏了!" (24+)
  const finaleClip: ClipKind =
    finaleFrame < 11 ? 'code' : finaleFrame < 22 ? 'context' : 'neon';
  const showNaNieLe = finaleFrame >= 24;
  const likesNum = interpolate(finaleFrame, [0, 50], [9.8, 10.2], { extrapolateRight: 'clamp' });
  const likeCountText = `${likesNum.toFixed(1)}w`;

  // Handwritten text reveal
  const line1Chars = Math.floor(interpolate(finaleFrame, [6, 20], [0, 8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const line2Opacity = interpolate(finaleFrame, [16, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line3Opacity = interpolate(finaleFrame, [22, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const underlineWidth = interpolate(finaleFrame, [26, 38], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const signOpacity = interpolate(finaleFrame, [36, 46], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pills = [
    { icon: '✦', text: 'XHigh 深度推理', bg: '#EAE4FC', delay: 14 },
    { icon: '</>', text: 'Agentic 代码重构', bg: '#DDF5FA', delay: 20 },
    { icon: '⚡', text: '1M 上下文 · 省 60% Token', bg: '#FDF3D3', delay: 26 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 60,
        pointerEvents: 'none',
      }}
    >
      {/* Left Column: Lined Sticky Note + 3 Feature Pills */}
      <div
        style={{
          position: 'absolute',
          left: 44,
          top: 176,
          width: 452,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          opacity: noteOpacity,
          transform: `scale(${noteScale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Lined Sticky Note */}
        <div
          style={{
            position: 'relative',
            background: '#FFFEFA',
            border: `2.8px solid ${COLORS.ink}`,
            borderRadius: 16,
            padding: '44px 34px 32px 34px',
            height: 442,
            boxSizing: 'border-box',
            transform: 'rotate(-1.8deg)',
            boxShadow: '0 14px 32px rgba(30, 28, 25, 0.12)',
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent 0px, transparent 41px, #ECEAE0 41px, #ECEAE0 43px)',
            backgroundPosition: '0 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Yellow Washi Tape on Top */}
          <div
            style={{
              position: 'absolute',
              top: -16,
              left: '50%',
              transform: 'translateX(-50%) rotate(1.5deg)',
              width: 132,
              height: 30,
              background: 'rgba(246, 210, 91, 0.72)',
              borderRadius: 3,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                fontFamily: FONT_SANS,
                fontSize: 33,
                fontWeight: 800,
                color: '#3B3936',
                letterSpacing: 0.5,
              }}
            >
              {'14 秒极速搞定，'.slice(0, line1Chars)}
            </div>

            <div
              style={{
                fontFamily: FONT_SANS,
                fontSize: 66,
                fontWeight: 900,
                fontStyle: 'italic',
                color: '#1E1D1B',
                lineHeight: 1.08,
                opacity: line2Opacity,
                marginTop: 12,
              }}
            >
              Gemini 4
            </div>

            <div style={{ position: 'relative', display: 'inline-block', opacity: line3Opacity }}>
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 72,
                  fontWeight: 900,
                  fontStyle: 'italic',
                  color: COLORS.blueNeon,
                  lineHeight: 1.05,
                }}
              >
                Neon
              </div>
              {/* Hand-drawn coral + cyan double underline */}
              <svg
                width="330"
                height="26"
                viewBox="0 0 330 26"
                style={{
                  marginTop: 4,
                  clipPath: `inset(0 ${100 - underlineWidth}% 0 0)`,
                }}
              >
                <path
                  d="M 4 12 Q 160 2 322 8"
                  stroke="#EB6458"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 28 22 Q 170 14 310 18"
                  stroke="#49C6E5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          <div
            style={{
              textAlign: 'right',
              fontFamily: FONT_SANS,
              fontSize: 24,
              fontWeight: 700,
              color: '#5C5852',
              opacity: signOpacity,
            }}
          >
            — 小霓 收工
          </div>
        </div>

        {/* 3 Stacked Feature Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
          {pills.map((pill) => {
            const pSpring = spring({
              frame: Math.max(0, finaleFrame - pill.delay),
              fps: FPS,
              config: { damping: 14, stiffness: 150 },
            });
            return (
              <div
                key={pill.text}
                style={{
                  height: 54,
                  borderRadius: 15,
                  border: `2.5px solid ${COLORS.ink}`,
                  background: pill.bg,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 20px',
                  gap: 14,
                  fontFamily: FONT_SANS,
                  fontSize: 22,
                  fontWeight: 800,
                  color: COLORS.ink,
                  transform: `translateY(${interpolate(pSpring, [0, 1], [24, 0])}px) rotate(-0.8deg)`,
                  opacity: pSpring,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                }}
              >
                <span style={{ fontSize: 22, color: '#4E55B8', fontWeight: 900 }}>{pill.icon}</span>
                <span>{pill.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Side: Scaled-up Phone Preview */}
      <div
        style={{
          position: 'absolute',
          right: 68,
          top: 112,
          transform: `scale(${interpolate(phoneSpring, [0, 1], [0.88, 1.32])})`,
          transformOrigin: 'top right',
          opacity: interpolate(finaleFrame, [0, 8], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <PhonePreview
          frame={frame}
          activeClip={finaleClip}
          isPlaying
          sunglasses
          neonBoost={1}
          finaleMode
          showNaNieLe={showNaNieLe}
          likeCountText={likeCountText}
        />
      </div>

      {/* Bottom Right Waving Mascot */}
      <div
        style={{
          position: 'absolute',
          left: 690,
          bottom: 72,
          transform: `scale(${interpolate(enterSpring, [0, 1], [0.7, 1.18])}) translateY(${Math.sin(frame * 0.22) * 4}px)`,
        }}
      >
        <Mascot
          size={126}
          expression="wink"
          sunglasses
          waveRightArm
          walkPhase={frame * 0.2}
        />
      </div>

      {/* Colorful Confetti */}
      {CONFETTI.map((c, idx) => {
        const y = c.yStart + finaleFrame * c.speedY * 2.2;
        const x = c.x + Math.sin(finaleFrame * 0.1 + idx) * 14 + finaleFrame * c.driftX;
        const rot = c.rot + finaleFrame * c.rotSpeed;
        const opacity = interpolate(finaleFrame, [0, 6, 54, 66], [0, 0.95, 0.95, 0.4], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: c.w,
              height: c.h,
              borderRadius: c.circle ? '50%' : 2,
              background: c.color,
              border: '1.2px solid rgba(44,42,41,0.45)',
              transform: `rotate(${rot}deg)`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};
