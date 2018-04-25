import Easydropdown from './Easydropdown';

class EasydropdownFacade {
    public open: () => void;
    public close: () => void;
    public destroy: () => void;

    constructor(implementation: Easydropdown) {
        this.open = implementation.open.bind(implementation);
        this.close = implementation.close.bind(implementation);
        this.destroy = implementation.destroy.bind(implementation);
    }
}

export default EasydropdownFacade;