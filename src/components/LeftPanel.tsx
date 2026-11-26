import React from 'react';
import { COLORS, FONT_MONO, FONT_SANS } from '../theme';
import { ClipArt, ClipKind } from './ClipArt';
import { Mascot } from './Mascot';

export type LeftTab = 'media' | 'fx' | 'sub';

interface LeftPanelProps {
  frame: number;
  activeTab: LeftTab;
  highlightedClip?: ClipKind | null;
}

const MEDIA_ITEMS: Array<{ kind: ClipKind; name: string; dur: string }> = [
  { kind: 'code', name: '代码重构.ts', dur: '2.2s' },
  { kind: 'reason', name: '深度推理.ai', dur: '3.4s' },
  { kind: 'context', name: '1M上下文.doc', dur: '2.6s' },
  { kind: 'neon', name: 'Neon高能.mp4', dur: '3.8s' },
];

export const LeftPanel: React.FC<LeftPanelProps> = ({
  frame,
  activeTab,
  highlightedClip,
}) => {
  const tabs: Array<{ id: LeftTab; label: string }> = [
    { id: 'media', label: '素材' },
    { id: 'fx', label: '特效' },
    { id: 'sub', label: '字幕' },
  ];

  return (
    <div
      style={{
        width: 266,
        height: 556,
        borderRadius: 18,
        border: `2.5px solid ${COLORS.ink}`,
        background: COLORS.panel,
        padding: 14,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8 }}>
        {tabs.map((t) => {
          const active = activeTab === t.id;
          return (
            <div
              key={t.id}
              style={{
                flex: 1,
                height: 34,
                borderRadius: 9,
                border: `2.2px solid ${COLORS.ink}`,
                background: active ? COLORS.yellow : COLORS.panelSoft,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT_SANS,
                fontSize: 15,
                fontWeight: 800,
                color: active ? COLORS.ink : COLORS.inkMuted,
              }}
            >
              {t.label}
            </div>
          );
        })}
      </div>

      {/* Tab Body */}
      {activeTab === 'media' && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
            }}
          >
            {MEDIA_ITEMS.map((item) => {
              const isSelected = highlightedClip === item.kind;
              return (
                <div key={item.kind} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div
                    style={{
                      height: 136,
                      borderRadius: 12,
                      border: `2.5px solid ${isSelected ? COLORS.yellow : COLORS.ink}`,
                      boxShadow: isSelected ? `0 0 0 2px ${COLORS.yellow}` : 'none',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <ClipArt kind={item.kind} frame={frame} compact />
                    <div
                      style={{
                        position: 'absolute',
                        right: 5,
                        bottom: 5,
                        background: 'rgba(28, 28, 30, 0.8)',
                        color: '#FFFFFF',
                        fontSize: 10,
                        fontFamily: FONT_MONO,
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: 6,
                      }}
                    >
                      {item.dur}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontFamily: FONT_SANS,
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: COLORS.ink,
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dropzone */}
          <div
            style={{
              flex: 1,
              borderRadius: 14,
              border: '2px dashed #C7C3B6',
              background: '#F5F4EB',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: 8,
            }}
          >
            <svg width="26" height="26" viewBox="0 0 32 32">
              <path
                d="M 16 3 Q 17 15 29 16 Q 17 17 16 29 Q 15 17 3 16 Q 15 15 16 3 Z"
                fill="#DCEEF8"
                stroke="#8B96A4"
                strokeWidth="2"
              />
            </svg>
            <div style={{ fontFamily: FONT_SANS, fontSize: 13.5, fontWeight: 700, color: COLORS.inkMuted }}>
              + 拖入任意代码 / 文档
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 11.5, color: '#A5A196' }}>
              支持 1M Context 直出
            </div>
          </div>
        </>
      )}

      {activeTab === 'fx' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1 }}>
          {[
            { name: '旋转切', bg: '#E3F6F3', icon: 'swirl', active: true },
            { name: '霓虹故障', bg: '#F0EBFC', icon: 'glitch', active: true },
            { name: '翻页', bg: '#FDF4D7', icon: 'flip', active: false },
            { name: '缩放冲击', bg: '#FDE8EA', icon: 'zoom', active: false },
            { name: '光束扫过', bg: '#E5F4FC', icon: 'beam', active: false },
            { name: '星芒转场', bg: '#FEF6DF', icon: 'star', active: false },
          ].map((fx) => (
            <div
              key={fx.name}
              style={{
                borderRadius: 14,
                border: `2.2px solid ${COLORS.ink}`,
                background: fx.bg,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: 10,
              }}
            >
              {fx.icon === 'swirl' ? (
                <svg width="46" height="46" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="#B9ECE6" stroke={COLORS.ink} strokeWidth="2.5" />
                  <path
                    d="M 24 12 C 31 12 34 19 31 25 C 28 30 20 31 16 26 C 13 22 15 16 20 15 C 24 14 27 17 26 21 C 25 24 21 24 21 21"
                    stroke="#2A8F8D"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              ) : fx.icon === 'glitch' ? (
                <Mascot size={46} expression="happy" />
              ) : fx.icon === 'flip' ? (
                <div style={{ width: 42, height: 34, borderRadius: 6, background: '#FFFDF7', border: `2.2px solid ${COLORS.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18 }}>
                  ◫
                </div>
              ) : fx.icon === 'zoom' ? (
                <div style={{ width: 42, height: 42, borderRadius: 10, border: `2.2px solid ${COLORS.coral}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.coral, fontSize: 22, fontWeight: 900 }}>
                  ⊕
                </div>
              ) : fx.icon === 'beam' ? (
                <div style={{ width: 42, height: 34, borderRadius: 8, background: 'linear-gradient(135deg, #47C4E6, #E5F4FC)', border: `2.2px solid ${COLORS.ink}` }} />
              ) : (
                <svg width="40" height="40" viewBox="0 0 36 36">
                  <path d="M18 3 Q19 16 33 18 Q19 20 18 33 Q17 20 3 18 Q17 16 18 3 Z" fill={COLORS.yellow} stroke={COLORS.ink} strokeWidth="2.2" />
                </svg>
              )}
              <span style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 800, color: COLORS.ink }}>
                {fx.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'sub' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          {/* Card 1: 爆款贴纸 */}
          <div
            style={{
              flex: 1,
              borderRadius: 14,
              border: `2.5px solid ${COLORS.ink}`,
              boxShadow: `0 0 0 2.5px ${COLORS.yellow}`,
              background: '#FEF4D5',
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.inkMuted, fontWeight: 700 }}>
              爆款贴纸
            </span>
            <div
              style={{
                textAlign: 'center',
                fontFamily: FONT_SANS,
                fontSize: 24,
                fontWeight: 900,
                color: '#F7D252',
                WebkitTextStroke: '2px #2C2A29',
                paintOrder: 'stroke fill',
                marginBottom: 14,
              }}
            >
              XHigh 强推理!
            </div>
          </div>

          {/* Card 2: 效率气泡 */}
          <div
            style={{
              flex: 1,
              borderRadius: 14,
              border: `2.2px solid ${COLORS.ink}`,
              background: '#E5F7F9',
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.inkMuted, fontWeight: 700 }}>
              效率气泡
            </span>
            <div
              style={{
                alignSelf: 'center',
                background: '#FFFFFF',
                border: '2px solid #45B7B8',
                borderRadius: 999,
                padding: '7px 18px',
                fontFamily: FONT_SANS,
                fontSize: 18,
                fontWeight: 800,
                color: '#2A7A7B',
                marginBottom: 12,
              }}
            >
              省 60% Token
            </div>
          </div>

          {/* Card 3: 霓虹发光 */}
          <div
            style={{
              flex: 1,
              borderRadius: 14,
              border: `2.2px solid ${COLORS.ink}`,
              background: '#1E1D3B',
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontFamily: FONT_SANS, fontSize: 12, color: '#9BA0C4', fontWeight: 700 }}>
              霓虹发光
            </span>
            <div
              style={{
                textAlign: 'center',
                fontFamily: FONT_SANS,
                fontSize: 22,
                fontWeight: 900,
                color: '#FFFFFF',
                textShadow: '0 0 12px #78A8FF, 0 0 22px #9A8BF5',
                letterSpacing: 1,
                marginBottom: 14,
              }}
            >
              GEMINI NEON
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
