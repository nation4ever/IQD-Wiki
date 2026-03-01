const STORE_KEY = "typecraft_progress";
const STATS_KEY = "typecraft_stats";

// --- Progress ---

export interface ProgressData {
    activeText: string;
    sourceText: string;
    typed: string;
    errors: number;
    totalKeystrokes: number;
    isFinished: boolean;
}

export async function saveProgress(data: ProgressData) {
    try {
        await (window as any).storage.set(STORE_KEY, JSON.stringify(data));
    } catch (_) { }
}

export async function loadProgress(): Promise<ProgressData | null> {
    try {
        const r = await (window as any).storage.get(STORE_KEY);
        return r ? JSON.parse(r.value) : null;
    } catch (_) {
        return null;
    }
}

export async function clearProgress() {
    try {
        await (window as any).storage.delete(STORE_KEY);
    } catch (_) { }
}

// --- Stats ---

export interface StatsData {
    bestWpm: number;
    sessions: number;
    soundEnabled: boolean;
}

export async function saveStats(data: StatsData) {
    try {
        await (window as any).storage.set(STATS_KEY, JSON.stringify(data));
    } catch (_) { }
}

export async function loadStats(): Promise<StatsData | null> {
    try {
        const r = await (window as any).storage.get(STATS_KEY);
        return r ? JSON.parse(r.value) : null;
    } catch (_) {
        return null;
    }
}
