import Dom           from '../Renderer/Dom';
import bindEvent     from './bindEvent';
import EventBinding  from './EventBinding';
import getEventsList from './getEventsList';

class EventManager {
    public static bindEvents(dom: Dom, actions: any): EventBinding[] {
        return getEventsList(dom).map(bindEvent.bind(null, actions));
    }
}

export default EventManager;