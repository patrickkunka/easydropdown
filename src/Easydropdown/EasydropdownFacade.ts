import Easydropdown from './Easydropdown';

class EasydropdownFacade {
    /**
     * Programmatically opens the dropdown, closing any
     * other open instances.
     */

    public open: () => void;

    /**
     * Programmatically closes the dropdown.
     */

    public close: () => void;

    /**
     * Refreshes the instance and updates the DOM in
     * response to a change in the underlying `<select>`
     * element (for example, adding or removing an option).
     */

    public refresh: () => void;

    /**
     * Destroys the instance by removing all EasyDropDown-generated
     * elements from the DOM, and unbinding all event handlers.
     * The underlying select is returned to the root position.
     */

    public destroy: () => void;

    /**
     * An accessor property allowing writing to and reading
     * from the dropdown's value.
     */

    public value: string;

    constructor(implementation: Easydropdown) {
        this.open = implementation.open.bind(implementation);
        this.close = implementation.close.bind(implementation);
        this.refresh = implementation.refresh.bind(implementation);
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