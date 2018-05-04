import merge from 'helpful-merge';

import IEventBinding from './Interfaces/IEventBinding';
import IEventHandler from './Interfaces/IEventHandler';

class EventBinding implements IEventBinding {
    public type:         string        = '';
    public target:       HTMLElement   = null;
    public debounce:     number        = 0;
    public throttle:     number        = 0;
    public handler:      IEventHandler = null;
    public boundHandler: EventListener = null;
    public passive:      boolean       = false;

    constructor(eventBindingRaw: IEventBinding|string) {
        merge(this, eventBindingRaw);

        Object.seal(this);
    }

    public unbind(): void {
        if (!this.target) return;

        this.target.removeEventListener(this.type, this.boundHandler);
    }
}

export default EventBinding;