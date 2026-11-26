import React from 'react';
import { COLORS, FONT_SANS } from '../theme';
import { ClipArt, ClipKind } from './ClipArt';

interface PhonePreviewProps {
  frame: number;
  activeClip: ClipKind;
  isPlaying: boolean;
  showZzzOverlay?: boolean;
  showSubtitle?: boolean;
  sunglasses?: boolean;
  neonBoost?: number;
  finaleMode?: boolean;
  showNaNieLe?: boolean;
  likeCountText?: string;
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({
  frame,
  activeClip,
  isPlaying,
  showZzzOverlay = false,
  showSubtitle = false,
  sunglasses = false,
  neonBoost = 0,
  finaleMode = false,
  showNaNieLe = false,
  likeCountText = '10.2w',
}) => {
  const spinnerAngle = (frame * 14) % 360;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {/* Phone Frame */}
      <div
        style={{
          width: 326,
          height: 500,
          borderRadius: 42,
          background: COLORS.phoneBezel,
          padding: 11,
          boxSizing: 'border-box',
          position: 'relative',
          boxShadow: finaleMode
            ? '0 22px 48px rgba(30, 28, 25, 0.24)'
            : '0 8px 20px rgba(30, 28, 25, 0.14)',
        }}
      >
        {/* Side buttons */}
        <div style={{ position: 'absolute', left: -4, top: 96, width: 4, height: 28, borderRadius: 2, background: '#2C2A29' }} />
        <div style={{ position: 'absolute', left: -4, top: 142, width: 4, height: 48, borderRadius: 2, background: '#2C2A29' }} />
        <div style={{ position: 'absolute', right: -4, top: 128, width: 4, height: 64, borderRadius: 2, background: '#2C2A29' }} />

        {/* Inner Screen */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 32,
            border: `2px solid ${COLORS.phoneInner}`,
            overflow: 'hidden',
            position: 'relative',
            background: '#171C36',
          }}
        >
          {/* Clip Content */}
          <div
            style={{
              width: '100%',
              height: '100%',
              filter: showZzzOverlay ? 'grayscale(0.95) blur(4px) brightness(0.65)' : undefined,
            }}
          >
            <ClipArt
              kind={activeClip}
              frame={frame}
              sunglasses={sunglasses}
              neonBoost={neonBoost}
            />
          </div>

