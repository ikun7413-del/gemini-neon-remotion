import React from 'react';
import { COLORS, FONT_SANS } from '../theme';

interface RightPanelProps {
  depthProgress: number; // 0 (Mid / 38%) -> 1 (XHigh / 96%)
  accuracyProgress: number; // 0 (68%) -> 1 (99%)
  tokenProgress: number; // 0 (基准 / 85%) -> 1 (-60% / 24%)
  neonProgress: number; // 0 (32%) -> 1 (100%)
}

export const RightPanel: React.FC<RightPanelProps> = ({
  depthProgress,
  accuracyProgress,
  tokenProgress,
  neonProgress,
}) => {
  const depthPct = 38 + depthProgress * 58;
  const accPct = Math.round(68 + accuracyProgress * 31);
  const tokenSliderPct = 85 - tokenProgress * 61;
  const neonPct = Math.round(32 + neonProgress * 68);

  const avgBoost = (depthProgress + accuracyProgress + tokenProgress + neonProgress) / 4;
  const engineFill = 54 + avgBoost * 46;

  const sliders = [
    {
      label: '推理深度',
      valueText: depthProgress > 0.5 ? 'XHigh' : 'Mid',
      pillBg: depthProgress > 0.5 ? '#EAE4FD' : 'transparent',
      pillColor: depthProgress > 0.5 ? '#4C3B9E' : COLORS.inkMuted,
      pct: depthPct,
      fillColor: COLORS.purple,
    },
    {
      label: '代码准确',
      valueText: `${accPct}%`,
      pillBg: 'transparent',
      pillColor: accuracyProgress > 0.5 ? COLORS.ink : COLORS.inkMuted,
      pct: accPct,
      fillColor: '#67C3BA',
    },
    {
      label: 'Token 消耗',
      valueText: tokenProgress > 0.5 ? '-60%' : '基准',
      pillBg: tokenProgress > 0.5 ? '#DCF3EA' : 'transparent',
      pillColor: tokenProgress > 0.5 ? '#266E54' : COLORS.inkMuted,
      pct: tokenSliderPct,
      fillColor: '#76CCA9',
    },
    {
      label: '霓虹亮度',
      valueText: `${neonPct}%`,
      pillBg: neonProgress > 0.5 ? '#DDF4FC' : 'transparent',
      pillColor: neonProgress > 0.5 ? '#1B6E8C' : COLORS.inkMuted,
      pct: neonPct,
      fillColor: COLORS.cyan,
    },
  ];

  return (
    <div
      style={{
        width: 266,
        height: 556,
        borderRadius: 18,
        border: `2.5px solid ${COLORS.ink}`,
        background: COLORS.panel,
        padding: 18,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 12,
            borderBottom: '1.5px solid #E2E0D5',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 900, color: COLORS.ink }}>
              调参
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M12 2 Q13 11 22 12 Q13 13 12 22 Q11 13 2 12 Q11 11 12 2 Z"
                fill={COLORS.yellow}
                stroke={COLORS.ink}
                strokeWidth="2"
              />
            </svg>
          </div>
          <span style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.inkMuted, fontWeight: 600 }}>
            Neon 引擎
          </span>
        </div>

        {/* Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 22 }}>
          {sliders.map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 800, color: COLORS.ink }}>
                  {s.label}
                </span>
                <span
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 14,
                    fontWeight: 800,
                    color: s.pillColor,
                    background: s.pillBg,
                    padding: s.pillBg === 'transparent' ? '2px 4px' : '2px 10px',
                    borderRadius: 7,
                  }}
                >
                  {s.valueText}
                </span>
              </div>

              {/* Track */}
              <div
                style={{
                  position: 'relative',
                  height: 11,
                  borderRadius: 999,
                  background: '#E3E1D8',
                  border: `2px solid ${COLORS.ink}`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${s.pct}%`,
                    borderRadius: 999,
                    background: s.fillColor,
                  }}
                />
                {/* Knob */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${s.pct}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: `2.5px solid ${COLORS.ink}`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gemini 4 Neon Card */}
      <div
        style={{
          borderRadius: 14,
          border: `2.2px solid ${COLORS.ink}`,
          background: '#F4F3EA',
          padding: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M12 2 Q13 11 22 12 Q13 13 12 22 Q11 13 2 12 Q11 11 12 2 Z"
              fill={COLORS.cyan}
              stroke={COLORS.ink}
              strokeWidth="2"
            />
          </svg>
          <span style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 900, color: COLORS.ink }}>
            Gemini 4 · Neon
          </span>
        </div>
        <span style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: COLORS.inkMuted, fontWeight: 600 }}>
          深度推理 × 极速效率
        </span>
        <div
          style={{
            height: 12,
            borderRadius: 999,
            background: '#DFDDD2',
            border: `2px solid ${COLORS.ink}`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${engineFill}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #49D2F5 0%, #8E84F7 100%)',
              borderRadius: 999,
            }}
          />
        </div>
      </div>
    </div>
  );
};
