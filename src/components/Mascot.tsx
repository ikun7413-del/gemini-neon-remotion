import React from 'react';
import { COLORS } from '../theme';

export type MascotExpression = 'happy' | 'wink' | 'annoyed' | 'determined' | 'excited';

interface MascotProps {
  size?: number;
  expression?: MascotExpression;
  sunglasses?: boolean;
  raiseArms?: boolean;
  waveRightArm?: boolean;
  hideRightArm?: boolean;
  walkPhase?: number;
  style?: React.CSSProperties;
}

export const Mascot: React.FC<MascotProps> = ({
  size = 96,
  expression = 'happy',
  sunglasses = false,
  raiseArms = false,
  waveRightArm = false,
  hideRightArm = false,
  walkPhase = 0,
  style,
}) => {
  const legBounceA = Math.sin(walkPhase) * 3;
  const legBounceB = Math.sin(walkPhase + Math.PI) * 3;

  return (
    <svg
      width={size}
      height={size * 0.92}
      viewBox="0 0 120 110"
      fill="none"
      style={{ overflow: 'visible', ...style }}
    >
      <defs>
        <linearGradient id="mascotBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#72CCFF" />
          <stop offset="100%" stopColor="#4A8DF6" />
        </linearGradient>
      </defs>

      {/* Legs (4 cute blue stubby legs) */}
      <rect
        x="26"
        y={78 + legBounceA}
        width="10"
        height="22"
        rx="4"
        fill="#5393F5"
        stroke={COLORS.ink}
        strokeWidth="3"
      />
      <rect
        x="40"
        y={78 + legBounceB}
        width="10"
        height="22"
        rx="4"
        fill="#4A85E8"
        stroke={COLORS.ink}
        strokeWidth="3"
      />
      <rect
        x="70"
        y={78 + legBounceB}
        width="10"
        height="22"
        rx="4"
        fill="#4A85E8"
        stroke={COLORS.ink}
        strokeWidth="3"
      />
      <rect
        x="84"
        y={78 + legBounceA}
        width="10"
        height="22"
        rx="4"
        fill="#5393F5"
        stroke={COLORS.ink}
        strokeWidth="3"
      />

      {/* Left Arm */}
      {raiseArms ? (
        <g>
          <path
            d="M 18 52 Q 2 34 8 18"
            stroke={COLORS.ink}
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 18 52 Q 2 34 8 18"
            stroke="#5BB4FF"
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="8" cy="17" r="6" fill="#63C7FF" stroke={COLORS.ink} strokeWidth="2.8" />
        </g>
      ) : (
        <rect
          x="8"
          y="46"
          width="11"
          height="13"
          rx="4"
          fill="#5BB4FF"
          stroke={COLORS.ink}
          strokeWidth="2.8"
        />
      )}

      {/* Right Arm */}
      {!hideRightArm &&
        (raiseArms ? (
          <g>
            <path
              d="M 102 52 Q 118 34 112 18"
              stroke={COLORS.ink}
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 102 52 Q 118 34 112 18"
              stroke="#5BB4FF"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="112" cy="17" r="6" fill="#63C7FF" stroke={COLORS.ink} strokeWidth="2.8" />
          </g>
        ) : waveRightArm ? (
          <g>
            <path
              d="M 102 50 L 138 18"
              stroke={COLORS.ink}
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 102 50 L 138 18"
              stroke="#5BB4FF"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <circle cx="140" cy="16" r="6" fill="#63C7FF" stroke={COLORS.ink} strokeWidth="2.8" />
          </g>
        ) : (
          <rect
            x="101"
            y="46"
            width="11"
            height="13"
            rx="4"
            fill="#5BB4FF"
            stroke={COLORS.ink}
            strokeWidth="2.8"
          />
        ))}

      {/* Main Rectangular Rounded Body */}
      <rect
        x="18"
        y="24"
        width="84"
        height="58"
        rx="12"
        fill="url(#mascotBodyGrad)"
        stroke={COLORS.ink}
        strokeWidth="3.2"
      />
      {/* Subtle top highlight */}
      <path
        d="M 28 31 H 92"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Sunglasses resting on top */}
      {sunglasses && (
        <g transform="translate(0, -3)">
          <path
            d="M 33 14 L 58 14 L 55 27 L 36 27 Z"
            fill="#222328"
            stroke={COLORS.ink}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M 62 14 L 87 14 L 84 27 L 65 27 Z"
            fill="#222328"
            stroke={COLORS.ink}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <line x1="56" y1="19" x2="64" y2="19" stroke={COLORS.ink} strokeWidth="3" />
          {/* Glare stripes */}
          <line x1="40" y1="24" x2="46" y2="16" stroke="#8CE8FF" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="47" y1="24" x2="51" y2="18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="69" y1="24" x2="75" y2="16" stroke="#8CE8FF" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="76" y1="24" x2="80" y2="18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}

      {/* Gemini 4-point sparkle on forehead */}
      <path
        d="M 60 27 Q 60 35 68 35 Q 60 35 60 43 Q 60 35 52 35 Q 60 35 60 27 Z"
        fill="#E5FAFF"
        stroke={COLORS.ink}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Cheeks */}
      <ellipse cx="34" cy="64" rx="7" ry="4" fill="#FF8EB6" opacity="0.85" />
      <ellipse cx="86" cy="64" rx="7" ry="4" fill="#FF8EB6" opacity="0.85" />

      {/* Eyes & Mouth */}
      {expression === 'happy' || expression === 'excited' ? (
        <g>
          <path
            d="M 38 56 Q 44 47 50 56"
            stroke={COLORS.ink}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 70 56 Q 76 47 82 56"
            stroke={COLORS.ink}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 54 62 Q 60 69 66 62"
            stroke={COLORS.ink}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      ) : expression === 'wink' ? (
        <g>
          <circle cx="44" cy="54" r="4" fill={COLORS.ink} />
          <path
            d="M 70 52 L 79 55 L 70 58"
            stroke={COLORS.ink}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 54 63 Q 60 69 66 63"
            stroke={COLORS.ink}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      ) : expression === 'annoyed' ? (
        <g>
          <line x1="37" y1="54" x2="50" y2="54" stroke={COLORS.ink} strokeWidth="3.4" strokeLinecap="round" />
          <line x1="70" y1="54" x2="83" y2="54" stroke={COLORS.ink} strokeWidth="3.4" strokeLinecap="round" />
          <line x1="55" y1="65" x2="65" y2="65" stroke={COLORS.ink} strokeWidth="2.8" strokeLinecap="round" />
        </g>
      ) : (
        /* determined */
        <g>
          <line x1="38" y1="50" x2="50" y2="55" stroke={COLORS.ink} strokeWidth="3.2" strokeLinecap="round" />
          <line x1="82" y1="50" x2="70" y2="55" stroke={COLORS.ink} strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="44" cy="58" r="2.8" fill={COLORS.ink} />
          <circle cx="76" cy="58" r="2.8" fill={COLORS.ink} />
          <path
            d="M 55 66 Q 60 63 65 66"
            stroke={COLORS.ink}
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
};

interface ElasticArmProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  curveOffset?: number;
}

export const ElasticArm: React.FC<ElasticArmProps> = ({
  fromX,
  fromY,
  toX,
  toY,
  curveOffset = -35,
}) => {
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2 + curveOffset;
  const d = `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`;

  return (
    <svg
      width={1080}
      height={1080}
      viewBox="0 0 1080 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 45 }}
    >
      <path d={d} stroke={COLORS.ink} strokeWidth={13} strokeLinecap="round" fill="none" />
      <path d={d} stroke="#52A4FA" strokeWidth={7.5} strokeLinecap="round" fill="none" />
      <circle cx={toX} cy={toY} r={8} fill="#6BC6FF" stroke={COLORS.ink} strokeWidth={3} />
    </svg>
  );
};
