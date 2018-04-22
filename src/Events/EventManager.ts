import Dom           from '../Renderer/Dom';
import bindEvent     from './bindEvent';
import EventBinding  from './EventBinding';
import getEventsList from './getEventsList';

class EventManager {
    public static bindEvents(dom: Dom): EventBinding[] {
        const actions = {};

        return getEventsList(dom).map(bindEvent.bind(actions));
    }
}

export default EventManager;