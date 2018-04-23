import Dom           from '../Renderer/Dom';
import debounce      from '../Shared/Util/debounce';
import throttle      from '../Shared/Util/throttle';
import IActions      from '../State/Interfaces/IActions';
import State         from '../State/State';
import EventBinding  from './EventBinding';
import IEventBinding from './Interfaces/IEventBinding';

const bindEvent = (state: State, actions: IActions, dom: Dom, eventBindingRaw: IEventBinding): EventBinding => {
    const eventBinding = new EventBinding(eventBindingRaw);
    const boundHandler = (e) => eventBinding.handler(e, {state, actions, dom});

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