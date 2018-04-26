import Easydropdown from './Easydropdown';

class EasydropdownFacade {
    public open: () => void;
    public close: () => void;
    public destroy: () => void;
    public value: string;

    constructor(implementation: Easydropdown) {
        this.open = implementation.open.bind(implementation);
        this.close = implementation.close.bind(implementation);
        this.destroy = implementation.destroy.bind(implementation);

        Object.defineProperties(this, {
            value: {
                get: () => implementation.value,
                set: (nextValue: string) => implementation.value = nextValue
            }
        });
    }
}

export default EasydropdownFacade;