          {/* Dynamic Island */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 72,
              height: 18,
              borderRadius: 999,
              background: '#1C1B1A',
              zIndex: 20,
            }}
          />

          {/* Redundant Thinking ("冗长思考中..") Overlay */}
          {showZzzOverlay && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 15,
              }}
            >
              {/* Viewfinder corner brackets */}
              <div style={{ position: 'relative', width: 190, height: 170, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 22, height: 22, borderTop: '3.5px solid #FFF', borderLeft: '3.5px solid #FFF' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: 22, height: 22, borderTop: '3.5px solid #FFF', borderRight: '3.5px solid #FFF' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: 22, height: 22, borderBottom: '3.5px solid #FFF', borderLeft: '3.5px solid #FFF' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, borderBottom: '3.5px solid #FFF', borderRight: '3.5px solid #FFF' }} />

                {/* Spinner */}
                <svg width="46" height="46" viewBox="0 0 48 48" style={{ transform: `rotate(${spinnerAngle}deg)` }}>
                  <circle cx="24" cy="24" r="18" stroke="rgba(255,255,255,0.28)" strokeWidth="4.5" fill="none" />
                  <path d="M 24 6 A 18 18 0 0 1 42 24" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                </svg>

                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 24,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    textShadow: '0 2px 8px rgba(0,0,0,0.85)',
                    letterSpacing: 1,
                  }}
                >
                  冗长思考中..
                </div>
              </div>
            </div>
          )}

          {/* Subtitle Sticker ("✨XHigh 强推理!") */}
          {showSubtitle && !finaleMode && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 58,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                zIndex: 16,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M12 2 Q13 11 22 12 Q13 13 12 22 Q11 13 2 12 Q11 11 12 2 Z"
                  fill={COLORS.yellow}
                  stroke={COLORS.ink}
                  strokeWidth="2.5"
                />
              </svg>
              <span
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 30,
                  fontWeight: 900,
                  color: '#F7D252',
                  WebkitTextStroke: '5px #2C2A29',
                  paintOrder: 'stroke fill',
                  letterSpacing: 0.5,
                }}
              >
                XHigh 强推理!
              </span>
            </div>
          )}

          {/* Finale "拿捏了!" Comic Headline */}
          {showNaNieLe && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 156,
                textAlign: 'center',
                zIndex: 18,
                transform: 'rotate(-5deg)',
              }}
            >
              <span
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 44,
                  fontWeight: 900,
                  color: '#F7D252',
                  WebkitTextStroke: '7px #2C2A29',
                  paintOrder: 'stroke fill',
                  letterSpacing: 2,
                }}
              >
                拿捏了!
              </span>
            </div>
          )}

          {/* Finale Social Short-Video Overlay */}
          {finaleMode && (
            <>
              {/* Right action rail */}
              <div
                style={{
                  position: 'absolute',
                  right: 12,
                  bottom: 84,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 14,
                  zIndex: 19,
                }}
              >
                {/* Avatar */}
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#4E92F8',
                      border: '2.5px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        d="M12 2 Q13 11 22 12 Q13 13 12 22 Q11 13 2 12 Q11 11 12 2 Z"
                        fill={COLORS.yellow}
                        stroke={COLORS.ink}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -5,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: COLORS.coral,
                      border: '1.5px solid #FFF',
                    }}
                  />
                </div>

                {/* Like */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <svg width="30" height="28" viewBox="0 0 24 22">
                    <path
                      d="M12 20 C12 20 2 13 2 6.5 C2 3.2 4.6 1 7.6 1 C9.6 1 11.2 2.1 12 3.5 C12.8 2.1 14.4 1 16.4 1 C19.4 1 22 3.2 22 6.5 C22 13 12 20 12 20 Z"
                      fill="#FF7CA8"
                      stroke={COLORS.ink}
                      strokeWidth="2"
                    />
                  </svg>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 800, color: '#FFF', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                    {likeCountText}
                  </span>
                </div>

                {/* Comment */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <svg width="28" height="26" viewBox="0 0 28 26">
                    <rect x="2" y="2" width="24" height="18" rx="6" fill="#FFFFFF" stroke={COLORS.ink} strokeWidth="2" />
                    <polygon points="8,20 14,20 10,25" fill="#FFFFFF" stroke={COLORS.ink} strokeWidth="2" />
                    <circle cx="9" cy="11" r="1.6" fill={COLORS.ink} />
                    <circle cx="14" cy="11" r="1.6" fill={COLORS.ink} />
                    <circle cx="19" cy="11" r="1.6" fill={COLORS.ink} />
                  </svg>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 800, color: '#FFF', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                    2333
                  </span>
                </div>

                {/* Share */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <svg width="28" height="26" viewBox="0 0 28 26">
                    <path
                      d="M16 4 L26 12 L16 20 L16 15 C9 15 5 18 3 23 C4 14 9 9 16 9 Z"
                      fill="#FFFFFF"
                      stroke={COLORS.ink}
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 800, color: '#FFF', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                    分享
                  </span>
                </div>
              </div>

              {/* Bottom Left Author & Tags */}
              <div
                style={{
                  position: 'absolute',
                  left: 14,
                  bottom: 18,
                  zIndex: 19,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 18,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    WebkitTextStroke: '3px #2C2A29',
                    paintOrder: 'stroke fill',
                  }}
                >
                  @Gemini · 4 Neon
                </div>
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#F2F4FF',
                    textShadow: '0 1px 4px rgba(0,0,0,0.85)',
                  }}
                >
                  #AI编程 #强推理 #极速出片
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Transport Controls below phone */}
      {!finaleMode && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: COLORS.inkSoft }}>
          <span style={{ fontSize: 15, fontWeight: 800 }}>|◀</span>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: `2.2px solid ${COLORS.ink}`,
              background: COLORS.panel,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 900,
              color: COLORS.ink,
            }}
          >
            {isPlaying ? '❚❚' : '▶'}
          </div>
          <span style={{ fontSize: 15, fontWeight: 800 }}>▶|</span>
        </div>
      )}
    </div>
  );
};
