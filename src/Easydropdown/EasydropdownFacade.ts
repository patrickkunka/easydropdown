import Easydropdown from './Easydropdown';

class EasydropdownFacade {
    public open: () => void;
    public close: () => void;
    public refresh: () => void;
    public destroy: () => void;
    public value: string;

    constructor(implementation: Easydropdown) {
        /**
         * Programmatically opens the dropdown menu.
         */

        this.open = implementation.open.bind(implementation);

        /**
         * Programmatically closes the dropdown menu.
         */

        this.close = implementation.close.bind(implementation);

        /**
         * Rebuilds the EasyDropDown instance in response to
         * options being added or removed.
         */

        this.refresh = implementation.refresh.bind(implementation);

        /**
         * Destroys the EasyDropDown instance, unbinding all event handlers
         * and reverting the provided <select> to its original state.
         */

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