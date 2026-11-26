import React from 'react';
import { Composition } from 'remotion';
import { GeminiNeonComposition } from './GeminiNeonComposition';
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="GeminiNeonEditor"
      component={GeminiNeonComposition}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
