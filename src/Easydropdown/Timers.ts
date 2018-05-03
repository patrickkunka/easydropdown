class Timers {
    public pollChangeIntervalId: number;
    public pollMutationIntervalId: number;
    public searchTimeoutId: number;
    public keyingTimeoutId: number;

    public clear(): void {
        Object.keys(this).forEach(key => window.clearInterval(this[key]));
    }
}

export default Timers;