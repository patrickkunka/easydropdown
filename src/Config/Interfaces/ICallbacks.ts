import ICallback       from './ICallback';
import ISelectCallback from './ISelectCallback';

interface ICallbacks {
    /**
     * An optional callback function to be invoked whenever
     * the dropdown is closed.
     */

    onClose?: ICallback;

    /**
     * An optional callback function to be invoked whenever
     * the dropdown is opened.
     */

    onOpen?: ICallback;

    /**
     * An optional callback function to be invoked whenever
     * an option is selected. The selected option's value
     * is passed as the first argument to the callback.
     */

    onSelect?: ISelectCallback;
}

export default ICallbacks;