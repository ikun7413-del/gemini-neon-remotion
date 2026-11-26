import React from 'react';
import { COLORS, FONT_MONO, FONT_SANS } from '../theme';
import { ClipArt, ClipKind } from './ClipArt';

interface TimelineProps {
  frame: number;
  clipsVisible: number; // 0..4
  audioVisible: boolean;
  zzzVisible: boolean;
  trimProgress: number; // 0 = un-trimmed (wide clip 2), 1 = trimmed (crisp clip 2)
  stampScale: number; // 0..1 ("省 60% Token")
  trans1Scale: number; // 0..1
  trans2Scale: number; // 0..1
  subScale: number; // 0..1 ("T XHigh 强推理!")
  beatSyncProgress: number; // 0..1
  playheadRatio: number; // 0..1 across track width
}

// Deterministic waveform heights
const WAVE_BARS = Array.from({ length: 112 }, (_, i) => {
  const s = Math.sin(i * 0.72) * 0.45 + Math.cos(i * 1.93) * 0.35 + Math.sin(i * 0.25) * 0.2;
  return 10 + Math.round(Math.abs(s) * 32);
});

export const Timeline: React.FC<TimelineProps> = ({
  frame,
  clipsVisible,
  audioVisible,
  zzzVisible,
  trimProgress,
  stampScale,
  trans1Scale,
  trans2Scale,
  subScale,
  beatSyncProgress,
  playheadRatio,
}) => {
  const trackLeft = 72;
  const trackWidth = 924;
  const playheadX = trackLeft + playheadRatio * trackWidth;

  // Clip widths (clip 2 shrinks from 286px to 198px when trimmed)
  const w1 = 186;
  const w2 = 286 - trimProgress * 88;
  const w3 = 204;
  const w4 = 224;
  const gap = 8;

  const x1 = 0;
  const x2 = x1 + w1 + gap;
  const x3 = x2 + w2 + gap;
  const x4 = x3 + w3 + gap;

  const clips: Array<{
    kind: ClipKind;
    name: string;
    x: number;
    w: number;
    border: string;
  }> = [
    { kind: 'code', name: '代码重构.ts', x: x1, w: w1, border: '#35518E' },
    { kind: 'reason', name: '深度推理.ai', x: x2, w: w2, border: '#463C8C' },
    { kind: 'context', name: '1M上下文.doc', x: x3, w: w3, border: '#3D8E6D' },
    { kind: 'neon', name: 'Neon高能.mp4', x: x4, w: w4, border: '#743D8E' },
  ];

  const totalDurText = trimProgress > 0.5 ? '0:14.0s' : '0:15.8s';

  return (
    <div
      style={{
        height: 416,
        borderRadius: 18,
        border: `2.5px solid ${COLORS.ink}`,
        background: COLORS.panel,
        padding: '14px 18px 12px 18px',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Time Ruler */}
      <div style={{ marginLeft: trackLeft, width: trackWidth, position: 'relative', height: 30 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT_MONO, fontSize: 12, color: COLORS.inkMuted, fontWeight: 600 }}>
          {['0:00', '0:02', '0:04', '0:06', '0:08', '0:10', '0:12', '0:14'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 10,
            borderBottom: '1.5px solid #BDB9AC',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {Array.from({ length: 57 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 1.5,
                height: i % 8 === 0 ? 10 : i % 4 === 0 ? 6 : 4,
                background: i % 8 === 0 ? '#8E8A7E' : '#C9C5B8',
              }}
            />
          ))}
        </div>
      </div>

      {/* Tracks Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', marginTop: 6 }}>
        {/* Track 1: Subtitle (T) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 58,
              height: 42,
              borderRadius: 11,
              border: `2.2px solid ${COLORS.ink}`,
              background: COLORS.yellowLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT_SANS,
              fontSize: 19,
              fontWeight: 900,
              color: COLORS.ink,
              flexShrink: 0,
            }}
          >
            T
          </div>
          <div
            style={{
              flex: 1,
              height: 42,
              borderRadius: 10,
              background: COLORS.trackBg,
              position: 'relative',
            }}
          >
            {subScale > 0.01 && (
              <div
                style={{
                  position: 'absolute',
                  left: x3 - 10,
                  top: 3,
                  width: 248,
                  height: 36,
                  borderRadius: 9,
                  border: `2.2px solid ${COLORS.ink}`,
                  background: COLORS.yellow,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 12,
                  fontFamily: FONT_SANS,
                  fontSize: 15,
                  fontWeight: 800,
                  color: COLORS.ink,
                  transform: `scale(${subScale})`,
                  transformOrigin: 'center center',
                  boxSizing: 'border-box',
                }}
              >
                T XHigh 强推理!
              </div>
            )}
          </div>
        </div>

        {/* Track 2: Video (▶) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 58,
              height: 98,
              borderRadius: 11,
              border: `2.2px solid ${COLORS.ink}`,
              background: COLORS.tealLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              color: COLORS.ink,
              flexShrink: 0,
            }}
          >
            ▶
          </div>
          <div
            style={{
              flex: 1,
              height: 98,
              borderRadius: 12,
              background: COLORS.trackBg,
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {clips.map((clip, idx) => {
              if (idx >= clipsVisible) return null;
              return (
                <div
                  key={clip.kind}
                  style={{
                    position: 'absolute',
                    left: clip.x,
                    top: 3,
                    width: clip.w,
                    height: 92,
                    borderRadius: 11,
                    border: `2.5px solid ${clip.border}`,
                    overflow: 'hidden',
                    display: 'flex',
                    background: '#1E2444',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* 3 filmstrip thumbnails inside the clip */}
                  {[0, 1, 2].map((thumb) => (
                    <div
                      key={thumb}
                      style={{
                        flex: 1,
                        height: '100%',
                        borderRight: thumb < 2 ? '1px solid rgba(255,255,255,0.18)' : 'none',
                      }}
                    >
                      <ClipArt kind={clip.kind} frame={frame + thumb * 10} compact />
                    </div>
                  ))}

                  {/* Redundant "z z z" grey hatched middle section in Clip 2 */}
                  {clip.kind === 'reason' && zzzVisible && trimProgress < 0.95 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '36%',
                        width: `${Math.max(0, (1 - trimProgress) * 34)}%`,
                        top: 0,
                        bottom: 0,
                        background:
                          'repeating-linear-gradient(-45deg, rgba(110,110,118,0.88), rgba(110,110,118,0.88) 7px, rgba(138,138,146,0.88) 7px, rgba(138,138,146,0.88) 14px)',
                        borderLeft: '2px dashed #FFF',
                        borderRight: '2px dashed #FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontFamily: FONT_MONO,
                        fontSize: 18,
                        fontWeight: 900,
                        letterSpacing: 4,
                        overflow: 'hidden',
                      }}
                    >
                      z z z
                    </div>
                  )}

                  {/* Clip filename pill */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 6,
                      top: 6,
                      background: 'rgba(255,255,255,0.92)',
                      color: COLORS.ink,
                      fontFamily: FONT_SANS,
                      fontSize: 11.5,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 6,
                    }}
                  >
                    {clip.name}
                  </div>
                </div>
              );
            })}

            {/* Transition Badge 1 (between Clip 2 & 3) */}
            {trans1Scale > 0.01 && (
              <div
                style={{
                  position: 'absolute',
                  left: x3 - 4,
                  top: '50%',
                  transform: `translate(-50%, -50%) scale(${trans1Scale})`,
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: `2.5px solid ${COLORS.ink}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 8,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 32 32">
                  <path
                    d="M 16 6 C 22 6 25 12 22 17 C 19 22 12 23 9 18 C 7 14 9 9 14 9 C 17 9 19 12 18 15"
                    stroke="#2A8F8D"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
            )}

            {/* Transition Badge 2 (between Clip 3 & 4) */}
            {trans2Scale > 0.01 && (
              <div
                style={{
                  position: 'absolute',
                  left: x4 - 4,
                  top: '50%',
                  transform: `translate(-50%, -50%) scale(${trans2Scale})`,
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: `2.5px solid ${COLORS.ink}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 8,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 15,
                    borderRadius: 4,
                    background: '#9B8CF2',
                    border: `2px solid ${COLORS.ink}`,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Track 3: Audio (♪) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 58,
              height: 64,
              borderRadius: 11,
              border: `2.2px solid ${COLORS.ink}`,
              background: COLORS.purpleLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 900,
              color: COLORS.ink,
              flexShrink: 0,
            }}
          >
            ♪
          </div>
          <div
            style={{
              flex: 1,
              height: 64,
              borderRadius: 12,
              background: audioVisible ? '#ECE8FA' : COLORS.trackBg,
              border: audioVisible ? `2.2px solid ${COLORS.ink}` : '2.2px solid transparent',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              boxSizing: 'border-box',
            }}
          >
            {audioVisible && (
              <>
                <span
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: 5,
                    fontFamily: FONT_MONO,
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: '#5E568A',
                  }}
                >
                  ♪ neon_beat_128bpm.wav
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 44,
                    marginTop: 10,
                  }}
                >
                  {WAVE_BARS.map((h, i) => {
                    const isPeak = i % 7 === 0;
                    return (
                      <div
                        key={i}
                        style={{
                          width: 3.5,
                          height: h,
                          borderRadius: 2,
                          background: isPeak ? '#E9B949' : i % 3 === 0 ? '#7E9CF2' : '#A496E8',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Yellow "▽ 卡点" button on right */}
                {beatSyncProgress > 0.05 && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 6,
                      top: 6,
                      bottom: 6,
                      width: 112,
                      borderRadius: 9,
                      border: `2.2px solid ${COLORS.ink}`,
                      background: COLORS.yellow,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      fontFamily: FONT_SANS,
                      fontSize: 18,
                      fontWeight: 900,
                      color: COLORS.ink,
                      transform: `scale(${Math.min(1, beatSyncProgress * 4)})`,
                    }}
                  >
                    ▽ 卡点
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Beat Marker Triangles under Audio Track */}
        <div
          style={{
            marginLeft: trackLeft + 6,
            width: trackWidth - 12,
            height: 18,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: 26 }).map((_, idx) => {
            const threshold = idx / 26;
            const lit = beatSyncProgress > threshold;
            const isActive = Math.abs(playheadRatio - threshold) < 0.04;
            return (
              <svg key={idx} width="14" height="12" viewBox="0 0 14 12" style={{ opacity: lit ? 1 : 0.12 }}>
                <polygon
                  points="1,1 13,1 7,11"
                  fill={isActive ? COLORS.cyan : COLORS.yellow}
                  stroke={COLORS.ink}
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            );
          })}
        </div>
      </div>

      {/* Rubber Stamp: "省 60% Token" */}
      {stampScale > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: 528,
            top: 22,
            transform: `rotate(-8deg) scale(${stampScale})`,
            background: '#F4FAF6',
            border: `3.5px solid ${COLORS.mintDark}`,
            borderRadius: 10,
            padding: '6px 18px',
            fontFamily: FONT_SANS,
            fontSize: 22,
            fontWeight: 900,
            color: COLORS.mintDark,
            boxShadow: '0 4px 12px rgba(62, 142, 110, 0.18)',
            zIndex: 25,
          }}
        >
          省 60% Token
        </div>
      )}

      {/* Red Playhead */}
      <div
        style={{
          position: 'absolute',
          left: playheadX,
          top: 32,
          bottom: 42,
          width: 2.5,
          background: COLORS.coral,
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          style={{ position: 'absolute', top: -10, left: -8 }}
        >
          <polygon
            points="2,1 16,1 16,12 9,19 2,12"
            fill={COLORS.coral}
            stroke={COLORS.ink}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bottom Status Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 4,
          color: COLORS.inkMuted,
          fontFamily: FONT_SANS,
          fontSize: 13.5,
          fontWeight: 600,
        }}
      >
        {/* Zoom slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>−</span>
          <div style={{ width: 96, height: 2, background: '#C5C1B5', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '45%',
                top: -5,
                width: 11,
                height: 11,
                borderRadius: '50%',
                background: COLORS.panel,
                border: '2px solid #8E8A7E',
              }}
            />
          </div>
          <span>+</span>
        </div>

        <div>片段 4 · 1080×1080 · 总时长 {totalDurText}</div>
      </div>
    </div>
  );
};
