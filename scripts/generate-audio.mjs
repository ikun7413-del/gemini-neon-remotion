// Generates a 14.0s upbeat 128 BPM lo-fi synth beat + synced UI SFX as public/bgm.wav
import fs from 'node:fs';
import path from 'node:path';

const SAMPLE_RATE = 44100;
const DURATION_SEC = 14.0;
const TOTAL_SAMPLES = Math.floor(SAMPLE_RATE * DURATION_SEC);
const BPM = 128;
const BEAT_SEC = 60 / BPM;

const buffer = new Float32Array(TOTAL_SAMPLES);

function addTone(startSec, durSec, freqStart, freqEnd, vol, type = 'sine') {
  const startIdx = Math.floor(startSec * SAMPLE_RATE);
  const len = Math.floor(durSec * SAMPLE_RATE);
  let phase = 0;
  for (let i = 0; i < len; i++) {
    const idx = startIdx + i;
    if (idx < 0 || idx >= TOTAL_SAMPLES) continue;
    const t = i / len;
    const freq = freqStart + (freqEnd - freqStart) * t;
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const env = Math.sin(Math.PI * Math.min(1, t * 8)) * Math.pow(1 - t, 1.8);
    let sample = 0;
    if (type === 'sine') sample = Math.sin(phase);
    else if (type === 'tri') sample = (2 / Math.PI) * Math.asin(Math.sin(phase));
    else if (type === 'square') sample = Math.sign(Math.sin(phase)) * 0.45;
    buffer[idx] += sample * env * vol;
  }
}

function addNoise(startSec, durSec, vol, hp = false) {
  const startIdx = Math.floor(startSec * SAMPLE_RATE);
  const len = Math.floor(durSec * SAMPLE_RATE);
  let prev = 0;
  for (let i = 0; i < len; i++) {
    const idx = startIdx + i;
    if (idx < 0 || idx >= TOTAL_SAMPLES) continue;
    const t = i / len;
    const raw = Math.random() * 2 - 1;
    const s = hp ? raw - prev * 0.85 : raw;
    prev = raw;
    const env = Math.pow(1 - t, 2.5);
    buffer[idx] += s * env * vol;
  }
}

// 1. Pencil sketch scratch (0.1s - 0.9s)
for (let s = 0.08; s < 0.85; s += 0.14) {
  addNoise(s, 0.09, 0.06, true);
}

// 2. Upbeat 128 BPM groove starting at 1.0s
const chords = [
  [261.63, 329.63, 392.0, 493.88], // Cmaj7
  [220.0, 261.63, 329.63, 392.0],  // Am7
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [196.0, 246.94, 293.66, 392.0],  // G6
];
const melody = [523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 587.33];

let beatIdx = 0;
for (let t = 1.0; t < 13.7; t += BEAT_SEC / 2) {
  const isDownbeat = beatIdx % 2 === 0;
  const barBeat = Math.floor(beatIdx / 2) % 4;
  const chord = chords[Math.floor(beatIdx / 8) % chords.length];

  // Soft kick on 0 and 2
  if (isDownbeat && (barBeat === 0 || barBeat === 2)) {
    addTone(t, 0.16, 130, 42, 0.24, 'sine');
  }
  // Crisp snare/clap on 1 and 3
  if (isDownbeat && (barBeat === 1 || barBeat === 3)) {
    addNoise(t, 0.09, 0.09, true);
    addTone(t, 0.06, 220, 120, 0.08, 'tri');
  }
  // Light hi-hat on 8ths
  addNoise(t, 0.03, isDownbeat ? 0.035 : 0.02, true);

  // Warm electric-piano chord pulse on beat 0 & 2.5
  if (beatIdx % 8 === 0 || beatIdx % 8 === 5) {
    for (const f of chord) {
      addTone(t, 0.42, f, f, 0.04, 'tri');
    }
  }
  // Playful synth pluck
  if (t >= 1.5 && beatIdx % 2 === 0) {
    const note = melody[(beatIdx / 2) % melody.length];
    addTone(t, 0.16, note, note * 1.003, 0.055, 'sine');
  }
  beatIdx++;
}

// 3. Key UI SFX synced to choreography
// Clip drop pops (1.4s, 1.95s, 2.5s, 3.05s)
[1.4, 1.95, 2.5, 3.05].forEach((t, i) => {
  addTone(t, 0.11, 440 + i * 70, 720 + i * 90, 0.14, 'sine');
});
// Trim snip + stamp ("省 60% Token") at 4.65s
addNoise(4.62, 0.07, 0.16, true);
addTone(4.7, 0.16, 520, 980, 0.14, 'tri');
// Transition drops at 6.0s, 6.4s
addTone(6.0, 0.12, 600, 920, 0.12, 'sine');
addTone(6.4, 0.12, 660, 1020, 0.12, 'sine');
// Subtitle pop at 7.0s
addTone(7.0, 0.14, 587, 880, 0.13, 'tri');
// Slider pops (7.8s, 8.2s, 8.6s, 9.0s)
[7.8, 8.2, 8.6, 9.0].forEach((t, i) => {
  addTone(t, 0.1, 500 + i * 110, 760 + i * 120, 0.12, 'sine');
});
// Beat-sync ("卡点!") chime at 9.6s
addTone(9.6, 0.18, 880, 1318.5, 0.13, 'sine');
// Export click at 10.45s
addTone(10.45, 0.09, 640, 960, 0.14, 'sine');
// Export complete & finale fanfare at 11.75s
[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
  addTone(11.75 + i * 0.07, 0.55, f, f, 0.11, 'tri');
});

// Soft fade out last 0.4s & clamp
const fadeLen = Math.floor(0.4 * SAMPLE_RATE);
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  if (i > TOTAL_SAMPLES - fadeLen) {
    buffer[i] *= (TOTAL_SAMPLES - i) / fadeLen;
  }
  buffer[i] = Math.max(-0.95, Math.min(0.95, buffer[i]));
}

// Write 16-bit PCM WAV
const dataSize = TOTAL_SAMPLES * 2;
const wav = Buffer.alloc(44 + dataSize);
wav.write('RIFF', 0);
wav.writeUInt32LE(36 + dataSize, 4);
wav.write('WAVE', 8);
wav.write('fmt ', 12);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20); // PCM
wav.writeUInt16LE(1, 22); // mono
wav.writeUInt32LE(SAMPLE_RATE, 24);
wav.writeUInt32LE(SAMPLE_RATE * 2, 28);
wav.writeUInt16LE(2, 32);
wav.writeUInt16LE(16, 34);
wav.write('data', 36);
wav.writeUInt32LE(dataSize, 40);

for (let i = 0; i < TOTAL_SAMPLES; i++) {
  wav.writeInt16LE(Math.round(buffer[i] * 32767), 44 + i * 2);
}

const outPath = path.join(process.cwd(), 'public', 'bgm.wav');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, wav);
console.log(`Generated ${outPath} (${wav.length} bytes)`);
