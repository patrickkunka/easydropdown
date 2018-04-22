import debounce      from '../Shared/Util/debounce';
import throttle      from '../Shared/Util/throttle';
import EventBinding  from './EventBinding';
import IEventBinding from './Interfaces/IEventBinding';

const bindEvent = (context: any, eventBindingRaw: (string|IEventBinding)): EventBinding => {
    const eventBinding = new EventBinding(eventBindingRaw);

    const boundHandler = eventBinding.handler.bind(context);

    if (eventBinding.debounce > 0) {
        eventBinding.handler = debounce(boundHandler, eventBinding.debounce, true);
    } else if (eventBinding.throttle > 0) {
        eventBinding.handler = throttle(boundHandler, eventBinding.throttle);
    } else {
        eventBinding.handler = boundHandler;
    }

    eventBinding.handler = (eventBinding.debounce <= 0) ?
        boundHandler : debounce(boundHandler, eventBinding.debounce, true);

    eventBinding.target.addEventListener(eventBinding.type, eventBinding.handler, {
        passive: eventBinding.passive
    });

    return eventBinding;
};

export default bindEvent;