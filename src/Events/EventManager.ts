import bindEvent      from './bindEvent';
import EventBinding   from './EventBinding';
import getEventsList  from './getEventsList';
import IHandlerParams from './Interfaces/IHandlerParams';

class EventManager {
    public static bindEvents(handlerParams: IHandlerParams): EventBinding[] {
        return getEventsList(handlerParams.dom).map(bindEvent.bind(null, handlerParams));
    }
}

export default EventManager;