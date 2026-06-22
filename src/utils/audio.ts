'use client';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }
    
    return audioCtx;
}

export function playLampClick() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const time = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.frequency.setValueAtTime(140, time);
    osc1.frequency.exponentialRampToValueAtTime(30, time + 0.04);
    gain1.gain.setValueAtTime(0.28, time);
    gain1.gain.exponentialRampToValueAtTime(0.01, time + 0.04);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(time);
    osc1.stop(time + 0.05);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(950, time);
    osc2.frequency.exponentialRampToValueAtTime(650, time + 0.015);
    gain2.gain.setValueAtTime(0.12, time);
    gain2.gain.exponentialRampToValueAtTime(0.005, time + 0.015);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(time);
    osc2.stop(time + 0.02);
}

export function playPageFlip() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const time = ctx.currentTime;
    const duration = 0.65;
    
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 1.3;
    filter.frequency.setValueAtTime(1100, time);
    filter.frequency.exponentialRampToValueAtTime(320, time + duration);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0, time);
    gain.gain.linearRampToValueAtTime(0.24, time + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.4);
    
    oscGain.gain.setValueAtTime(0.0, time);
    oscGain.gain.linearRampToValueAtTime(0.15, time + 0.08);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    
    source.start(time);
    source.stop(time + duration);
    
    osc.start(time);
    osc.stop(time + 0.42);
}

export function playBookOpen() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const time = ctx.currentTime;

    const thud = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(80, time);
    thud.frequency.exponentialRampToValueAtTime(38, time + 0.12);
    thudGain.gain.setValueAtTime(0.22, time);
    thudGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
    thud.connect(thudGain);
    thudGain.connect(ctx.destination);
    thud.start(time);
    thud.stop(time + 0.2);

    const bufSize = Math.floor(ctx.sampleRate * 0.18);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, time + 0.05);
    filter.Q.value = 2.0;
    const settleGain = ctx.createGain();
    settleGain.gain.setValueAtTime(0, time + 0.05);
    settleGain.gain.linearRampToValueAtTime(0.09, time + 0.08);
    settleGain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
    src.connect(filter);
    filter.connect(settleGain);
    settleGain.connect(ctx.destination);
    src.start(time + 0.05);
    src.stop(time + 0.23);
}

export function playMugClink() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const time = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(1750, time);
    osc.frequency.linearRampToValueAtTime(1580, time + 0.15);
    
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.frequency.setValueAtTime(2520, time);
    gain2.gain.setValueAtTime(0.04, time);
    gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc.start(time);
    osc2.start(time);
    osc.stop(time + 0.16);
    osc2.stop(time + 0.09);
}

export function playChessKnightKnock() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const time = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, time);
    osc.frequency.exponentialRampToValueAtTime(110, time + 0.09);
    
    gain.gain.setValueAtTime(0.24, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.1);
}

export function playCraneFlutter() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const time = ctx.currentTime;
    
    const numFlaps = 12;
    const flapInterval = 0.22;
    
    for (let f = 0; f < numFlaps; f++) {
        const flapTime = time + f * flapInterval;
        const duration = 0.16;
        
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.value = 2.8;
        filter.frequency.setValueAtTime(1200, flapTime);
        filter.frequency.exponentialRampToValueAtTime(650, flapTime + duration);
        
        const gain = ctx.createGain();
        const volume = 0.55 * Math.pow(0.86, f);
        
        gain.gain.setValueAtTime(0, flapTime);
        gain.gain.linearRampToValueAtTime(volume, flapTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, flapTime + duration);
        
        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        source.start(flapTime);
        source.stop(flapTime + duration);
    }
}

export function playNotebookPageFlip() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const time = ctx.currentTime;
    const duration = 0.22;

    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 1.8;
    filter.frequency.setValueAtTime(1800, time);
    filter.frequency.exponentialRampToValueAtTime(400, time + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.28, time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(time);
    source.stop(time + duration);
}

export function playCameraWhoosh() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const time = ctx.currentTime;
    const duration = 1.4;

    const bufSize = ctx.sampleRate * duration;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

    const windSrc = ctx.createBufferSource();
    windSrc.buffer = buf;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.Q.value = 0.6;
    windFilter.frequency.setValueAtTime(180, time);
    windFilter.frequency.linearRampToValueAtTime(1400, time + 0.25);
    windFilter.frequency.exponentialRampToValueAtTime(350, time + duration);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0, time);
    windGain.gain.linearRampToValueAtTime(0.38, time + 0.18);
    windGain.gain.linearRampToValueAtTime(0.28, time + 0.55);
    windGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    windSrc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(ctx.destination);
    windSrc.start(time);
    windSrc.stop(time + duration);

    const rumbleBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const rumbleData = rumbleBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) rumbleData[i] = Math.random() * 2 - 1;

    const rumbleSrc = ctx.createBufferSource();
    rumbleSrc.buffer = rumbleBuf;

    const rumbleFilter = ctx.createBiquadFilter();
    rumbleFilter.type = 'lowpass';
    rumbleFilter.frequency.setValueAtTime(90, time);
    rumbleFilter.frequency.linearRampToValueAtTime(220, time + 0.3);
    rumbleFilter.frequency.exponentialRampToValueAtTime(60, time + duration);

    const rumbleGain = ctx.createGain();
    rumbleGain.gain.setValueAtTime(0, time);
    rumbleGain.gain.linearRampToValueAtTime(0.18, time + 0.12);
    rumbleGain.gain.exponentialRampToValueAtTime(0.001, time + duration * 0.85);

    rumbleSrc.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    rumbleGain.connect(ctx.destination);
    rumbleSrc.start(time);
    rumbleSrc.stop(time + duration);

    const shimmerBuf = ctx.createBuffer(1, Math.floor(bufSize * 0.7), ctx.sampleRate);
    const shimmerData = shimmerBuf.getChannelData(0);
    for (let i = 0; i < shimmerData.length; i++) shimmerData[i] = Math.random() * 2 - 1;

    const shimmerSrc = ctx.createBufferSource();
    shimmerSrc.buffer = shimmerBuf;

    const shimmerFilter = ctx.createBiquadFilter();
    shimmerFilter.type = 'highpass';
    shimmerFilter.frequency.setValueAtTime(3200, time + 0.1);
    shimmerFilter.frequency.exponentialRampToValueAtTime(8000, time + duration * 0.6);

    const shimmerGain = ctx.createGain();
    shimmerGain.gain.setValueAtTime(0, time + 0.1);
    shimmerGain.gain.linearRampToValueAtTime(0.06, time + 0.3);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, time + duration * 0.7);

    shimmerSrc.connect(shimmerFilter);
    shimmerFilter.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);
    shimmerSrc.start(time + 0.1);
    shimmerSrc.stop(time + duration * 0.7);
}

export function playVinylScratch() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const time = ctx.currentTime;
    const duration = 0.15;
    
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 1.2;
    filter.frequency.setValueAtTime(550, time);
    filter.frequency.exponentialRampToValueAtTime(180, time + duration);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(time);
    source.stop(time + duration);
}
