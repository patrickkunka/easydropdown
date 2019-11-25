import ICallback from './Interfaces/ICallback';

class Callbacks {
    public onOpen:          ICallback = null;
    public onClose:         ICallback = null;
    public onSelect:        ICallback = null;
    public onClickOption:   ICallback = null;

    constructor() {
        Object.seal(this);
    }
}

export default Callbacks;