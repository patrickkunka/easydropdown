import throttle from '../Shared/Util/throttle';

import EventBinding   from './EventBinding';
import getEventsList  from './getEventsList';
import IEventBinding  from './Interfaces/IEventBinding';
import IHandlerParams from './Interfaces/IHandlerParams';

function bindEvent(handlerParams: IHandlerParams, eventBindingRaw: IEventBinding): EventBinding {
    const eventBinding = new EventBinding(eventBindingRaw);

    if (!eventBinding.target) return eventBinding;

    const boundHandler = (e) => eventBinding.handler(e, handlerParams);

    if (eventBinding.throttle > 0) {
        eventBinding.boundHandler = throttle(boundHandler, eventBinding.throttle);
    } else {
        eventBinding.boundHandler = boundHandler;
    }

    eventBinding.target.addEventListener(eventBinding.type, eventBinding.boundHandler);

    return eventBinding;
}

function bindEvents(handlerParams: IHandlerParams): EventBinding[] {
    return getEventsList(handlerParams.dom).map(bindEvent.bind(null, handlerParams));
}

export {
    bindEvents as default,
    bindEvent
};