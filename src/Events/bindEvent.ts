import debounce       from '../Shared/Util/debounce';
import throttle       from '../Shared/Util/throttle';
import EventBinding   from './EventBinding';
import IEventBinding  from './Interfaces/IEventBinding';
import IHandlerParams from './Interfaces/IHandlerParams';

const bindEvent = (handlerParams: IHandlerParams, eventBindingRaw: IEventBinding): EventBinding => {
    const eventBinding = new EventBinding(eventBindingRaw);

    if (!eventBinding.target) return eventBinding;

    const boundHandler = (e) => eventBinding.handler(e, handlerParams);

    if (eventBinding.debounce > 0) {
        eventBinding.boundHandler = debounce(boundHandler, eventBinding.debounce, true);
    } else if (eventBinding.throttle > 0) {
        eventBinding.boundHandler = throttle(boundHandler, eventBinding.throttle);
    } else {
        eventBinding.boundHandler = boundHandler;
    }

    eventBinding.target.addEventListener(eventBinding.type, eventBinding.boundHandler);

    return eventBinding;
};

export default bindEvent;