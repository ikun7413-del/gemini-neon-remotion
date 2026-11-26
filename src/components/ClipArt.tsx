import React from 'react';
import { COLORS, FONT_MONO, FONT_SANS } from '../theme';
import { Mascot } from './Mascot';

export type ClipKind = 'code' | 'reason' | 'context' | 'neon';

interface ClipArtProps {
  kind: ClipKind;
  frame: number;
  compact?: boolean;
  sunglasses?: boolean;
  neonBoost?: number; // 0 to 1
}

export const ClipArt: React.FC<ClipArtProps> = ({
  kind,
  frame,
  compact = false,
  sunglasses = false,
  neonBoost = 0,
}) => {
  if (kind === 'code') {
    const scanY = 25 + ((frame * 2.2) % 60);
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #273262 0%, #1B2347 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: compact ? 6 : 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        {/* Code Editor Window */}
        <div
          style={{
            flex: 1,
            background: '#131A33',
            borderRadius: compact ? 6 : 16,
            border: `${compact ? 1.5 : 2.5}px solid #2A3561`,
            padding: compact ? 5 : 14,
            display: 'flex',
            flexDirection: 'column',
            gap: compact ? 4 : 10,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 3 : 7 }}>
            <div style={{ width: compact ? 4 : 9, height: compact ? 4 : 9, borderRadius: '50%', background: '#EC6A5E' }} />
            <div style={{ width: compact ? 4 : 9, height: compact ? 4 : 9, borderRadius: '50%', background: '#F4BF4F' }} />
            <div style={{ width: compact ? 4 : 9, height: compact ? 4 : 9, borderRadius: '50%', background: '#61C554' }} />
            {!compact && (
              <span
                style={{
                  marginLeft: 18,
                  color: '#9BA8D6',
                  fontSize: 13,
                  fontFamily: FONT_MONO,
                  fontWeight: 600,
                }}
              >
                agent_refactor.ts
              </span>
            )}
          </div>

          {/* Code lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 10, marginTop: compact ? 2 : 6 }}>
            <div style={{ width: '42%', height: compact ? 3 : 9, borderRadius: 6, background: '#65B5FF' }} />
            <div style={{ width: '74%', height: compact ? 3 : 9, borderRadius: 6, background: '#A594F9', marginLeft: '10%' }} />
            <div style={{ width: '60%', height: compact ? 3 : 9, borderRadius: 6, background: '#EFCB5C', marginLeft: '10%' }} />
            {/* Diff - */}
            <div
              style={{
                background: 'rgba(232, 93, 110, 0.2)',
                borderRadius: 6,
                padding: compact ? '2px 3px' : '5px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: compact ? 3 : 8,
              }}
            >
              {!compact && <span style={{ color: '#F0717E', fontFamily: FONT_MONO, fontSize: 12 }}>-</span>}
              <div style={{ width: '78%', height: compact ? 3 : 9, borderRadius: 6, background: '#E26D6D' }} />
            </div>
            {/* Diff + */}
            <div
              style={{
                background: 'rgba(72, 211, 165, 0.22)',
                borderRadius: 6,
                padding: compact ? '2px 3px' : '5px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: compact ? 3 : 8,
              }}
            >
              {!compact && <span style={{ color: '#58E0B4', fontFamily: FONT_MONO, fontSize: 12 }}>+</span>}
              <div style={{ width: '82%', height: compact ? 3 : 9, borderRadius: 6, background: '#4AD6AA' }} />
            </div>
            <div
              style={{
                background: 'rgba(72, 211, 165, 0.16)',
                borderRadius: 6,
                padding: compact ? '2px 3px' : '5px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: compact ? 3 : 8,
              }}
            >
              {!compact && <span style={{ color: '#58E0B4', fontFamily: FONT_MONO, fontSize: 12 }}>+</span>}
              <div style={{ width: '68%', height: compact ? 3 : 9, borderRadius: 6, background: '#4AD6AA' }} />
            </div>
            <div style={{ width: '52%', height: compact ? 3 : 9, borderRadius: 6, background: '#65B5FF', marginLeft: '10%' }} />
            <div style={{ width: '64%', height: compact ? 3 : 9, borderRadius: 6, background: '#52D5F0', marginLeft: '10%' }} />
            <div style={{ width: '36%', height: compact ? 3 : 9, borderRadius: 6, background: '#A594F9' }} />
          </div>

          {/* Glowing cyan scan line */}
          {!compact && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${scanY}%`,
                height: 3,
                background: 'linear-gradient(90deg, transparent, #4CE2FF, transparent)',
                boxShadow: '0 0 12px #4CE2FF',
                opacity: 0.85,
              }}
            />
          )}
        </div>

        {/* Bottom 42 Tests Passed Card */}
        <div
          style={{
            marginTop: compact ? 4 : 12,
            background: '#E2F7EE',
            border: `${compact ? 1.5 : 2.5}px solid ${COLORS.ink}`,
            borderRadius: compact ? 6 : 14,
            padding: compact ? '3px 5px' : '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: compact ? 4 : 10,
          }}
        >
          <div
            style={{
              width: compact ? 10 : 28,
              height: compact ? 10 : 28,
              borderRadius: '50%',
              background: '#7AE3B7',
              border: `${compact ? 1 : 2.2}px solid ${COLORS.ink}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: compact ? 7 : 15,
              fontWeight: 900,
              color: COLORS.ink,
              flexShrink: 0,
            }}
          >
            ✓
          </div>
          <div style={{ lineHeight: 1.15 }}>
            <div
              style={{
                fontSize: compact ? 7 : 17,
                fontWeight: 800,
                color: COLORS.ink,
                fontFamily: FONT_SANS,
                whiteSpace: 'nowrap',
              }}
            >
              42 Tests Passed
            </div>
            {!compact && (
              <div style={{ fontSize: 12, color: COLORS.mintDark, fontWeight: 700, fontFamily: FONT_SANS }}>
                一次重构 · 零报错
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'reason') {
    const orbitRot = (frame * 1.1) % 360;
    const pulse = 1 + Math.sin(frame * 0.16) * 0.06;
    const nodes = [
      { angle: -90, color: '#F6D25B', r: 90 },
      { angle: -42, color: '#47C4E6', r: 92 },
      { angle: 2, color: '#F6D25B', r: 88 },
      { angle: 48, color: '#D3A6FF', r: 90 },
      { angle: 92, color: '#47C4E6', r: 88 },
      { angle: 138, color: '#58E0B4', r: 92 },
      { angle: 184, color: '#D3A6FF', r: 88 },
      { angle: 228, color: '#F6D25B', r: 92 },
    ];

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 45%, #3C428A 0%, #24275B 65%, #1A1D45 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 260 360"
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Glow rings */}
          <circle cx="130" cy="162" r="76" fill="rgba(116, 178, 255, 0.12)" />
          <circle cx="130" cy="162" r="50" fill="rgba(116, 178, 255, 0.18)" />

          {/* Dashed rays & orbiting nodes */}
          <g transform={`rotate(${orbitRot * 0.25} 130 162)`}>
            {nodes.map((n, idx) => {
              const rad = (n.angle * Math.PI) / 180;
              const nx = 130 + Math.cos(rad) * n.r;
              const ny = 162 + Math.sin(rad) * n.r;
              return (
                <g key={idx}>
                  <line
                    x1="130"
                    y1="162"
                    x2={nx}
                    y2={ny}
                    stroke="#6FC7FF"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    opacity="0.7"
                  />
                  <circle cx={nx} cy={ny} r="9" fill={n.color} stroke={COLORS.ink} strokeWidth="2.5" />
                </g>
              );
            })}
          </g>

          {/* Center Gemini 4-point Star */}
          <g transform={`translate(130, 162) scale(${pulse})`}>
            <path
              d="M 0 -46 Q 4 -6 44 0 Q 4 6 0 46 Q -4 6 -44 0 Q -4 -6 0 -46 Z"
              fill="#7CB4FF"
              stroke={COLORS.ink}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M 0 -24 Q 2 -3 22 0 Q 2 3 0 24 Q -2 3 -22 0 Q -2 -3 0 -24 Z"
              fill="#F5FBFF"
            />
          </g>
        </svg>

        {!compact && (
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              background: '#FAF9F2',
              border: `2.5px solid ${COLORS.ink}`,
              borderRadius: 999,
              padding: '8px 24px',
              fontSize: 17,
              fontWeight: 800,
              color: COLORS.ink,
              fontFamily: FONT_SANS,
              boxShadow: '0 4px 0 rgba(0,0,0,0.2)',
            }}
          >
            XHigh 深度推理
          </div>
        )}
      </div>
    );
  }

  if (kind === 'context') {
    const beamY = 30 + Math.sin(frame * 0.14) * 20 + 18;
    const docs = [
      { label: 'API', color: '#63B8FF', bg: '#FFFFFF', rot: -4, y: 0 },
      { label: 'PDF', color: '#4AD5EB', bg: '#EBF8FF', rot: 2.5, y: 26 },
      { label: 'REPO', color: '#A594F9', bg: '#F1EEFF', rot: -2, y: 56 },
      { label: '1M', color: '#F6D25B', bg: '#FEF7DD', rot: 2, y: 88 },
    ];

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #D5F5EB 0%, #E7F9E8 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: compact ? 8 : 34,
          boxSizing: 'border-box',
        }}
      >
        {/* Top pill */}
        <div
          style={{
            background: '#27292A',
            color: '#6CF0D8',
            fontFamily: FONT_MONO,
            fontSize: compact ? 7 : 18,
            fontWeight: 800,
            padding: compact ? '2px 7px' : '8px 20px',
            borderRadius: 999,
            letterSpacing: 0.4,
          }}
        >
          1,000,000 Tokens
        </div>

        {/* Cute floating heart */}
        {!compact && (
          <div style={{ position: 'absolute', right: 32, top: 96, fontSize: 22 }}>
            <svg width="24" height="22" viewBox="0 0 24 22">
              <path
                d="M12 20 C12 20 2 13 2 6.5 C2 3.2 4.6 1 7.6 1 C9.6 1 11.2 2.1 12 3.5 C12.8 2.1 14.4 1 16.4 1 C19.4 1 22 3.2 22 6.5 C22 13 12 20 12 20 Z"
                fill="#FF82B0"
                stroke={COLORS.ink}
                strokeWidth="2.2"
              />
            </svg>
          </div>
        )}

        {/* Stacked documents */}
        <div
          style={{
            position: 'relative',
            width: compact ? '78%' : 210,
            height: compact ? 70 : 190,
            marginTop: compact ? 8 : 32,
          }}
        >
          {docs.map((doc, idx) => (
            <div
              key={doc.label}
              style={{
                position: 'absolute',
                left: idx % 2 === 0 ? 0 : compact ? 6 : 16,
                top: compact ? doc.y * 0.34 : doc.y,
                width: compact ? '86%' : 186,
                height: compact ? 26 : 74,
                background: doc.bg,
                border: `${compact ? 1.5 : 2.5}px solid ${COLORS.ink}`,
                borderRadius: compact ? 5 : 12,
                transform: `rotate(${doc.rot}deg)`,
                padding: compact ? 4 : 10,
                boxSizing: 'border-box',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: compact ? 4 : 10,
                  top: compact ? 3 : 8,
                  background: doc.color,
                  border: `${compact ? 1 : 2}px solid ${COLORS.ink}`,
                  borderRadius: compact ? 4 : 7,
                  padding: compact ? '0px 3px' : '2px 8px',
                  fontSize: compact ? 6 : 12,
                  fontWeight: 800,
                  fontFamily: FONT_MONO,
                  color: COLORS.ink,
                }}
              >
                {doc.label}
              </div>
              <div style={{ width: '48%', height: compact ? 2 : 5, background: '#CFCBC0', borderRadius: 4, marginTop: compact ? 2 : 6 }} />
              <div style={{ width: '64%', height: compact ? 2 : 5, background: '#DFDBD0', borderRadius: 4, marginTop: compact ? 3 : 8 }} />
              {!compact && (
                <div style={{ width: '40%', height: 5, background: '#DFDBD0', borderRadius: 4, marginTop: 8 }} />
              )}
            </div>
          ))}
        </div>

        {/* Cyan laser scan line */}
        <div
          style={{
            position: 'absolute',
            left: compact ? 6 : 16,
            right: compact ? 6 : 16,
            top: `${beamY}%`,
            height: compact ? 2.5 : 5,
            borderRadius: 4,
            background: '#46D9F5',
            boxShadow: '0 0 14px #46D9F5',
          }}
        />
      </div>
    );
  }

  // 'neon' Disco Stage!
  const danceBounce = Math.abs(Math.sin(frame * 0.35)) * (compact ? 4 : 12);
  const discoCols = ['#49D2F5', '#9A8BF5', '#F6D25B', '#5C8FF5', '#E87BC2', '#52E0B5'];
  const tileShift = Math.floor(frame / 4);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(180deg, #2D266A 0%, #44358A 58%, #18173D 58%, #161638 100%)`,
        position: 'relative',
        overflow: 'hidden',
        filter: neonBoost > 0 ? `saturate(${1 + neonBoost * 0.35}) brightness(${1 + neonBoost * 0.08})` : undefined,
      }}
    >
      {/* Spotlights & Hanging Gemini Disco Star */}
      <svg width="100%" height="100%" viewBox="0 0 280 420" style={{ position: 'absolute', inset: 0 }}>
        {/* Beams */}
        <polygon points="140,62 0,145 0,210 140,62" fill="#5CCBFF" opacity="0.26" />
        <polygon points="140,62 280,155 280,220 140,62" fill="#C48BFF" opacity="0.26" />
        <polygon points="140,62 96,260 184,260" fill="#7CE5FF" opacity="0.22" />

        {/* Hanging string */}
        <line x1="140" y1="0" x2="140" y2="42" stroke={COLORS.ink} strokeWidth="2.5" />
        <circle cx="140" cy="64" r="26" fill="#4696FA" opacity="0.32" />
        <path
          d="M 140 34 Q 143 60 168 64 Q 143 68 140 94 Q 137 68 112 64 Q 137 60 140 34 Z"
          fill="#69B9FF"
          stroke={COLORS.ink}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Perspective Checkered Disco Dance Floor */}
        {Array.from({ length: 6 }).map((_, row) => {
          const y1 = 250 + row * 29;
          const y2 = y1 + 29;
          const wTop = 84 + row * 28;
          const wBot = 84 + (row + 1) * 28;
          const cols = 6;
          return Array.from({ length: cols }).map((__, col) => {
            const x1L = 140 - wTop / 2 + (wTop / cols) * col;
            const x1R = 140 - wTop / 2 + (wTop / cols) * (col + 1);
            const x2L = 140 - wBot / 2 + (wBot / cols) * col;
            const x2R = 140 - wBot / 2 + (wBot / cols) * (col + 1);
            const color = discoCols[(row * 3 + col + tileShift) % discoCols.length];
            return (
              <polygon
                key={`${row}-${col}`}
                points={`${x1L},${y1} ${x1R},${y1} ${x2R},${y2} ${x2L},${y2}`}
                fill={color}
                stroke={COLORS.ink}
                strokeWidth="1.8"
                opacity="0.92"
              />
            );
          });
        })}

        {/* Floating sparkles */}
        <path d="M 46 218 L 51 208 L 56 218 L 66 223 L 56 228 L 51 238 L 46 228 L 36 223 Z" fill="#FFFFFF" stroke={COLORS.ink} strokeWidth="1.5" />
        <path d="M 220 140 L 223 133 L 226 140 L 233 143 L 226 146 L 223 153 L 220 146 L 213 143 Z" fill="#FFFFFF" stroke={COLORS.ink} strokeWidth="1.5" />
        <path d="M 44 282 L 48 274 L 52 282 L 60 286 L 52 290 L 48 298 L 44 290 L 36 286 Z" fill="#F6D25B" stroke={COLORS.ink} strokeWidth="1.5" />
      </svg>

      {/* Dancing Mascot */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: compact ? '48%' : '45%',
          transform: `translate(-50%, ${-danceBounce}px)`,
        }}
      >
        <Mascot
          size={compact ? 42 : 126}
          expression="excited"
          sunglasses={sunglasses}
          raiseArms
          walkPhase={frame * 0.45}
        />
      </div>
    </div>
  );
};
