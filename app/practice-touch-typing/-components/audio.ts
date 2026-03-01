/** Singleton AudioContext for error sounds. */
let _audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext {
    if (!_audioCtx || _audioCtx.state === "closed") {
        _audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return _audioCtx;
}

/** Play a short descending beep to indicate a typing error. */
export function playErrorSound() {
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(340, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 0.11);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.14);
    } catch (_) { }
}
