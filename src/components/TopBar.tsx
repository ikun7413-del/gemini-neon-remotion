import React from 'react';
import { COLORS, FONT_MONO, FONT_SANS, FPS } from '../theme';
import { Mascot } from './Mascot';

interface TopBarProps {
  frame: number;
  exportProgress: number; // -1 = idle, 0..1 = rendering, >=1.01 = done
}

function formatTimecode(frame: number): string {
  const clamped = Math.max(0, Math.min(frame, 420));
  const totalSec = Math.floor(clamped / FPS);
  const f = clamped % FPS;
  const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const ss = String(totalSec % 60).padStart(2, '0');
  const ff = String(f).padStart(2, '0');
  return `00:${mm}:${ss}:${ff}`;
}

export const TopBar: React.FC<TopBarProps> = ({ frame, exportProgress }) => {
  const isRendering = exportProgress >= 0 && exportProgress < 1;
  const isDone = exportProgress >= 1;
  const pct = Math.min(100, Math.round(exportProgress * 100));

  return (
    <div
      style={{
        height: 56,
        borderRadius: 16,
        border: `2.5px solid ${COLORS.ink}`,
        background: COLORS.panel,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        boxSizing: 'border-box',
      }}
    >
      {/* Left: traffic lights + mini mascot + filename */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#F29A8E', border: `1.8px solid ${COLORS.ink}` }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#F7D26A', border: `1.8px solid ${COLORS.ink}` }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#8ED8A3', border: `1.8px solid ${COLORS.ink}` }} />
        </div>
        <div style={{ marginLeft: 4, display: 'flex', alignItems: 'center' }}>
          <Mascot size={26} expression="happy" />
        </div>
        <span
          style={{
            fontFamily: FONT_SANS,
            fontSize: 18,
            fontWeight: 800,
            color: COLORS.ink,
            letterSpacing: -0.2,
          }}
        >
          Gemini_Neon_宣传片_v4.mp4
        </span>
      </div>

      {/* Center: timecode + context + resolution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            background: '#33312E',
            color: '#FAF9F2',
            fontFamily: FONT_MONO,
            fontSize: 18,
            fontWeight: 700,
            padding: '5px 18px',
            borderRadius: 10,
            letterSpacing: 0.6,
          }}
        >
          {formatTimecode(frame)}
        </div>
        <span style={{ fontFamily: FONT_SANS, fontSize: 14, color: COLORS.inkMuted, fontWeight: 600 }}>
          · 1M 上下文
        </span>
        <div
          style={{
            border: `2px solid ${COLORS.ink}`,
            borderRadius: 10,
            padding: '4px 12px',
            fontFamily: FONT_MONO,
            fontSize: 14,
            fontWeight: 700,
            color: COLORS.ink,
            background: COLORS.panelSoft,
          }}
        >
          1080×1080
        </div>
      </div>

      {/* Right: Export / Render / Done Button */}
      <div
        style={{
          position: 'relative',
          width: 162,
          height: 36,
          borderRadius: 11,
          border: `2.5px solid ${COLORS.ink}`,
          background: isDone ? '#B2E7CB' : isRendering ? COLORS.yellow : COLORS.teal,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isRendering && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${pct}%`,
              background: '#A4E1A2',
            }}
          />
        )}
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: FONT_SANS,
            fontSize: 16,
            fontWeight: 800,
            color: isRendering ? COLORS.ink : isDone ? '#265E45' : '#FFFFFF',
            letterSpacing: 0.5,
          }}
        >
          {isDone ? '完成 ✓' : isRendering ? `渲染 ${pct}%` : '↑ 导出'}
        </span>
      </div>
    </div>
  );
};
