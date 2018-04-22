const throttle = (handler: (e: Event) => void, delay: number): (e: Event) => void => {
    let timerId = null;
    let last: number;

    return function() {
        const now = Date.now();
        const args = arguments;

        const later = () => {
            timerId = null;

            handler.apply(this, args);

            last = now;
        };

        if (timerId === null) {
            later();
        } else {
            const difference = now - last;

            clearTimeout(timerId);

            timerId = setTimeout(later, delay - difference);
        }
    };
};

export default throttle;