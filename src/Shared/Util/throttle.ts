function throttle(
    handler: (...args: any[]) => void,
    delay: number
): (...args: any[]) => void {
    let timerId = null;
    let last: number = -Infinity;

    return function(...args): void {
        const now = Date.now();

        const later = () => {
            timerId = null;

            handler.apply(this, args);

            last = now;
        };

        const difference = now - last;

        if (difference >= delay) {
            later();
        } else {
            clearTimeout(timerId);

            timerId = setTimeout(later, delay - difference);
        }
    };
}

export default throttle;