import ICallback from './Interfaces/ICallback';
import ISelectCallback from './Interfaces/ISelectCallback';

class Callbacks {
    public onOpen:        ICallback = null;
    public onClose:       ICallback = null;
    public onSelect:      ISelectCallback = null;
    public onOptionClick: ISelectCallback = null;

    constructor() {
        Object.seal(this);
    }
}

export default Callbacks;