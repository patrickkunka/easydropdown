import ICallback from './Interfaces/ICallback';

class Callbacks {
    public onReady:  ICallback = null;
    public onOpen:   ICallback = null;
    public onClose:  ICallback = null;
    public onSelect: ICallback = null;

    constructor() {
        Object.seal(this);
    }
}

export default Callbacks;