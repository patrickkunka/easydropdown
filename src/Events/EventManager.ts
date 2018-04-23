import Dom           from '../Renderer/Dom';
import State         from '../State/State';
import bindEvent     from './bindEvent';
import EventBinding  from './EventBinding';
import getEventsList from './getEventsList';

class EventManager {
    public static bindEvents(state: State, actions: any, dom: Dom): EventBinding[] {
        return getEventsList(dom).map(bindEvent.bind(null, state, actions, dom));
    }
}

export default EventManager;