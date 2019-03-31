import IBehavior from './Interfaces/IBehavior';

class Behavior implements IBehavior {
    public showPlaceholderWhenOpen: boolean = false;
    public openOnFocus:             boolean = false;
    public closeOnSelect:           boolean = true;
    public useNativeUiOnMobile:     boolean = true;
    public loop:                    boolean = false;
    public clampMaxVisibleItems:    boolean = true;
    public liveUpdates:             boolean = false;
    public maxVisibleItems:         number  = 15;

    constructor() {
        Object.seal(this);
    }
}

export default Behavior;