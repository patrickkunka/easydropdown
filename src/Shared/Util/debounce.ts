/**
 * Returns a function which calls the provided function
 * only after the specified interval has elapsed between
 * function calls. An optional `immediate` boolean will
 * cause the provided function to be called once immediately
 * before waiting.
 */

function debounce(fn: (e: Event) => void, interval: number, immediate: boolean = false): (e: Event) => void {
    let timeoutId = null;

    return function() {
        const args = arguments;

        const later = () => {
            timeoutId = null;

            fn.apply(this, args);
        };

        if (timeoutId === null && immediate) {
            later();
        }

        clearTimeout(timeoutId);

        timeoutId = setTimeout(later, interval);
    };
}

export default debounce;